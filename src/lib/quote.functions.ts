import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getRequestHost } from "@tanstack/react-start/server";
import { computeQuote } from "./quote-engine";
import { sendEmail } from "./email/send.server";

const quoteSchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  nationality: z.string().trim().max(120).optional().or(z.literal("")),
  businessActivity: z.string().trim().max(500).optional().or(z.literal("")),
  jurisdiction: z.string().trim().max(80).optional().or(z.literal("")),
  numberOfVisas: z.number().int().min(0).max(20).default(0),
  needsResidency: z.enum(["yes","no","later"]).default("later"),
  needsBanking: z.boolean().default(false),
  needsTax: z.boolean().default(false),
  needsDigital: z.boolean().default(false),
  officeRequirement: z.enum(["flexi_desk","ejari","physical_office","not_sure"]).default("not_sure"),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const result = computeQuote({
      jurisdiction: data.jurisdiction || undefined,
      numberOfVisas: data.numberOfVisas,
      needsResidency: data.needsResidency,
      needsBanking: data.needsBanking,
      needsTax: data.needsTax,
      needsDigital: data.needsDigital,
      officeRequirement: data.officeRequirement,
    });

    // 1. Insert quote_request
    const { data: qr, error: qrErr } = await supabaseAdmin
      .from("quote_requests")
      .insert({
        full_name: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp || null,
        nationality: data.nationality || null,
        business_activity: data.businessActivity || null,
        preferred_jurisdiction: data.jurisdiction || null,
        number_of_visas: data.numberOfVisas,
        needs_residency: data.needsResidency,
        needs_banking: data.needsBanking,
        needs_tax: data.needsTax,
        needs_digital: data.needsDigital,
        office_requirement: data.officeRequirement,
        message: data.message || null,
      })
      .select("id")
      .single();
    if (qrErr) throw new Error(qrErr.message);

    // 2. Insert quote
    const { data: q, error: qErr } = await supabaseAdmin
      .from("quotes")
      .insert({
        quote_request_id: qr.id,
        recipient_email: data.email,
        recipient_name: data.fullName,
        selected_jurisdiction: result.selectedJurisdiction,
        recommended_structure: result.recommendedStructure,
        number_of_visas: data.numberOfVisas,
        included_services: result.includedServices,
        optional_addons: result.optionalAddons,
        estimated_government_fees_min: result.governmentFees.min,
        estimated_government_fees_max: result.governmentFees.max,
        service_fees_min: result.serviceFees.min,
        service_fees_max: result.serviceFees.max,
        total_estimated_cost_min: result.totalCost.min,
        total_estimated_cost_max: result.totalCost.max,
        timeline_days_min: result.timelineDays.min,
        timeline_days_max: result.timelineDays.max,
      })
      .select("id, quote_number")
      .single();
    if (qErr) throw new Error(qErr.message);

    // 3. Send emails
    let host = "";
    try { host = getRequestHost(); } catch { /* noop */ }
    const origin = host ? `https://${host}` : "https://softbridge.ae";
    const dashboardUrl = `${origin}/login`;
    const bookingUrl = `${origin}/#contact`;

    try {
      await sendEmail(data.email, {
        name: "quote",
        subject: `Your Soft Bridge UAE Business Setup Quotation — ${q.quote_number}`,
        props: {
          name: data.fullName,
          quoteNumber: q.quote_number,
          recommendedStructure: result.recommendedStructure,
          jurisdiction: result.selectedJurisdiction,
          numberOfVisas: data.numberOfVisas,
          includedServices: result.includedServices,
          optionalAddons: result.optionalAddons,
          governmentFees: result.governmentFees,
          serviceFees: result.serviceFees,
          totalCost: result.totalCost,
          timelineDays: result.timelineDays,
          dashboardUrl,
          bookingUrl,
        },
      });
    } catch (e) { console.error("quote email failed", e); }

    const { ADMIN_NOTIFY_EMAIL } = await import("./email/notify");
    const internalTo = ADMIN_NOTIFY_EMAIL;
    if (internalTo) {
      try {
        await sendEmail(internalTo, {
          name: "internal_quote_notice",
          subject: `[Lead] ${q.quote_number} · ${data.fullName} · ${result.selectedJurisdiction}`,
          props: {
            name: data.fullName,
            email: data.email,
            whatsapp: data.whatsapp || undefined,
            jurisdiction: result.selectedJurisdiction,
            numberOfVisas: data.numberOfVisas,
            totalCost: result.totalCost,
            quoteNumber: q.quote_number,
          },
        });
      } catch (e) { console.error("internal quote notice failed", e); }
    }

    return { quoteNumber: q.quote_number, quote: result };
  });

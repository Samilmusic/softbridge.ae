import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { getRequestHost } from "@tanstack/react-start/server";
import { sendEmail } from "./email/send.server";

const bookingSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  preferredDate: z.string().trim().max(120).optional().or(z.literal("")),
  preferredTime: z.string().trim().max(40).optional().or(z.literal("")),
  nationality: z.string().trim().max(120).optional().or(z.literal("")),
  activity: z.string().trim().max(200).optional().or(z.literal("")),
  jurisdiction: z.string().trim().max(120).optional().or(z.literal("")),
  tags: z.array(z.string().trim().max(60)).max(12).optional(),
  method: z.enum(["whatsapp", "zoom", "google_meet", "in_person", "phone"]).default("whatsapp"),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

const methodLabels: Record<string, string> = {
  whatsapp: "WhatsApp call",
  zoom: "Zoom meeting",
  google_meet: "Google Meet",
  in_person: "In-person at our Ajman office",
  phone: "Phone call",
};

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const when = [data.preferredDate, data.preferredTime].filter(Boolean).join(" · ");
    const details = [
      when ? `Preferred: ${when} (GST)` : null,
      data.nationality ? `Nationality: ${data.nationality}` : null,
      data.activity ? `Activity: ${data.activity}` : null,
      data.jurisdiction ? `Jurisdiction: ${data.jurisdiction}` : null,
      data.tags && data.tags.length ? `Focus: ${data.tags.join(", ")}` : null,
      data.message || null,
    ].filter(Boolean).join("\n\n") || null;

    const { error: insErr } = await supabaseAdmin.from("consultations").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      preferred_date: null,
      method: data.method,
      message: details,
    });
    if (insErr) throw new Error(insErr.message);

    let host = "";
    try { host = getRequestHost(); } catch { /* noop */ }
    const portalUrl = host ? `https://${host}/login` : "https://softbridge.ae/login";

    try {
      await sendEmail(data.email, {
        name: "booking_confirmation",
        subject: "Your Soft Bridge consultation is confirmed",
        props: {
          name: data.name,
          date: when || undefined,
          method: methodLabels[data.method],
          portalUrl,
        },
      });
    } catch (e) {
      console.error("booking email failed", e);
    }

    try {
      const { ADMIN_NOTIFY_EMAIL } = await import("./email/notify");
      await sendEmail(ADMIN_NOTIFY_EMAIL, {
        name: "internal_setup_notice",
        subject: `[Booking] ${data.name} · ${methodLabels[data.method]}${when ? ` · ${when}` : ""}`,
        props: {
          name: data.name,
          email: data.email,
          whatsapp: data.phone || undefined,
          nationality: data.nationality || undefined,
          activity: data.activity || undefined,
          jurisdiction: data.jurisdiction || undefined,
          goals: data.tags && data.tags.length ? data.tags : undefined,
        },
      });
    } catch (e) {
      console.error("internal booking notice failed", e);
    }

    return { ok: true };
  });

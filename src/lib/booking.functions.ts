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
    const { error: insErr } = await supabaseAdmin.from("consultations").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      preferred_date: data.preferredDate ? null : null, // store as text only via message for now
      method: data.method,
      message: [data.preferredDate ? `Preferred: ${data.preferredDate}` : null, data.message || null].filter(Boolean).join("\n\n") || null,
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
          date: data.preferredDate || undefined,
          method: methodLabels[data.method],
          portalUrl,
        },
      });
    } catch (e) {
      console.error("booking email failed", e);
      // do not fail the booking on email error
    }

    return { ok: true };
  });

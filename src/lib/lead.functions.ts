import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  phone: z.string().trim().min(4).max(40),
  country: z.string().trim().min(1).max(120),
  source: z.string().trim().max(120).optional().or(z.literal("")),
});

function syntheticEmail(phone: string) {
  const digits = phone.replace(/\D+/g, "").slice(0, 20) || "lead";
  return `lead+${digits}@softbridge.ae`;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const source = data.source || "landing /start";
    const message = `Quick lead (${source})\nCountry: ${data.country}\nWhatsApp: ${data.phone}`;
    const { error } = await supabaseAdmin.from("consultations").insert({
      name: data.name,
      email: syntheticEmail(data.phone),
      phone: data.phone,
      preferred_date: null,
      method: "whatsapp",
      message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

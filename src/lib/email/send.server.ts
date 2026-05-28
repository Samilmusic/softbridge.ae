import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  BookingConfirmation, WelcomeMagicLink, DocumentRequest, StatusUpdate, Invoice,
  type BookingProps, type WelcomeProps, type DocRequestProps, type StatusUpdateProps, type InvoiceProps,
} from "./templates";

type Tpl =
  | { name: "booking_confirmation"; subject: string; props: BookingProps }
  | { name: "welcome_magic_link"; subject: string; props: WelcomeProps }
  | { name: "document_request"; subject: string; props: DocRequestProps }
  | { name: "status_update"; subject: string; props: StatusUpdateProps }
  | { name: "invoice"; subject: string; props: InvoiceProps };

function renderTemplate(t: Tpl): React.ReactElement {
  switch (t.name) {
    case "booking_confirmation": return React.createElement(BookingConfirmation, t.props);
    case "welcome_magic_link": return React.createElement(WelcomeMagicLink, t.props);
    case "document_request": return React.createElement(DocumentRequest, t.props);
    case "status_update": return React.createElement(StatusUpdate, t.props);
    case "invoice": return React.createElement(Invoice, t.props);
  }
}

export async function sendEmail(to: string, tpl: Tpl) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "Soft Bridge <onboarding@resend.dev>";
  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const resend = new Resend(apiKey);
  const html = await render(renderTemplate(tpl));
  const text = await render(renderTemplate(tpl), { plainText: true });

  const { data, error } = await resend.emails.send({
    from, to: [to], subject: tpl.subject, html, text,
  });

  await supabaseAdmin.from("email_log").insert({
    recipient: to,
    template: tpl.name,
    subject: tpl.subject,
    status: error ? "failed" : "sent",
    error: error ? error.message : null,
    resend_id: data?.id ?? null,
  });

  if (error) throw new Error(error.message);
  return { id: data?.id };
}

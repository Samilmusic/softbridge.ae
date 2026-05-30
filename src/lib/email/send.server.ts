import { Resend } from "resend";
import { render } from "@react-email/render";
import * as React from "react";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  BookingConfirmation, WelcomeMagicLink, DocumentRequest, StatusUpdate, Invoice,
  QuoteEmail, InternalQuoteNotice, OtpEmail, SetupReceivedEmail, InternalSetupNotice,
  type BookingProps, type WelcomeProps, type DocRequestProps, type StatusUpdateProps,
  type InvoiceProps, type QuoteProps, type InternalQuoteProps,
  type OtpProps, type SetupReceivedProps, type InternalSetupProps,
} from "./templates";

type Tpl =
  | { name: "booking_confirmation"; subject: string; props: BookingProps }
  | { name: "welcome_magic_link"; subject: string; props: WelcomeProps }
  | { name: "document_request"; subject: string; props: DocRequestProps }
  | { name: "status_update"; subject: string; props: StatusUpdateProps }
  | { name: "invoice"; subject: string; props: InvoiceProps }
  | { name: "quote"; subject: string; props: QuoteProps }
  | { name: "internal_quote_notice"; subject: string; props: InternalQuoteProps }
  | { name: "otp"; subject: string; props: OtpProps }
  | { name: "setup_received"; subject: string; props: SetupReceivedProps }
  | { name: "internal_setup_notice"; subject: string; props: InternalSetupProps };

function getServerEnv(key: string): string | undefined {
  return (
    process.env?.[key] ||
    (globalThis as any).__env__?.[key] ||
    (globalThis as any).env?.[key]
  );
}

function renderTemplate(t: Tpl): React.ReactElement {
  switch (t.name) {
    case "booking_confirmation": return React.createElement(BookingConfirmation, t.props);
    case "welcome_magic_link": return React.createElement(WelcomeMagicLink, t.props);
    case "document_request": return React.createElement(DocumentRequest, t.props);
    case "status_update": return React.createElement(StatusUpdate, t.props);
    case "invoice": return React.createElement(Invoice, t.props);
    case "quote": return React.createElement(QuoteEmail, t.props);
    case "internal_quote_notice": return React.createElement(InternalQuoteNotice, t.props);
    case "otp": return React.createElement(OtpEmail, t.props);
    case "setup_received": return React.createElement(SetupReceivedEmail, t.props);
    case "internal_setup_notice": return React.createElement(InternalSetupNotice, t.props);
  }
}

export interface SendOpts {
  caseId?: string | null;
  clientId?: string | null;
}

export async function sendEmail(to: string, tpl: Tpl, opts: SendOpts = {}) {
  const apiKey = getServerEnv("RESEND_API_KEY");
  const from = getServerEnv("RESEND_FROM_EMAIL") || "Soft Bridge <noreply@softbridge.ae>";

  if (!apiKey) throw new Error("RESEND_API_KEY not configured");

  const resend = new Resend(apiKey);
  const html = await render(renderTemplate(tpl));
  const text = await render(renderTemplate(tpl), { plainText: true });

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: tpl.subject,
    html,
    text,
  });

  await supabaseAdmin.from("email_log").insert({
    recipient: to,
    template: tpl.name,
    email_type: tpl.name,
    subject: tpl.subject,
    status: error ? "failed" : "sent",
    error: error ? error.message : null,
    resend_id: data?.id ?? null,
    case_id: opts.caseId ?? null,
    client_id: opts.clientId ?? null,
  });

  if (error) throw new Error(error.message);

  return { id: data?.id };
}

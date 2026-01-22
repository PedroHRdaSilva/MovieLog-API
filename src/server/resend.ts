import { render } from "@react-email/render";
import React from "react";
import { Resend } from "resend";

interface SendEmailProps {
  to: string;
  subject: string;
  react: React.ReactElement;
}
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async ({ to, subject, react }: SendEmailProps) => {
  const html = await render(react);

  const { error } = await resend.emails.send({
    from: "Pedro Ribeiro <onboarding@resend.dev>",
    to,
    subject,
    html,
  });

  if (error) {
    console.error(error);
    throw new Error("Erro ao enviar email");
  }
};

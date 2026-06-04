import { resend } from "./resend.client";
import {
  adminEnquiryTemplate,
  userConfirmationTemplate,
  receiptEmailTemplate
} from "./email.template";

/**
 * Notify company staff about new enquiry
 */
export async function sendAdminEnquiryNotification(enquiry) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [process.env.ADMIN_EMAIL],
    reply_to: enquiry.email,
    subject: "New enquiry from AdhyayanX website",
    html: adminEnquiryTemplate(enquiry)
  });
}

/**
 * Send confirmation email to the user
 */
export async function sendUserConfirmation(enquiry) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: [enquiry.email],
    subject: "We received your enquiry",
    html: userConfirmationTemplate(enquiry)
  });
}

/**
 * Local test email
 */
export async function sendTestEmail() {
  return resend.emails.send({
    from: "AdhyayanX <admin@adhyayanx.in>",
    to: ["staff@adhyayanx.in"],
    subject: "AdhyayanX Email Test",
    html: `
      <h2>Email system working</h2>
      <p>This confirms your production email setup is working.</p>
      <p>Time: ${new Date().toISOString()}</p>
    `
  });
}

/**
 * Send receipt email with PDF attachment
 */
export async function sendReceiptEmail({ to, studentName, receiptNumber, pdfBuffer }) {
  const from = process.env.EMAIL_FROM || "AdhyayanX <admin@adhyayanx.in>";
  const subject = `Payment Receipt: ${receiptNumber || "AdhyayanX"}`;
  const attachments = [
    {
      filename: `receipt-${receiptNumber || "payment"}.pdf`,
      content: pdfBuffer,
    },
  ];

  // 1. Send to Student
  const studentEmailPromise = resend.emails.send({
    from,
    to: [to],
    subject,
    html: receiptEmailTemplate({ studentName, receiptNumber, isAdmin: false }),
    attachments,
  });

  // 2. Send to Admin (if configured)
  if (process.env.ADMIN_EMAIL) {
    const adminEmailPromise = resend.emails.send({
      from,
      to: [process.env.ADMIN_EMAIL],
      subject: `[Admin Copy] ${subject}`,
      html: receiptEmailTemplate({ studentName, receiptNumber, isAdmin: true }),
      attachments,
    });

    return Promise.all([studentEmailPromise, adminEmailPromise]);
  }

  return studentEmailPromise;
}
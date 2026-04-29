const LOGO_URL = "https://raw.githubusercontent.com/skillyards/.github/be315000f3f0e8efe5b2f92eb5cf2e00fdf22579/skillyards-dark.svg#gh-dark-mode-only";

export function adminEnquiryTemplate(enquiry) {
  const year = new Date().getFullYear();
  const fullName = `${enquiry.firstName} ${enquiry.lastName || ""}`.trim();
  const uniqueId = Date.now();

  return `
  <div style="background:#f1f5f9;padding:2rem;font-family:Arial,sans-serif;">
    <div style="max-width:560px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

      <div style="background:#0f172a;padding:24px;text-align:center;">
        <img src="${LOGO_URL}" style="max-width:180px; height:auto; display:block; margin:auto;" alt="Skillyards" />
      </div>

      <div style="padding:24px 28px 0;">
        <p style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin:0 0 12px;font-weight:600;">Contact details</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
          <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;border:1px solid #e2e8f0;">
            <p style="font-size:11px;color:#94a3b8;margin:0 0 3px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Full name</p>
            <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0;">${fullName}</p>
          </div>
          <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;border:1px solid #e2e8f0;">
            <p style="font-size:11px;color:#94a3b8;margin:0 0 3px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</p>
            <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0;">${enquiry.phone || "Not provided"}</p>
          </div>
          <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;border:1px solid #e2e8f0;grid-column:1/-1;">
            <p style="font-size:11px;color:#94a3b8;margin:0 0 3px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
            <a href="mailto:${enquiry.email}" style="font-size:14px;font-weight:600;color:#635ee7;text-decoration:none;display:block;">${enquiry.email}</a>
          </div>
        </div>

        <p style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin:0 0 10px;font-weight:600;">Message</p>
        <div style="background:#f8fafc;border-radius:10px;padding:16px 18px;border-left:3px solid #635ee7;margin-bottom:24px;">
          <p style="font-size:14px;color:#1e293b;line-height:1.7;margin:0;">${enquiry.message}</p>
        </div>

        <div style="margin-bottom:28px;">
          <a href="mailto:${enquiry.email}" style="display:block;text-align:center;padding:12px 0;background:#635ee7;color:#ffffff;font-size:14px;font-weight:600;border-radius:10px;text-decoration:none;">Reply to enquiry</a>
        </div>
      </div>

      <div style="border-top:1px solid #e2e8f0;padding:16px 28px;background:#f8fafc;">
        <p style="text-align:center;font-size:11px;color:#94a3b8;margin:0;">Automated alert from Skillyards · © ${year} · Ref: ${uniqueId}</p>
      </div>
    </div>
  </div>
  `;
}

export function receiptEmailTemplate({ studentName, receiptNumber, isAdmin = false }) {
  const year = new Date().getFullYear();

  const title = isAdmin ? "Receipt Copy (Admin)" : "Payment Receipt";
  const greeting = isAdmin ? "Hi Admin," : `Hi ${studentName},`;
  const body = isAdmin 
    ? `This is a copy of the payment receipt <b>${receiptNumber || ""}</b> sent to <b>${studentName}</b>.`
    : `Please find attached your payment receipt <b>${receiptNumber || ""}</b>. Thank you for your payment!`;

  return `
  <div style="background:#f1f5f9;padding:2rem;font-family:Arial,sans-serif;">
    <div style="max-width:560px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:24px;text-align:center;">
        <img src="${LOGO_URL}" style="max-width:180px; height:auto; display:block; margin:auto;" alt="Skillyards" />
      </div>

      <div style="padding:28px 28px 24px;">
        <h1 style="font-size:20px;color:#1e293b;margin:0 0 12px;">${title}</h1>
        <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">
          ${greeting}<br><br>
          ${body}
        </p>
        
        ${!isAdmin ? `
        <div style="background:#f8fafc;border-radius:10px;padding:16px 18px;border-left:3px solid #635ee7;margin-bottom:28px;">
          <p style="font-size:13px;color:#1e293b;line-height:1.6;margin:0;">
            If you have any questions regarding this receipt, please contact us at <a href="mailto:support@skillyards.in" style="color:#635ee7;text-decoration:none;">support@skillyards.in</a>.
          </p>
        </div>
        ` : ""}
      </div>

      <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 28px;text-align:center;">
        <p style="font-size:11px;color:#94a3b8;margin:0;">© ${year} Skillyards. All rights reserved.</p>
      </div>
    </div>
  </div>
  `;
}

export function userConfirmationTemplate(enquiry) {
  const year = new Date().getFullYear();
  const uniqueId = Date.now();

  return `
  <div style="background:#f1f5f9;padding:2rem;font-family:Arial,sans-serif;">
    <div style="max-width:560px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

      <div style="background:#0f172a;padding:24px;text-align:center;">
        <img src="${LOGO_URL}" style="max-width:180px; height:auto; display:block; margin:auto;" alt="Skillyards" />
      </div>

      <div style="padding:28px 28px 0;">
        <h1 style="font-size:20px;color:#1e293b;margin:0 0 12px;">Hi ${enquiry.firstName} 👋</h1>
        <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">
          Thanks for reaching out! We've received your enquiry and our team will get back to you within <b>24-48 hours</b>.
        </p>

        <p style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin:0 0 12px;font-weight:600;">Enquiry Summary</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;">
          <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;border:1px solid #e2e8f0;">
            <p style="font-size:11px;color:#94a3b8;margin:0 0 3px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Response Time</p>
            <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0;">24-48 Hours</p>
          </div>
          <div style="background:#f8fafc;border-radius:10px;padding:14px 16px;border:1px solid #e2e8f0;">
             <p style="font-size:11px;color:#94a3b8;margin:0 0 3px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Status</p>
            <p style="font-size:14px;font-weight:600;color:#1e293b;margin:0;">Received</p>
          </div>
        </div>

        <p style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#94a3b8;margin:0 0 10px;font-weight:600;">Your Message</p>
        <div style="background:#f8fafc;border-radius:10px;padding:16px 18px;border-left:3px solid #635ee7;margin-bottom:28px;">
          <p style="font-size:14px;color:#1e293b;line-height:1.7;margin:0;">${enquiry.message}</p>
        </div>
      </div>

      <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 28px;text-align:center;">
        <p style="font-size:12px;color:#94a3b8;margin:0 0 16px;">Stay connected with us</p>
        <div style="margin-bottom:20px;">
            <a href="https://linkedin.com/company/skillyards" style="display:inline-block;margin:0 5px;text-decoration:none;">
                <img src="https://cdn-icons-png.flaticon.com/32/145/145807.png" width="24" height="24" alt="LinkedIn">
            </a>
            <a href="https://instagram.com/skillyardss" style="display:inline-block;margin:0 5px;text-decoration:none;">
                <img src="https://cdn-icons-png.flaticon.com/32/174/174855.png" width="24" height="24" alt="Instagram">
            </a>
            <a href="https://facebook.com/skillyardss" style="display:inline-block;margin:0 5px;text-decoration:none;">
                <img src="https://cdn-icons-png.flaticon.com/32/5968/5968764.png" width="24" height="24" alt="Facebook">
            </a>
        </div>
        <p style="font-size:11px;color:#94a3b8;margin:0;">© ${year} Skillyards. All rights reserved. · Ref: ${uniqueId}</p>
      </div>
    </div>
  </div>
  `;
}
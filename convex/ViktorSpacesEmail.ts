import { Email } from "@convex-dev/auth/providers/Email";
import { APP_NAME } from "./constants";

declare const process: { env: Record<string, string | undefined> };

function generateOTP() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return String(array[0] % 1000000).padStart(6, "0");
}

async function sendEmail({
  email,
  token,
  subject,
  heading,
  description,
}: {
  email: string;
  token: string;
  subject: string;
  heading: string;
  description: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY || "re_c29ftQMj_2egcPJcTayUGzJsRp2rAAcsV";
  const apiUrl = process.env.VIKTOR_SPACES_API_URL;
  const projectName = process.env.VIKTOR_SPACES_PROJECT_NAME;
  const projectSecret = process.env.VIKTOR_SPACES_PROJECT_SECRET;

  if (!resendApiKey && (!apiUrl || !projectName || !projectSecret)) {
    throw new Error("Email not configured. Set RESEND_API_KEY or Viktor Spaces env vars.");
  }

  const emailSubject = `${subject} - ${APP_NAME}`;
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Your ${APP_NAME} verification code is ready</div>
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" role="presentation" style="max-width:480px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#0B1D3A 0%,#1a3a6a 100%);padding:28px 32px;text-align:center;">
              <span style="color:#C5963A;font-size:20px;font-weight:700;letter-spacing:0.5px;">${APP_NAME}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 32px 24px;">
              <h2 style="margin:0 0 8px;color:#1a1a1a;font-size:20px;font-weight:600;text-align:center;">${heading}</h2>
              <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.5;text-align:center;">${description}</p>
              <div style="background:#f8f8fa;padding:20px;text-align:center;border-radius:8px;border:1px solid #eee;">
                <span style="font-size:34px;font-weight:700;letter-spacing:8px;color:#0B1D3A;font-family:monospace;">${token}</span>
              </div>
              <p style="margin:16px 0 0;color:#888;font-size:13px;text-align:center;">This code expires in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8f9fa;padding:20px 32px;border-top:1px solid #eee;">

              <p style="margin:0;color:#999;font-size:11px;text-align:center;line-height:1.5;">
                © ${new Date().getFullYear()} Garner Financial Partners. All rights reserved.
              </p>
              <p style="margin:8px 0 0;color:#aaa;font-size:10px;text-align:center;line-height:1.6;">
                Our email address is: <a href="mailto:contact@garnerfinancialpartners.com" style="color:#C5963A;text-decoration:none;">contact@garnerfinancialpartners.com</a><br>
                Garner Financial Partners · Scottsdale, AZ 85254<br><br>
                You're receiving this because you requested a verification code or signed up for an account. This is a security email — no action is needed if you didn't make this request.<br><br>
                We value your time and privacy. Your information is kept secure and is never sold or shared.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  const textContent = `${heading}\n\n${description}\n\nYour code is: ${token}\n\nThis code expires in 15 minutes. If you didn't request this, you can safely ignore this email.\n\n---\n© ${new Date().getFullYear()} Garner Financial Partners. All rights reserved.\ncontact@garnerfinancialpartners.com · Scottsdale, AZ 85254\n\nYou are receiving this because you requested a verification code or signed up for an account.\nWe value your time and privacy. Your information is kept secure and is never sold or shared.`;

  if (resendApiKey) {
    // Try Resend (may be suspended — fall through to Viktor Spaces if it fails)
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Garner Financial Partners <contact@garnerfinancialpartners.com>",
          to: [email],
          subject: emailSubject,
          html: htmlContent,
          text: textContent,
          reply_to: "contact@garnerfinancialpartners.com",
        }),
      });
      if (response.ok) return;
      console.warn(`[Resend] Failed (${response.status}) — falling through to Viktor Spaces API`);
    } catch (err: any) {
      console.warn(`[Resend] Error: ${err.message} — falling through to Viktor Spaces API`);
    }
  }

  // Fallback: Viktor Spaces API
  const response = await fetch(`${apiUrl}/api/viktor-spaces/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project_name: projectName,
      project_secret: projectSecret,
      to_email: email,
      subject: emailSubject,
      html_content: htmlContent,
      text_content: textContent,
      reply_to: "contact@garnerfinancialpartners.com",
      from_name: "Garner Financial Partners",
      email_type: "otp",
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  const result = (await response.json()) as {
    success: boolean;
    error?: string;
  };
  if (!result.success) {
    throw new Error(`Email sending failed: ${result.error}`);
  }
}

/**
 * Email verification provider for sign-up flow.
 * Sends OTP codes via Viktor Spaces API which:
 * - Rate limits per project (100 emails/hour)
 * - Sends from project-specific email addresses
 * - Keeps the Resend API key secure on the backend
 */
export const ViktorSpacesEmail = Email({
  id: "viktor-spaces-email",
  maxAge: 60 * 15, // 15 minutes

  async generateVerificationToken() {
    return generateOTP();
  },

  async sendVerificationRequest({ identifier: email, token }) {
    await sendEmail({
      email,
      token,
      subject: "Verify your email",
      heading: "Verify your email",
      description: "Enter this code to verify your email address:",
    });
  },
});

/**
 * Password reset email provider.
 * Uses the same Viktor Spaces API but with different email template.
 */
export const ViktorSpacesPasswordReset = Email({
  id: "viktor-spaces-password-reset",
  maxAge: 60 * 15, // 15 minutes

  async generateVerificationToken() {
    return generateOTP();
  },

  async sendVerificationRequest({ identifier: email, token }) {
    await sendEmail({
      email,
      token,
      subject: "Reset your password",
      heading: "Reset your password",
      description: "Enter this code to reset your password:",
    });
  },
});

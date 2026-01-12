// src/mail/mail.service.ts
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateMailDto } from './dto/create-mail.dto';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP configuration missing');
    }

    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  // ============================================================
  // USER ACK EMAIL
  // ============================================================
  async sendPackersAck(dto: CreateMailDto) {
    return this.transporter.sendMail({
      from: `"Annai Packers & Movers" <${process.env.SMTP_USER}>`,
      to: dto.email,
      subject: 'We received your moving enquiry – Annai Packers & Movers',
      html: this.buildPremiumTemplate(dto),
    });
  }

  // ============================================================
  // ADMIN EMAIL (premium look too)
  // ============================================================
  async sendAdminNotification(dto: CreateMailDto) {
    return this.transporter.sendMail({
      from: `"Annai Packers & Movers" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: 'New Moving Enquiry Received',
      html: this.buildAdminTemplate(dto),
    });
  }

  // ============================================================
  // PREMIUM USER EMAIL TEMPLATE (matches website style)
  // ============================================================
  private buildPremiumTemplate(dto: CreateMailDto) {
    const year = new Date().getFullYear();
    const primary = '#EE6B14';
    const dark = '#0f172a';
    const muted = '#64748b';
    const bg = '#f6f7fb';

    return `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Annai Packers & Movers</title>
</head>

<body style="margin:0;padding:0;background:${bg};font-family:Inter,Segoe UI,Arial,sans-serif;color:${dark};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:32px 12px;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="width:600px;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;
          box-shadow:0 16px 40px rgba(15,23,42,0.12);">

          <tr>
            <td style="height:8px;background:linear-gradient(90deg, ${primary}, #ff9a3d);"></td>
          </tr>

          <tr>
  <td style="padding:26px 28px 10px;">
    <table cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding-right:12px;vertical-align:middle;">
          <!-- Logo box -->
          <div style="
            width:44px;height:44px;border-radius:14px;
            background:rgba(238,107,20,0.12);
            display:flex;align-items:center;justify-content:center;
          ">
            <div style="
              width:30px;height:30px;border-radius:12px;
              background:${primary};
              display:flex;align-items:center;justify-content:center;
            ">
              <!-- Inline Truck SVG (white) -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="display:block;">
                <path d="M3 7h11v10H3V7Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
                <path d="M14 10h4l3 3v4h-7v-7Z" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
                <path d="M7 17a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z" stroke="#ffffff" stroke-width="2"/>
                <path d="M18 17a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z" stroke="#ffffff" stroke-width="2"/>
                <path d="M5 21h14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </td>

        <td style="vertical-align:middle;">
          <div style="font-size:18px;font-weight:800;letter-spacing:0.2px;color:${dark};">
            Annai Packers & Movers
          </div>
          <div style="margin-top:2px;font-size:12.5px;color:${muted};">
            Safe • On-time • Professional relocation service
          </div>
        </td>
      </tr>
    </table>
  </td>
</tr>

          <tr>
            <td style="padding:14px 28px 0;">
              <div style="border-radius:16px;background:linear-gradient(135deg, rgba(238,107,20,0.14), rgba(255,255,255,0.9));
                border:1px solid rgba(15,23,42,0.06);padding:18px;">
                <div style="font-size:14px;color:${muted};">
                  Hello <b style="color:${dark};">${this.esc(dto.name)}</b>,
                </div>

                <div style="margin-top:8px;font-size:20px;line-height:1.25;font-weight:800;color:${dark};">
                  We’ve received your moving enquiry
                </div>

                <div style="margin-top:8px;font-size:13.5px;line-height:1.6;color:${muted};">
                  Thank you for contacting us. Our team will call you shortly with a clear estimate and the best schedule for your move.
                </div>

                <div style="margin-top:14px;">
                  <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#ffffff;
                    border:1px solid rgba(15,23,42,0.08);font-size:12px;color:${dark};font-weight:700;margin-right:8px;">
                    Insured handling
                  </span>
                  <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#ffffff;
                    border:1px solid rgba(15,23,42,0.08);font-size:12px;color:${dark};font-weight:700;margin-right:8px;">
                    Professional crew
                  </span>
                  <span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#ffffff;
                    border:1px solid rgba(15,23,42,0.08);font-size:12px;color:${dark};font-weight:700;">
                    Fast support
                  </span>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 0;">
              <div style="border-radius:16px;border:1px solid rgba(15,23,42,0.08);background:#fbfbfe;overflow:hidden;">
                <div style="padding:12px 14px;background:rgba(15,23,42,0.03);font-weight:800;color:${dark};font-size:13px;">
                  Enquiry Summary
                </div>

                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${this.rowPremium('Name', dto.name)}
                  ${this.rowPremium('Email', dto.email)}
                  ${this.rowPremium('Phone', dto.phone)}
                  ${this.rowPremium('City', dto.city)}
                  ${this.rowPremium('Move From', dto.moveFrom)}
                  ${this.rowPremium('Move To', dto.moveTo)}
                  ${this.rowPremium('Message', dto.message || '—', true)}
                </table>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:18px 28px 0;">
              <div style="border-radius:16px;border:1px dashed rgba(238,107,20,0.45);background:rgba(238,107,20,0.06);padding:14px;">
                <div style="font-weight:900;color:${dark};font-size:13px;">What happens next?</div>
                <ul style="margin:10px 0 0 18px;padding:0;color:${muted};font-size:13px;line-height:1.65;">
                  <li>We confirm your pickup & drop locations</li>
                  <li>We share a transparent quote & schedule</li>
                  <li>Our crew arrives on time for packing & loading</li>
                </ul>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:22px 28px 8px;">
              <a href="mailto:${process.env.SMTP_USER}"
                style="display:inline-block;background:${primary};color:#fff;text-decoration:none;font-weight:800;font-size:13px;
                padding:12px 16px;border-radius:999px;">
                Email Support
              </a>
              <span style="display:inline-block;width:10px;"></span>
              <a href="tel:${this.esc(dto.phone)}"
                style="display:inline-block;background:#ffffff;color:${dark};text-decoration:none;font-weight:800;font-size:13px;
                padding:12px 16px;border-radius:999px;border:1px solid rgba(15,23,42,0.10);">
                Call Me Back
              </a>

              <div style="margin-top:12px;font-size:12px;color:${muted};line-height:1.6;">
                If any detail is wrong, just reply to this email and we’ll correct it immediately.
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 28px 24px;">
              <div style="height:1px;background:rgba(15,23,42,0.08);margin:8px 0 14px;"></div>
              <div style="font-size:12px;color:${muted};text-align:center;line-height:1.6;">
                © ${year} Annai Packers & Movers • Bangalore, Karnataka<br/>
                <span style="color:rgba(15,23,42,0.45);">
                  You received this email because you submitted an enquiry on our website.
                </span>
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
  }

  // ============================================================
  // PREMIUM ADMIN TEMPLATE
  // ============================================================
  private buildAdminTemplate(dto: CreateMailDto) {
    const year = new Date().getFullYear();
    const primary = '#EE6B14';
    const dark = '#0f172a';
    const muted = '#64748b';
    const bg = '#f6f7fb';

    return `
<!doctype html>
<html lang="en">
<body style="margin:0;padding:0;background:${bg};font-family:Inter,Segoe UI,Arial,sans-serif;color:${dark};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:28px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
        style="width:600px;max-width:600px;background:#fff;border-radius:18px;overflow:hidden;
        box-shadow:0 16px 40px rgba(15,23,42,0.12);">

        <tr>
          <td style="height:8px;background:linear-gradient(90deg, ${primary}, #ff9a3d);"></td>
        </tr>

        <tr>
          <td style="padding:22px 24px 10px;">
            <div style="font-size:16px;font-weight:900;color:${dark};">New Moving Enquiry</div>
            <div style="margin-top:4px;font-size:12.5px;color:${muted};">Annai Packers & Movers website</div>
          </td>
        </tr>

        <tr>
          <td style="padding:0 24px 18px;">
            <div style="border-radius:16px;border:1px solid rgba(15,23,42,0.08);background:#fbfbfe;overflow:hidden;">
              <div style="padding:12px 14px;background:rgba(15,23,42,0.03);font-weight:800;color:${dark};font-size:13px;">
                Customer Details
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                ${this.rowPremium('Name', dto.name)}
                ${this.rowPremium('Email', dto.email)}
                ${this.rowPremium('Phone', dto.phone)}
                ${this.rowPremium('City', dto.city)}
                ${this.rowPremium('Move From', dto.moveFrom)}
                ${this.rowPremium('Move To', dto.moveTo)}
                ${this.rowPremium('Message', dto.message || '—', true)}
              </table>
            </div>

            <div style="margin-top:14px;">
              <a href="mailto:${this.esc(dto.email)}"
                style="display:inline-block;background:${primary};color:#fff;text-decoration:none;font-weight:800;font-size:13px;
                padding:12px 16px;border-radius:999px;">
                Reply to Customer
              </a>
              <span style="display:inline-block;width:10px;"></span>
              <a href="tel:${this.esc(dto.phone)}"
                style="display:inline-block;background:#ffffff;color:${dark};text-decoration:none;font-weight:800;font-size:13px;
                padding:12px 16px;border-radius:999px;border:1px solid rgba(15,23,42,0.10);">
                Call Customer
              </a>
            </div>

            <div style="margin-top:16px;font-size:12px;color:${muted};text-align:center;">
              © ${year} Annai Packers & Movers
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;
  }

  // ============================================================
  // HELPERS
  // ============================================================
  private rowPremium(label: string, value: string, multiline = false) {
    return `
<tr>
  <td style="width:160px;padding:12px 14px;border-top:1px solid rgba(15,23,42,0.06);color:#64748b;font-weight:800;font-size:12px;">
    ${label}
  </td>
  <td style="padding:12px 14px;border-top:1px solid rgba(15,23,42,0.06);color:#0f172a;font-weight:700;font-size:12.5px;${multiline ? 'white-space:pre-line;' : ''}">
    ${this.esc(value)}
  </td>
</tr>`;
  }

  private esc(v: any) {
    return String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
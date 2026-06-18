import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = async (toEmail, resetLink) => {
  await transporter.sendMail({
    from: `"BidWave" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset Your BidWave Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="background: #f97316; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">BidWave</h1>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
          <h2 style="color: #111827; font-size: 18px;">Reset Your Password</h2>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            We received a request to reset your BidWave password. Click the button below to choose a new password. This link expires in 1 hour.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetLink}" style="background: #f97316; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
              Reset Password
            </a>
          </div>
          <p style="color: #9ca3af; font-size: 12px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      </div>
    `,
  });
};

import { createFileRoute } from "@tanstack/react-router";

const escape = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          return Response.json({ error: "Email service not configured" }, { status: 500 });
        }

        let body: Record<string, string> = {};
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const name = (body.name || "").toString().trim().slice(0, 200);
        const email = (body.email || "").toString().trim().slice(0, 200);
        const subject = (body.subject || "").toString().trim().slice(0, 200);
        const phone = (body.phone || "").toString().trim().slice(0, 60);
        const message = (body.message || "").toString().trim().slice(0, 5000);

        if (!name || !email || !message) {
          return Response.json({ error: "Missing required fields" }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return Response.json({ error: "Invalid email" }, { status: 400 });
        }

        const html = `
          <div style="font-family:Inter,Arial,sans-serif;background:#0f172a;color:#e2e8f0;padding:24px;border-radius:12px;max-width:640px;margin:0 auto">
            <h2 style="margin:0 0 16px;color:#38bdf8">New Portfolio Message</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:6px 0;color:#94a3b8;width:110px">Name</td><td style="padding:6px 0"><strong>${escape(name)}</strong></td></tr>
              <tr><td style="padding:6px 0;color:#94a3b8">Email</td><td style="padding:6px 0">${escape(email)}</td></tr>
              ${phone ? `<tr><td style="padding:6px 0;color:#94a3b8">Phone</td><td style="padding:6px 0">${escape(phone)}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding:6px 0;color:#94a3b8">Subject</td><td style="padding:6px 0">${escape(subject)}</td></tr>` : ""}
            </table>
            <div style="margin-top:20px;padding:16px;background:#1e293b;border-radius:8px;border-left:3px solid #38bdf8;white-space:pre-wrap;font-size:14px;line-height:1.6">${escape(message)}</div>
            <p style="margin-top:20px;font-size:12px;color:#64748b">Sent from your portfolio contact form.</p>
          </div>
        `;

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio <onboarding@resend.dev>",
            to: ["hamza.akhtar0129@gmail.com"],
            reply_to: email,
            subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
            html,
          }),
        });

        if (!res.ok) {
          const errorBody = await res.text();
          console.error(`Resend failed [${res.status}]: ${errorBody}`);
          return Response.json({ error: "Failed to send" }, { status: 502 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});

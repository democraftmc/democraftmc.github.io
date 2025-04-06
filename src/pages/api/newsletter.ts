// src/pages/api/newsletter.ts
import type { APIRoute } from "astro";
import dotenv from "dotenv";

dotenv.config(); // Only needed if running this route without preloading envs (e.g. in dev)

const webhook = process.env.DISCORD_WEBHOOK_URL;

export const POST: APIRoute = async ({ request }) => {
  if (!webhook) {
    return new Response(JSON.stringify({ error: "Webhook not configured" }), {
      status: 500,
    });
  }

  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
      });
    }

    const payload = {
      content: `New newsletter signup: **${email}**`,
    };

    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send to Discord" }),
        { status: 500 },
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
    });
  }
};

import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";
import {
  checkRateLimit,
  isIpBlocked,
  recordStrike,
  sanitizeString,
  hasSqlInjection,
  isSpam,
} from "./security";
import { notifyNewCommission } from "./email";

const PROJECT_TYPES = ["web", "app", "uiux", "backend", "automation", "other"] as const;

export const commissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

export type CommissionInput = z.infer<typeof commissionSchema>;

let tableEnsured = false;

export const submitCommission = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => commissionSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.DATABASE_URL;
    if (!url) {
      console.error("DATABASE_URL not configured");
      return { ok: false as const, error: "Server is not configured" };
    }

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";

    // 1. IP block check
    if (isIpBlocked(ip)) {
      return { ok: false as const, error: "Too many requests. Try again later." };
    }

    // 2. Rate limit
    const limit = checkRateLimit(ip, "commission");
    if (!limit.allowed) {
      recordStrike(ip);
      return { ok: false as const, error: "Too many requests. Try again later." };
    }

    // 3. SQL injection detection (defense in depth — queries are parameterized, but reject suspicious input)
    const allInput = `${data.name} ${data.email} ${data.message} ${data.budget ?? ""}`;
    if (hasSqlInjection(allInput)) {
      recordStrike(ip);
      return { ok: false as const, error: "Invalid input detected." };
    }

    // 4. Spam detection
    if (isSpam(data.message) || isSpam(data.name)) {
      recordStrike(ip);
      return { ok: false as const, error: "Your message was flagged as spam." };
    }

    // 5. Sanitize all string inputs
    const name = sanitizeString(data.name);
    const email = data.email.toLowerCase().trim();
    const message = sanitizeString(data.message);
    const budget = data.budget ? sanitizeString(data.budget) : null;

    try {
      const sql = neon(url);
      if (!tableEnsured) {
        await sql`CREATE TABLE IF NOT EXISTS commissions (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          name text NOT NULL,
          email text NOT NULL,
          project_type text NOT NULL,
          budget text,
          message text NOT NULL,
          status text NOT NULL DEFAULT 'pending',
          admin_notes text,
          created_at timestamptz NOT NULL DEFAULT now(),
          updated_at timestamptz NOT NULL DEFAULT now()
        )`;
        tableEnsured = true;
      }
      await sql`INSERT INTO commissions (name, email, project_type, budget, message)
        VALUES (${name}, ${email}, ${data.projectType}, ${budget}, ${message})`;

      // Send email notification (non-blocking — don't fail the request if email fails)
      notifyNewCommission({
        name,
        email,
        projectType: data.projectType,
        budget,
        message,
      }).catch(() => {});

      return { ok: true as const };
    } catch (err) {
      console.error("submitCommission failed:", err);
      return { ok: false as const, error: "Could not save your request" };
    }
  });

import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const PROJECT_TYPES = ["web", "app", "uiux", "backend", "automation", "other"] as const;

export const commissionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

export type CommissionInput = z.infer<typeof commissionSchema>;

// Simple in-memory rate limit (per IP, 5 / 10min). Resets on cold start.
const hits = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count += 1;
  return true;
}

let tableEnsured = false;
async function ensureTable(sql: ReturnType<typeof neon>) {
  if (tableEnsured) return;
  await sql`CREATE TABLE IF NOT EXISTS commissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    project_type text NOT NULL,
    budget text,
    message text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
  tableEnsured = true;
}

export const submitCommission = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => commissionSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.DATABASE_URL;
    if (!url) {
      console.error("DATABASE_URL not configured");
      return { ok: false as const, error: "Server is not configured" };
    }

    const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";
    if (!rateLimit(ip)) {
      return { ok: false as const, error: "Too many requests. Try again later." };
    }

    try {
      const sql = neon(url);
      await ensureTable(sql);
      await sql`INSERT INTO commissions (name, email, project_type, budget, message)
        VALUES (${data.name}, ${data.email}, ${data.projectType}, ${data.budget || null}, ${data.message})`;
      return { ok: true as const };
    } catch (err) {
      console.error("submitCommission failed:", err);
      return { ok: false as const, error: "Could not save your request" };
    }
  });

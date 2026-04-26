/**
 * Server functions to fetch dynamic content from the shared Neon DB.
 * Used by the user-facing site to render admin-managed content.
 */
import { createServerFn } from "@tanstack/react-start";
import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not configured");
  return neon(url);
}

// Ensure tables exist (safe no-op if already created by admin)
let tablesChecked = false;
async function ensureTables() {
  if (tablesChecked) return;
  const sql = getDb();
  await sql`CREATE TABLE IF NOT EXISTS services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    icon text NOT NULL DEFAULT 'Code2', title text NOT NULL, description text NOT NULL,
    tags text[] NOT NULL DEFAULT '{}', sort_order int NOT NULL DEFAULT 0,
    is_active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  await sql`CREATE TABLE IF NOT EXISTS projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL, category text NOT NULL, year text NOT NULL,
    description text NOT NULL, about text NOT NULL DEFAULT '', stack text[] NOT NULL DEFAULT '{}',
    gradient text NOT NULL DEFAULT 'from-sky-400 to-blue-600', meta text NOT NULL DEFAULT '',
    is_featured boolean NOT NULL DEFAULT false, is_active boolean NOT NULL DEFAULT true,
    sort_order int NOT NULL DEFAULT 0, created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
  )`;
  tablesChecked = true;
}

export interface ServiceRow {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  sort_order: number;
}

export interface ProjectRow {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  about: string;
  stack: string[];
  gradient: string;
  meta: string;
}

export const fetchServices = createServerFn({ method: "GET" }).handler(async () => {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    SELECT id, icon, title, description, tags, sort_order
    FROM services WHERE is_active = true ORDER BY sort_order ASC
  `;
  return rows as ServiceRow[];
});

export const fetchFeaturedProjects = createServerFn({ method: "GET" }).handler(async () => {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, category, year, description, about, stack, gradient, meta
    FROM projects WHERE is_active = true AND is_featured = true
    ORDER BY sort_order ASC, created_at DESC
  `;
  return rows as ProjectRow[];
});

export const fetchAllProjects = createServerFn({ method: "GET" }).handler(async () => {
  await ensureTables();
  const sql = getDb();
  const rows = await sql`
    SELECT id, title, category, year, description, about, stack, gradient
    FROM projects WHERE is_active = true
    ORDER BY sort_order ASC, created_at DESC
  `;
  return rows as ProjectRow[];
});

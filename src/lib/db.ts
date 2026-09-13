import "server-only";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as { cookiequestPool?: Pool };
export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  globalForDb.cookiequestPool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: { rejectUnauthorized: false } });
  return globalForDb.cookiequestPool;
}

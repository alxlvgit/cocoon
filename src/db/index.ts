import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({
  path: ".env.local",
});

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.MIGRATION_DATABASE_URL!);
export const db = drizzle(sql as any, { schema });

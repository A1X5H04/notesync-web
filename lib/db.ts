import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "@/db/schema";

dotenv.config({ path: ".env" });

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

const db = drizzle(client, { schema });
export default db;

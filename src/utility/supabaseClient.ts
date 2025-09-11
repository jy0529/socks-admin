import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://cxktlmwdhtxfzfpoubac.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4a3RsbXdkaHR4ZnpmcG91YmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1ODE5NzUsImV4cCI6MjA3MTE1Nzk3NX0.uBB425pbGRmy0dS5r5loGJUy8-exwGOl12Y2gYRXsHQ";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

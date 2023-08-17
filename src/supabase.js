import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fazlpbtvdthpakubfdan.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhemxwYnR2ZHRocGFrdWJmZGFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0NzQ2OTksImV4cCI6MjAwNzA1MDY5OX0.XGbC8XVRRDbKJwihs5v9f2Wl-XBwoFncU-MRkfmquwE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

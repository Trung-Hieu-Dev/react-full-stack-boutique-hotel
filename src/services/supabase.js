import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jjxptciqbirkhuqarksl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqeHB0Y2lxYmlya2h1cWFya3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2MzUzNDQsImV4cCI6MjAxMTIxMTM0NH0.4r4qqAcgYSWFgEI2whqEuoamlxv6Ja8FGs4vy5C7kvM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

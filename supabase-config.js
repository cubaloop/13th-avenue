// Supabase Client Initialization & Fallback Engine
// Embedded live credentials for 13th Avenue transparent cloud database

(function() {
  const EMBEDDED_SUPABASE_URL = "https://airegckdbjounyoubmqr.supabase.co";
  const EMBEDDED_SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmVnY2tkYmpvdW55b3VibXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwOTA0ODIsImV4cCI6MjEwMTY2NjQ4Mn0.IyykIhxUWFwWgUbsg18iXhrsT8PeuDykwO3e2wBlqD4";

  const savedUrl = localStorage.getItem("supabase_url") || EMBEDDED_SUPABASE_URL;
  const savedKey = localStorage.getItem("supabase_anon_key") || EMBEDDED_SUPABASE_KEY;

  window.SUPABASE_URL = savedUrl;
  window.SUPABASE_ANON_KEY = savedKey;

  if (typeof window.supabase !== "undefined" && window.supabase.createClient && savedUrl && savedKey) {
    try {
      window.supabaseClient = window.supabase.createClient(savedUrl, savedKey);
      console.log("⚡ Supabase Connected Successfully to:", savedUrl);
    } catch (err) {
      console.warn("⚠️ Supabase connection initialization warning:", err);
      window.supabaseClient = null;
    }
  } else {
    window.supabaseClient = null;
  }
})();

// Helper function to save Supabase connection settings directly from Admin Dashboard
window.saveSupabaseCredentials = function(url, key) {
  if (!url || !key) {
    alert("Please provide both Supabase Project URL and Public Anon Key.");
    return false;
  }
  localStorage.setItem("supabase_url", url.trim());
  localStorage.setItem("supabase_anon_key", key.trim());
  alert("✅ Supabase credentials saved successfully! Connecting to database...");
  window.location.reload();
};

window.disconnectSupabase = function() {
  if (confirm("Disconnect Supabase database and fallback to local mode?")) {
    localStorage.removeItem("supabase_url");
    localStorage.removeItem("supabase_anon_key");
    window.location.reload();
  }
};

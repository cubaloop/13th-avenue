const products = require('./products.js');
const siteContent = require('./content.js');

const SUPABASE_URL = "https://airegckdbjounyoubmqr.supabase.co";
const SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcmVnY2tkYmpvdW55b3VibXFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjA5MDQ4MiwiZXhwIjoyMTAxNjY2NDgyfQ.xwnJnrfd0SKH-FcwRsy1R8TQqZowsO60U9vmJhUTrN8";

async function seedSupabase() {
  console.log("🚀 Starting Supabase Seed for 13th Avenue...");

  // 1. Prepare products
  const formattedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    original_price: p.originalPrice || null,
    category: p.category,
    subcategory: p.subcategory,
    image: p.image,
    description: p.description,
    sizes: p.sizes,
    colors: p.colors || [],
    in_stock: p.inStock !== false,
    rating: p.rating || 5.0
  }));

  console.log(`📦 Seeding ${formattedProducts.length} products to Supabase...`);

  const productRes = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    },
    body: JSON.stringify(formattedProducts)
  });

  if (!productRes.ok) {
    const errText = await productRes.text();
    console.error("❌ Product Seed Failed:", errText);
  } else {
    console.log("✅ Products seeded successfully!");
  }

  // 2. Prepare site settings
  const settingsPayload = [
    { key: "announcement", value: siteContent.announcement },
    { key: "heroSlides", value: siteContent.heroSlides },
    { key: "footer", value: siteContent.footer }
  ];

  console.log("⚙️ Seeding site settings to Supabase...");
  const settingsRes = await fetch(`${SUPABASE_URL}/rest/v1/site_settings`, {
    method: "POST",
    headers: {
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates"
    },
    body: JSON.stringify(settingsPayload)
  });

  if (!settingsRes.ok) {
    const errText = await settingsRes.text();
    console.error("❌ Settings Seed Failed:", errText);
  } else {
    console.log("✅ Site settings seeded successfully!");
  }

  console.log("🎉 SUPABASE SEED COMPLETED SUCCESSFULLY!");
}

seedSupabase().catch(err => console.error("Fatal seed error:", err));

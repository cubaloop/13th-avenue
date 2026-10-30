// --- Unified Header & Footer Injection and Localization Engine ---

// Global localization settings
let currentLocale = {
  country: "AE",
  countryName: "United Arab Emirates",
  flag: "🇦🇪",
  language: "fr",
  currency: "AED",
  rate: 1.0 // 1 AED = 1.0 AED
};

// Conversion Rates (Base: AED)
const exchangeRates = {
  AED: 1.0,
  USD: 0.272,  // 1 AED = 0.272 USD
  EUR: 0.25,   // 1 AED = 0.25 EUR
  XOF: 163.50, // 1 AED = 163.50 XOF (West African CFA)
  XAF: 163.50  // 1 AED = 163.50 XAF (Central African CFA)
};

const currencySymbols = {
  AED: "AED د.إ",
  USD: "$",
  EUR: "€",
  XOF: "XOF CFA",
  XAF: "XAF CFA"
};

// Aesthetic Vector SVG Icons for Mega Menu Headers (matching mockups)
const svgIcons = {
  hanger: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M12 2a3 3 0 0 0-3 3c0 .8.4 1.5 1 2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7c.6-.5 1-1.2 1-2a3 3 0 0 0-3-3z"/><path d="M6 10h12"/></svg>`,
  heel: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M4 18c1-3 3.5-5.5 7-5.5h1.5l5.5 8h1V5h-1L13 12.5H9.5c-2.5 0-4.5 1-5.5 3.5zm14 3h-1l-3.5-8.5H13v8.5h5z"/></svg>`,
  handbag: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M16 8V6a4 4 0 0 0-8 0v2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-4zM10 6a2 2 0 0 1 4 0v2h-4V6z"/></svg>`,
  diamond: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M6 3h12l4 5-10 13L2 8zM11 3L7 8h10l-4-5z"/></svg>`,
  glasses: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M2 10a3 3 0 0 0 6 0m8 0a3 3 0 0 0 6 0M8 10h8m-8-2V5m8 3V5"/></svg>`,
  star: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9 12 2"/></svg>`,
  user: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`,
  wind: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M4 6h16M4 12h10m-10 6h14"/></svg>`,
  book: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  lipstick: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M10 22h4v-6h-4zm2-6V2a2 2 0 0 0-2 2v6H8v2h2v4z"/></svg>`,
  nailpolish: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M12 2a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4zm2 12H10V6h4v8zM12 2v4"/></svg>`,
  skincare: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M6 10h12v10H6zm2-6h8v6H8z"/></svg>`,
  perfume: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M7 8h10v12H7zM10 4h4v4h-4zM12 2v2"/></svg>`,
  dryer: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M18 10h-6a4 4 0 0 0-4 4v4m10-8V6a2 2 0 0 0-2-2h-4"/></svg>`,
  soap: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M8 20h8a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM12 2v5"/></svg>`,
  baby: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M6 3h12v12l-3 4-3-4-3 4-3-4zM9 3v4m6-4v4"/></svg>`,
  dress: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M12 3L6 9v11h12V9zM8 9h8"/></svg>`,
  shapes: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><rect x="4" y="4" width="6" height="6" rx="1"/><circle cx="16" cy="7" r="3"/><polygon points="12 14 16 21 8 21"/></svg>`,
  bottle: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M9 10h6V6a3 3 0 0 0-6 0zm3-8v4M9 10L7 20h10l-2-10"/></svg>`,
  ribbon: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 0v10m-3-10l-4 6m10-6l4 6"/></svg>`,
  gift: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M12 4a3 3 0 1 0 0 4 3 3 0 0 0 0-4zM12 8v12M3 12h18"/></svg>`,
  tiara: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M2 16l3-8 4 4 3-8 3 8 4-4 3 8zM2 18h20"/></svg>`,
  ring: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><circle cx="12" cy="14" r="6"/><polygon points="12 2 15 6 9 6"/></svg>`,
  bouquet: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><circle cx="12" cy="14" r="3"/><path d="M12 17v5"/></svg>`,
  trophy: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M6 9H4.5A2.5 2.5 0 0 1 2 6.5v0A2.5 2.5 0 0 1 4.5 4H6zm12 0h1.5A2.5 2.5 0 0 0 22 6.5v0A2.5 2.5 0 0 0 19.5 4H18zm-12-5h12v10a6 6 0 0 1-12 0zm6 11v6m-4 0h8"/></svg>`,
  calendar: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  tag: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/></svg>`,
  crown: (color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; display:inline-block;"><path d="M2 18h20L19 7l-5 5-2-7-2 7-5-5z"/></svg>`
};

// Translations Dictionary
const t = {
  fr: {
    home: "ACCUEIL",
    recentlyViewed: "Vu récemment",
    shopAll: "Tout shopper",
    login: "Connexion",
    wishlist: "Favoris",
    basket: "Panier",
    searchPlaceholder: "Rechercher des produits, abayas, perruques...",
    yourBag: "Votre Panier",
    subtotal: "Sous-total",
    discount: "Remise (15%)",
    shipping: "Livraison",
    total: "Total (TVA incl.)",
    checkoutBtn: "Passer à la caisse",
    viewBag: "Voir le panier détaillé",
    free: "GRATUIT",
    regionsTitle: "VOTRE DEVISE ET RÉGION",
    selectLang: "CHOISIR LA LANGUE",
    selectRegion: "CHOISIR LA RÉGION / DEVISE",
    searchPlaceholderModal: "Rechercher une devise ou région...",
    viewAllCountries: "Voir tous les pays",
    recommended: "Recommandé",
    applyBtn: "Appliquer",
    noProducts: "Aucun produit trouvé",
    sortBy: "Trier par",
    featured: "Vedette",
    brandsTitle: "MARQUES",
    categoriesTitle: "CATÉGORIES",
    sizesTitle: "TAILLES",
    allCategories: "Toutes les catégories",
    aboutUsTitle: "À PROPOS DE 13TH AVENUE",
    aboutHeading: "Plus qu'une boutique.<br>Une Maison de marques <span style=\"color:var(--gold-brand)\">Lifestyle</span>.",
    aboutDesc: "Chez 13TH AVENUE, nous réunissons mode, beauté, cheveux de luxe, enfants et mariage sous une seule destination de shopping d'exception.",
    joinAvenueTitle: "REJOIGNEZ THE AVENUE",
    joinAvenueDesc: "Abonnez-vous pour débloquer 15% de réduction sur votre première commande et recevoir les notifications de nos collections exclusives.",
    announcementText: "⭐ -15% EXTRA POUR LES NOUVEAUX CLIENTS &bull; CODE : <span style=\"color:#db2777; font-weight:900;\">NEW15</span>",
    discoverStory: "Découvrir notre histoire",
    stayInKnow: "RESTEZ INFORMÉ",
    stayInKnowSub: "Inscrivez-vous pour des offres exclusives, nouveautés et inspirations.",
    emailPlaceholder: "Entrez votre adresse e-mail",
    subscribe: "S'ABONNER",
    subtextNewsletter: "En vous abonnant, vous acceptez de recevoir des communications marketing de 13TH AVENUE.",
    securePayment: "PAIEMENT SÉCURISÉ",
    securePaymentSub: "100% Protégé",
    premiumQuality: "QUALITÉ SUPÉRIEURE",
    premiumQualitySub: "Soigneusement Sélectionné",
    supportTitle: "SUPPORT CLIENT 24/7",
    supportSub: "Nous sommes là pour vous",
    weAccept: "NOUS ACCEPTONS",
    newArrivals: "Nouveautés",
    bestSellers: "Meilleures ventes",
    limitedEdition: "Édition limitée",
    sale: "Soldes",
    accountTitle: "Mon Compte",
    signInBtn: "SE CONNECTER",
    createAccountBtn: "CRÉER UN COMPTE",
    orderHistory: "Historique des commandes",
    myDetails: "Mes informations",
    returnsInfo: "Retours et remboursements",
    deliveryInfo: "Informations de livraison",
    recentlyViewedDrawerTitle: "Produits consultés",
    noRecentlyViewed: "Aucun produit consulté récemment.",
    shopColTitle: "BOUTIQUE",
    customerCareColTitle: "SERVICE CLIENT",
    companyColTitle: "ENTREPRISE",
    contactColTitle: "CONTACT",
    weddingCollection: "Collection Mariage",
    trending: "Tendances",
    contactUs: "Contactez-nous",
    faqs: "Foire aux questions (FAQ)",
    shippingDelivery: "Livraison & Expédition",
    returnsExchanges: "Retours & Échanges",
    trackOrder: "Suivre ma commande",
    sizeGuide: "Guide des tailles",
    aboutUs: "À propos de nous",
    ourBrands: "Nos marques",
    privacyPolicy: "Politique de confidentialité",
    termsConditions: "Conditions générales",
    cookiePolicy: "Politique des cookies",
    contactSub: "Maison de marques Lifestyle",
    contactAddress: "Dubaï, Émirats Arabes Unis",
    contactHours: "Lun - Dim | 9h - 21h"
  },
  en: {
    home: "HOME",
    recentlyViewed: "Recently Viewed",
    shopAll: "Shop All",
    login: "Login",
    wishlist: "Wishlist",
    basket: "Basket",
    searchPlaceholder: "Search products, abayas, wigs, home...",
    yourBag: "Your Bag",
    subtotal: "Subtotal",
    discount: "Discount (15%)",
    shipping: "Shipping",
    total: "Total (inc. VAT)",
    checkoutBtn: "Proceed to Checkout",
    viewBag: "View Detailed Bag",
    free: "FREE",
    regionsTitle: "YOUR CURRENCY AND REGION",
    selectLang: "SELECT LANGUAGE",
    selectRegion: "SELECT REGION/CURRENCY",
    searchPlaceholderModal: "Search for currency or region...",
    viewAllCountries: "View all countries",
    recommended: "Recommended",
    applyBtn: "Apply",
    noProducts: "0 products found",
    sortBy: "Sort by",
    featured: "Featured",
    brandsTitle: "BRANDS",
    categoriesTitle: "CATEGORIES",
    sizesTitle: "SIZE OPTIONS",
    allCategories: "All Categories",
    aboutUsTitle: "ABOUT 13TH AVENUE",
    aboutHeading: "More than a store.<br>A <span style=\"color:var(--gold-brand)\">Lifestyle</span> Brand House.",
    aboutDesc: "At 13TH AVENUE, we bring together fashion, beauty, luxury hair, kids and weddings under one premium shopping destination.",
    joinAvenueTitle: "JOIN THE AVENUE",
    joinAvenueDesc: "Subscribe to unlock 15% discount on your first purchase and receive notifications of exclusive collection drops.",
    announcementText: "⭐ EXTRA 15% OFF FOR NEW CUSTOMERS &bull; USE CODE: <span style=\"color:#db2777; font-weight:900;\">NEW15</span>",
    discoverStory: "Discover Our Story",
    stayInKnow: "STAY IN THE KNOW",
    stayInKnowSub: "Sign up for exclusive offers, new arrivals and lifestyle inspiration.",
    emailPlaceholder: "Enter your email address",
    subscribe: "SUBSCRIBE",
    subtextNewsletter: "By subscribing, you agree to receive marketing communications from 13TH AVENUE.",
    securePayment: "SECURE PAYMENT",
    securePaymentSub: "100% Protected",
    premiumQuality: "PREMIUM QUALITY",
    premiumQualitySub: "Carefully Selected",
    supportTitle: "24/7 CUSTOMER SUPPORT",
    supportSub: "We're here for you",
    weAccept: "WE ACCEPT",
    newArrivals: "New Arrivals",
    bestSellers: "Best Sellers",
    limitedEdition: "Limited Edition",
    sale: "Sale",
    accountTitle: "My Account",
    signInBtn: "SIGN IN",
    createAccountBtn: "CREATE ACCOUNT",
    orderHistory: "Order History",
    myDetails: "My Details",
    returnsInfo: "Returns Information",
    deliveryInfo: "Delivery Information",
    recentlyViewedDrawerTitle: "Recently Viewed",
    noRecentlyViewed: "No recently viewed products.",
    shopColTitle: "SHOP",
    customerCareColTitle: "CUSTOMER CARE",
    companyColTitle: "COMPANY",
    contactColTitle: "CONTACT",
    weddingCollection: "Wedding Collection",
    trending: "Trending",
    contactUs: "Contact Us",
    faqs: "FAQs",
    shippingDelivery: "Shipping & Delivery",
    returnsExchanges: "Returns & Exchanges",
    trackOrder: "Track Your Order",
    sizeGuide: "Size Guide",
    aboutUs: "About Us",
    ourBrands: "Our Brands",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    cookiePolicy: "Cookie Policy",
    contactSub: "Lifestyle Brand House",
    contactAddress: "Dubai, United Arab Emirates",
    contactHours: "Mon - Sun | 9AM - 9PM"
  }
};

// Global pricing formatting function
function formatPrice(priceInAED) {
  const amount = priceInAED * currentLocale.rate;
  const currency = currentLocale.currency;
  if (currency === "USD") {
    return `$${amount.toFixed(2)}`;
  } else if (currency === "EUR") {
    return `€${amount.toFixed(2)}`;
  } else if (currency === "XOF" || currency === "XAF") {
    return `${Math.round(amount).toLocaleString()} ${currency}`;
  } else {
    return `${Math.round(amount).toLocaleString()} AED`;
  }
}

// Country lists for selector modal
const countriesList = [
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", recommended: true },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR" },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR" },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD" },
  { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮", currency: "XOF" },
  { code: "SN", name: "Sénégal", flag: "🇸🇳", currency: "XOF" },
  { code: "ML", name: "Mali", flag: "🇲🇱", currency: "XOF" },
  { code: "BF", name: "Burkina Faso", flag: "🇧🇫", currency: "XOF" },
  { code: "NE", name: "Niger", flag: "🇳🇪", currency: "XOF" },
  { code: "TG", name: "Togo", flag: "🇹🇬", currency: "XOF" },
  { code: "BJ", name: "Bénin", flag: "🇧🇯", currency: "XOF" },
  { code: "CG", name: "Congo (Brazzaville)", flag: "🇨🇬", currency: "XAF" },
  { code: "CD", name: "République Démocratique du Congo", flag: "🇨🇩", currency: "USD" }, // CDF/USD
  { code: "CM", name: "Cameroun", flag: "🇨🇲", currency: "XAF" },
  { code: "CF", name: "République Centrafricaine", flag: "🇨🇫", currency: "XAF" },
  { code: "TD", name: "Tchad", flag: "🇹🇩", currency: "XAF" },
  { code: "GA", name: "Gabon", flag: "🇬🇦", currency: "XAF" }
];

// Initialize Localization
function initLocalization() {
  const savedLocale = localStorage.getItem("user_locale");
  if (savedLocale) {
    try {
      const parsed = JSON.parse(savedLocale);
      if (parsed && typeof parsed === "object") {
        currentLocale = {
          ...currentLocale,
          ...parsed,
          language: (parsed.language === "en" || parsed.language === "fr") ? parsed.language : "en"
        };
      }
    } catch (e) {}
  } else {
    // Attempt Auto-Detection via Geo IP lookup
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code || "AE";
        const matched = countriesList.find(c => c.code === countryCode);
        if (matched) {
          const frenchSpeaking = ["FR", "CI", "SN", "ML", "BF", "NE", "TG", "BJ", "CG", "CD", "CM", "CF", "TD", "GA"];
          const detectedLang = frenchSpeaking.includes(matched.code) ? "fr" : "en";
          const changed = (currentLocale.country !== matched.code) || (currentLocale.language !== detectedLang);

          currentLocale.country = matched.code;
          currentLocale.countryName = matched.name;
          currentLocale.flag = matched.flag;
          currentLocale.currency = matched.currency;
          currentLocale.rate = exchangeRates[matched.currency] || 1.0;
          currentLocale.language = detectedLang;
          
          localStorage.setItem("user_locale", JSON.stringify(currentLocale));
          // Refresh components only if locale changed and mobile drawer is not actively open
          const navOpen = document.getElementById("main-nav")?.classList.contains("active");
          if (changed && !navOpen) {
            renderAllDynamicComponents();
          }
        }
      })
      .catch(err => {
        console.warn("Geo IP detection failed. Falling back to default UAE.", err);
      });
  }
}

// Render dynamic components: Header, Navigation Mega Menus, Footer, Localization Popup, Cart Drawer
function renderAllDynamicComponents() {
  const lang = (currentLocale && (currentLocale.language === "en" || currentLocale.language === "fr")) ? currentLocale.language : "en";
  const trans = t[lang] || t.en;
  const isFr = lang === "fr";

  // 1. Announcement Bar (Removed per Requirement 1)
  const announceEl = document.querySelector(".announcement-bar");
  if (announceEl) {
    announceEl.remove();
  }

  // 2. Main Header Inner Content
  const headerContainer = document.querySelector(".main-header .container");
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="header-top">
        <button type="button" class="menu-toggle-btn" id="menu-toggle-btn" aria-label="Open Menu">
          <i class="fas fa-bars"></i>
        </button>
        
        <div class="search-bar-container">
          <button type="button" class="search-icon-btn" id="search-submit-btn" aria-label="Search"><i class="fas fa-search"></i></button>
          <input type="text" id="search-input" class="search-input" placeholder="${trans.searchPlaceholder}" value="${getSearchQuery()}">
        </div>

        <div class="logo-container">
          <a href="index.html" class="brand-logo">
            13th Avenue
            <span>Lifestyle Brand House</span>
          </a>
        </div>

        <div class="header-actions">
          <!-- Small EN/FR Language Toggle Switch (White & Grey per Requirement 13) -->
          <div class="lang-switch-toggle" onclick="toggleLanguage()" title="Switch Language / Changer de langue" style="display: inline-flex; align-items: center; background: #f4f4f5; border: 1px solid #e4e4e7; padding: 2px; border-radius: 14px; cursor: pointer; user-select: none; gap: 2px; font-family: var(--font-sans); margin-right: 2px; vertical-align: middle;">
            <span style="padding: 2px 6px; font-size: 10px; font-weight: 800; border-radius: 11px; transition: all 0.2s ease; ${lang === 'en' ? 'background: #ffffff; color: #52525b; box-shadow: 0 1px 2px rgba(0,0,0,0.08);' : 'color: #a1a1aa;'}">EN</span>
            <span style="padding: 2px 6px; font-size: 10px; font-weight: 800; border-radius: 11px; transition: all 0.2s ease; ${lang === 'fr' ? 'background: #ffffff; color: #52525b; box-shadow: 0 1px 2px rgba(0,0,0,0.08);' : 'color: #a1a1aa;'}">FR</span>
          </div>

          <!-- Localization Trigger -->
          <button type="button" class="action-icon-btn" id="locale-modal-trigger" title="${trans.regionsTitle}">
            <img src="https://flagcdn.com/w20/${(currentLocale.country || 'AE').toLowerCase()}.png" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" 
                 style="width: 20px; height: 14px; border-radius: 2px; border: 1px solid rgba(0,0,0,0.15); vertical-align: middle; object-fit: cover; display: inline-block;">
            <span class="flag-fallback" style="display: none; font-size: 10px; font-weight: 700; background: #e2e8f0; color: #475569; padding: 1px 4px; border-radius: 3px; vertical-align: middle; text-transform: uppercase; margin-right: 2px;">${currentLocale.country || 'AE'}</span>
            <span class="action-label" style="font-size:11px; margin-left:4px; font-weight:700;">${currentLocale.currency || 'AED'}</span>
            <i class="fas fa-chevron-down action-label" style="font-size:8px; margin-left:2px;"></i>
          </button>
          
          <!-- Recently Viewed Trigger -->
          <button type="button" class="action-icon-btn" id="recently-viewed-trigger" title="${trans.recentlyViewed}">
            <i class="far fa-clock"></i>
            <span class="action-label">${trans.recentlyViewed}</span>
          </button>

          <!-- Shop All (Directory) Link -->
          <a href="all-collections.html" class="action-icon-btn" title="${trans.shopAll}">
            <i class="fas fa-store"></i>
            <span class="action-label">${trans.shopAll}</span>
          </a>

          ${localStorage.getItem("admin_logged_in") === "true" ? `
            <button type="button" onclick="window.openMomentosAdminModal('stats')" class="momentos-header-admin-pill" title="Abrir Panel de Administración y Estadísticas Reales">
              <i class="fas fa-crown"></i>
              <span>Admin</span>
            </button>
          ` : ''}

          <!-- Account/Login Dropdown Trigger -->
          <div class="account-menu-dropdown-container">
            <button type="button" class="action-icon-btn" id="account-dropdown-trigger" title="${trans.login}">
              <i class="far fa-user"></i>
              <span class="action-label">${localStorage.getItem("admin_logged_in") === "true" ? "Admin" : (localStorage.getItem("user_logged_in") || trans.login)}</span>
            </button>
            
            <!-- Login/Account Popover Box (Mockup 9) -->
            <div class="account-popover-box" id="account-popover-box">
              ${localStorage.getItem("admin_logged_in") === "true" ? `
                <div style="padding:8px 12px; background:#fef3c7; border:1px solid #fde68a; border-radius:6px; margin-bottom:10px; font-size:11px; color:#92400e; font-weight:700; text-align:center;">
                  👑 Sesión Administrador Activa
                </div>
                <a href="#" class="btn-signin-popover" style="background:#d97706 !important; color:#fff !important; border-color:#d97706 !important;" onclick="window.toggleMomentosEditMode(); return false;">
                  ✏️ ${localStorage.getItem("avenue13_live_edit_mode") !== "false" ? "Modo Editor: ACTIVO" : "Activar Modo Editor"}
                </a>
                <a href="#" class="btn-create-popover" onclick="window.openMomentosAdminModal('stats'); return false;">📊 Panel y Estadísticas</a>
                <hr class="popover-divider">
                <ul class="popover-links-list">
                  <li><a href="#" onclick="window.openInPageProductModal(null); return false;"><span style="margin-right:8px; font-size:14px;">➕</span> Nuevo Producto</a></li>
                  <li><a href="#" onclick="window.openMomentosAdminModal('catalog'); return false;"><span style="margin-right:8px; font-size:14px;">🛍️</span> Gestionar Catálogo</a></li>
                  <li><a href="#" onclick="window.openMomentosAdminModal('banners'); return false;"><span style="margin-right:8px; font-size:14px;">🖼️</span> Cambiar Imágenes / Banners</a></li>
                  <li><a href="admin.html"><span style="margin-right:8px; font-size:14px;">⚙️</span> Consola Avanzada (admin.html)</a></li>
                  <li><a href="#" style="color:#ef4444; font-weight:700;" onclick="window.logoutAdminInPage(); return false;"><span style="margin-right:8px; font-size:14px;">🚪</span> Cerrar Sesión Admin</a></li>
                </ul>
              ` : `
                <a href="#" class="btn-signin-popover" onclick="handleAccountAction('signin'); return false;">${trans.signInBtn}</a>
                <a href="#" class="btn-create-popover" onclick="handleAccountAction('create'); return false;">${trans.createAccountBtn}</a>
                <hr class="popover-divider">
                <ul class="popover-links-list">
                  <li><a href="#" onclick="handleAccountAction('account'); return false;"><span style="margin-right:8px; font-size:14px;">田</span> ${trans.accountTitle}</a></li>
                  <li><a href="#" onclick="handleAccountAction('orders'); return false;"><span style="margin-right:8px; font-size:14px;">📦</span> ${trans.orderHistory}</a></li>
                  <li><a href="#" onclick="handleAccountAction('details'); return false;"><span style="margin-right:8px; font-size:14px;">👤</span> ${trans.myDetails}</a></li>
                  <li><a href="#" onclick="handleAccountAction('returns'); return false;"><span style="margin-right:8px; font-size:14px;">↺</span> ${trans.returnsInfo}</a></li>
                  <li><a href="#" onclick="handleAccountAction('delivery'); return false;"><span style="margin-right:8px; font-size:14px;">🚚</span> ${trans.deliveryInfo}</a></li>
                </ul>
              `}
            </div>
          </div>

          <!-- Basket (Cart) Toggle -->
          <button type="button" class="action-icon-btn" id="cart-toggle-btn" title="${trans.basket}">
            <i class="fas fa-shopping-bag"></i>
            <span class="badge-count" id="cart-badge" style="display: none;">0</span>
            <span class="action-label">${trans.basket}</span>
          </button>
        </div>
      </div>
    `;
  }

  // 3. Navigation Mega Menus
  const mainNav = document.getElementById("main-nav");
  if (mainNav) {
    const langLabel = isFr ? 'Français' : 'English';
    const countryLabel = currentLocale.countryName || (isFr ? 'Émirats Arabes Unis' : 'United Arab Emirates');
    const currencyLabel = `${currentLocale.currency} / 🇦🇪`;

    mainNav.innerHTML = `
      <!-- Mobile Drawer Top Header (Photo 1 reference: Close X button) -->
      <div class="mobile-drawer-header">
        <button type="button" class="mobile-drawer-close-btn" id="mobile-drawer-close-btn" onclick="window.closeMobileDrawer()" aria-label="Close menu">
          <i class="fas fa-times"></i>
        </button>
        <a href="index.html" onclick="window.closeMobileDrawer()" style="font-family: var(--font-serif); font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-main); text-decoration: none;">13TH AVENUE</a>
        <div style="width: 28px;"></div>
      </div>

      <!-- Scrollable Navigation Body -->
      <div class="mobile-drawer-scroll-body">
        <ul class="nav-links">
          <li class="nav-item no-chevron">
            <a href="index.html" class="nav-link" onclick="window.closeMobileDrawer()">${trans.home}</a>
          </li>
          
          <!-- Fashion (Miss Chloé) Mega Menu -->
          <li class="nav-item">
            <a href="category.html?brand=Miss Chloé" class="nav-link">${isFr ? 'Mode' : 'Fashion'}</a>
            <div class="mega-menu miss-chloe-menu">
              <div class="mega-col mega-col-brand">
                <div class="mega-brand-name">Miss Chloé</div>
                <p class="mega-brand-desc">Timeless fashion, refined accessories and statement pieces for the modern woman.</p>
                <a href="category.html?brand=Miss Chloé" class="btn-mega-action">SHOP MISS CHLOÉ</a>
                <img src="assets/cat_fashion.png" alt="Miss Chloé" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.hanger('#c5a880')} SHOP BY APPAREL</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Dresses">Dresses</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Abayas">Abayas</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Sets">Sets</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Casual Wear">Casual Wear</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Evening Wear">Evening Wear</a></li>
                </ul>
                <img src="assets/emerald_dress.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.heel('#c5a880')} SHOES</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Heels">Heels</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Flats">Flats</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Sandals">Sandals</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Boots">Boots</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Sneakers">Sneakers</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.handbag('#c5a880')} BAGS</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Shoulder Bags">Handbags</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Shoulder Bags">Clutches</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Shoulder Bags">Crossbody Bags</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Shoulder Bags">Tote Bags</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Shoulder Bags">Shoulder Bags</a></li>
                </ul>
                <img src="assets/exclusive_jacket.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.diamond('#c5a880')} JEWELRY</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Earrings">Earrings</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Necklaces">Necklaces</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Bracelets">Bracelets</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Rings">Rings</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Anklets">Anklets</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Jewelry Sets">Jewelry Sets</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.glasses('#c5a880')} ACCESSORIES</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Sunglasses">Sunglasses</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Belts">Belts</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Scarves">Scarves</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Hats">Hats</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Hair Accessories">Hair Accessories</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.star('#c5a880')} COLLECTIONS</div>
                <ul>
                  <li><a href="category.html?brand=Miss Chloé&sort=newest">${trans.newArrivals}</a></li>
                  <li><a href="category.html?brand=Miss Chloé&sort=popular">${trans.bestSellers}</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Limited Edition">${trans.limitedEdition}</a></li>
                  <li><a href="category.html?brand=Miss Chloé&subcategory=Sale" style="color:var(--sale-red); font-weight:700;">${trans.sale}</a></li>
                </ul>
                <img src="assets/black_abaya.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- Hair (Nella Hair Couture) Mega Menu -->
          <li class="nav-item">
            <a href="category.html?brand=Nella Hair Couture" class="nav-link">${isFr ? 'Cheveux' : 'Hair'}</a>
            <div class="mega-menu nella-hair-menu">
              <div class="mega-col mega-col-brand">
                <div class="mega-brand-name" style="font-size:20px;">Nella Hair Couture</div>
                <div class="mega-brand-subtitle">100% HUMAN LACE WIGS</div>
                <p class="mega-brand-desc">Uncompromising luxury wigs, HD lace frontals, and clip-in extensions crafted from 100% human Remy hair.</p>
                <a href="category.html?brand=Nella Hair Couture" class="btn-mega-action">SHOP NELLA HAIR</a>
                <img src="assets/lace_wig.png" alt="Nella Hair" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.user('#c5a880')} SHOP BY PRODUCT</div>
                <ul>
                  <li><a href="category.html?brand=Nella Hair Couture&subcategory=Wigs">Wigs</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&subcategory=Extensions">Extensions</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&subcategory=Hair Care">Hair Care</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&subcategory=Hair Accessories">Hair Accessories</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&subcategory=Hair Tools">Hair Tools</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.wind('#c5a880')} SHOP BY STYLE</div>
                <ul>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Straight">Straight</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Body Wave">Body Wave</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Curly">Curly</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Water Wave">Water Wave</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Bob">Bob</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.diamond('#c5a880')} SHOP BY LACE</div>
                <ul>
                  <li><a href="category.html?brand=Nella Hair Couture&search=HD">HD Lace</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Transparent">Transparent Lace</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Glueless">Glueless</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Closure">Closure</a></li>
                  <li><a href="category.html?brand=Nella Hair Couture&search=Frontal">Frontal</a></li>
                </ul>
                <img src="assets/lace_wig.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #c5a880; border-bottom-color: rgba(197, 168, 128, 0.3);">${svgIcons.book('#c5a880')} HAIR GUIDES</div>
                <ul>
                  <li><a href="#" onclick="alert('Lace Guide: Melt your lace frontals using organic glues.'); return false;">Lace Guide</a></li>
                  <li><a href="#" onclick="alert('Hair Care: Wash extensions using sulfate-free formulas.'); return false;">Hair Care</a></li>
                  <li><a href="#" onclick="alert('Density Guide: Choose 180% density for maximum volume.'); return false;">Density Guide</a></li>
                  <li><a href="#" onclick="alert('Installation Guide: Braid hair flat before wig application.'); return false;">Installation Guide</a></li>
                  <li><a href="#" onclick="alert('FAQ: Our human Remy hair lasts over 2 years.'); return false;">FAQ</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- Beauty (COCO Beauty) Mega Menu -->
          <li class="nav-item">
            <a href="category.html?brand=COCO Beauty" class="nav-link">${isFr ? 'Beauté' : 'Beauty'}</a>
            <div class="mega-menu coco-beauty-menu">
              <div class="mega-col mega-col-brand">
                <div class="mega-brand-name">COCO Beauty</div>
                <p class="mega-brand-desc">Premium beauty & self-care essentials for your best self, every day.</p>
                <a href="category.html?brand=COCO Beauty" class="btn-mega-action">SHOP COCO BEAUTY</a>
                <img src="assets/cat_beauty.png" alt="COCO Beauty" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.lipstick('#db2777')} MAKEUP</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Makeup">Face</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Makeup">Eyes</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Makeup">Lips</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Makeup">Brows</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Makeup">Makeup Accessories</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.nailpolish('#db2777')} NAILS</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Nail Polish</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Gel Polish</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Nail Care</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Nail Tools</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Press-On Nails</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Nails">Nail Accessories</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.skincare('#db2777')} SKINCARE</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Cleansers</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Toners</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Serums</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Moisturizers</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Masks</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Sunscreen</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Skincare">Eye Care</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.perfume('#db2777')} FRAGRANCES</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Fragrances">Perfumes</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Fragrances">Body Mist</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Fragrances">Perfume Oils</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Fragrances">Gift Sets</a></li>
                </ul>
                <img src="assets/coco_candle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.dryer('#db2777')} BEAUTY TOOLS</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Hair Tools</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Facial Devices</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Beauty Gadgets</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Makeup Brushes</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Beauty Sponges</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Beauty Mirrors</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Cosmetic Bags</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Beauty Tools">Makeup Organizers</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.soap('#db2777')} BATH & BODY</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Body Lotion</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Body Butter</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Body Scrub</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Shower Gel</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Hand Care</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Foot Care</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Bath & Body">Soaps</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #db2777; border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.star('#db2777')} TRENDING</div>
                <ul>
                  <li><a href="category.html?brand=COCO Beauty&sort=newest">${trans.newArrivals}</a></li>
                  <li><a href="category.html?brand=COCO Beauty&sort=popular">${trans.bestSellers}</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Gifts">Gift Sets</a></li>
                  <li><a href="category.html?brand=COCO Beauty&subcategory=Sale" style="color:var(--sale-red); font-weight:700;">${trans.sale}</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- Kids (COCO Mini) Mega Menu -->
          <li class="nav-item">
            <a href="category.html?brand=COCO Mini" class="nav-link">${isFr ? 'Enfants' : 'Kids'}</a>
            <div class="mega-menu coco-mini-menu">
              <div class="mega-col mega-col-brand">
                <div class="mega-brand-name">COCO Mini</div>
                <p class="mega-brand-desc">Everything your little ones need, all in one beautiful place.</p>
                <a href="category.html?brand=COCO Mini" class="btn-mega-action">SHOP COCO MINI</a>
                <img src="assets/cat_lifestyle.png" alt="COCO Mini" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #e17a74; border-bottom-color: rgba(225, 122, 116, 0.3);">${svgIcons.baby('#e17a74')} BABY CLOTHING</div>
                <ul>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Clothing">Newborn</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Clothing">Baby Girl</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Clothing">Baby Boy</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #e17a74; border-bottom-color: rgba(225, 122, 116, 0.3);">${svgIcons.dress('#e17a74')} KIDS FASHION</div>
                <ul>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Kids Fashion">Girls</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Kids Fashion">Boys</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Kids Fashion">Shoes</a></li>
                </ul>
                <img src="assets/cat_fashion.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #e17a74; border-bottom-color: rgba(225, 122, 116, 0.3);">${svgIcons.shapes('#e17a74')} TOYS</div>
                <ul>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Toys">Educational Toys</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Toys">Plush Toys</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Toys">Outdoor Toys</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #e17a74; border-bottom-color: rgba(225, 122, 116, 0.3);">${svgIcons.bottle('#e17a74')} BABY ESSENTIALS</div>
                <ul>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Essentials">Swaddles & Blankets</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Essentials">Bibs & Accessories</a></li>
                  <li><a href="category.html?brand=COCO Mini&subcategory=Baby Essentials">Nursery Decor</a></li>
                </ul>
                <img src="assets/coco_candle.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- Wedding (Wedding Collection) Mega Menu -->
          <li class="nav-item">
            <a href="category.html?brand=Wedding Collection" class="nav-link">${isFr ? 'Mariage' : 'Wedding'}</a>
            <div class="mega-menu wedding-menu">
              <div class="mega-col mega-col-brand">
                <div class="mega-brand-name">Wedding Collection</div>
                <p class="mega-brand-desc">Breathtaking bridal gowns, lace veils, sparkling jewelry and wedding guest attire.</p>
                <a href="category.html?brand=Wedding Collection" class="btn-mega-action">SHOP WEDDING</a>
                <img src="assets/cat_exclusive.png" alt="Wedding" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.ring('#be123c')} BRIDAL GOWNS</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridal Gowns">Wedding Dresses</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridal Gowns">Reception Dresses</a></li>
                </ul>
                <img src="assets/emerald_dress.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.crown('#be123c')} VEILS & TIARAS</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Veils & Tiaras">Lace Veils</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Veils & Tiaras">Tiaras & Hair Combs</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.user('#be123c')} BRIDESMAIDS & GUESTS</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridesmaids & Guests">Bridesmaid Dresses</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridesmaids & Guests">Wedding Guest Dresses</a></li>
                </ul>
                <img src="assets/cat_fashion.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.handbag('#be123c')} BRIDAL ACCESSORIES</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridal Accessories">Bridal Jewelry</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridal Accessories">Bridal Shoes</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Bridal Accessories">Bridal Clutches</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.ring('#be123c')} WEDDING JEWELRY</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Jewelry">Earrings</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Jewelry">Necklaces</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Jewelry">Bracelets</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Jewelry">Rings</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Jewelry">Bridal Sets</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.heel('#be123c')} WEDDING SHOES</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Shoes">Bridal Heels</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Shoes">Bridal Flats</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Shoes">Sandals</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.bouquet('#be123c')} FLOWERS & ACCESSORIES</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Flowers & Accessories">Bridal Bouquets</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Flowers & Accessories">Flower Crowns</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Flowers & Accessories">Boutonnieres</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Flowers & Accessories">Corsages</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: #be123c; border-bottom-color: rgba(190, 18, 60, 0.3);">${svgIcons.gift('#be123c')} WEDDING ESSENTIALS</div>
                <ul>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Essentials">Ring Pillow</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Essentials">Guest Book</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Essentials">Cake Accessories</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Essentials">Gift Boxes</a></li>
                  <li><a href="category.html?brand=Wedding Collection&subcategory=Wedding Essentials">Wedding Favours</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- Trending Mega Menu -->
          <li class="nav-item">
            <a href="category.html?sort=newest" class="nav-link" style="color:var(--accent-pink); font-weight:700;">TRENDING</a>
            <div class="mega-menu trending-menu">
              <div class="mega-col mega-col-brand" style="border-right: 1px solid var(--border-color);">
                <div class="mega-brand-name" style="color: var(--accent-pink);">DISCOVER WHAT'S TRENDING</div>
                <p class="mega-brand-desc">The latest must-haves from all our brands, curated just for you.</p>
                <a href="category.html?sort=newest" class="btn-mega-action" style="background-color: var(--accent-pink); color: white;">SHOP TRENDING</a>
                <img src="assets/coco_candle.png" alt="Trending" class="mega-brand-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.star('var(--accent-pink)')} NEW ARRIVALS</div>
                <ul>
                  <li><a href="category.html?sort=newest">Shop New Arrivals</a></li>
                  <li><a href="all-collections.html">All Collections</a></li>
                </ul>
                <img src="assets/cat_beauty.png" class="mega-col-bottom-img" style="aspect-ratio:1/1;">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.trophy('var(--accent-pink)')} BEST SELLERS</div>
                <ul>
                  <li><a href="category.html?sort=rating">Top Rated Pieces</a></li>
                  <li><a href="category.html?search=Dress">Most Loved</a></li>
                </ul>
                <img src="assets/lace_wig.png" class="mega-col-bottom-img" style="aspect-ratio:1/1;">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.tiara('var(--accent-pink)')} LIMITED EDITION</div>
                <ul>
                  <li><a href="category.html?subcategory=Limited Edition">Exclusive collections</a></li>
                  <li><a href="category.html?sort=newest">Seasonal drops</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.gift('var(--accent-pink)')} GIFT IDEAS</div>
                <ul>
                  <li><a href="category.html?search=Glow">Gifts for Her</a></li>
                  <li><a href="category.html?subcategory=Baby Clothing">Baby Gifts</a></li>
                  <li><a href="category.html?subcategory=Wedding Essentials">Wedding Gifts</a></li>
                </ul>
                <img src="assets/cat_lifestyle.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.calendar('var(--accent-pink)')} SEASONAL</div>
                <ul>
                  <li><a href="category.html?search=Abaya">Ramadan</a></li>
                  <li><a href="category.html?search=Dress">Eid</a></li>
                  <li><a href="category.html?search=Linen">Summer</a></li>
                  <li><a href="category.html?search=Candle">Christmas</a></li>
                  <li><a href="category.html?search=Perfume">Valentine's Day</a></li>
                </ul>
                <img src="assets/cat_exclusive.png" class="mega-col-bottom-img">
              </div>
              <div class="mega-col">
                <div class="mega-col-title" style="color: var(--accent-pink); border-bottom-color: rgba(219, 39, 119, 0.3);">${svgIcons.tag('var(--accent-pink)')} SALE</div>
                <ul>
                  <li><a href="category.html?search=Sale">Promotions</a></li>
                  <li><a href="category.html?search=Sale">Clearance</a></li>
                  <li><a href="category.html?search=Sale">Bundle Offers</a></li>
                </ul>
                <img src="assets/exclusive_jacket.png" class="mega-col-bottom-img">
              </div>
            </div>
          </li>

          <!-- SALE Item (Matching Red Text in Photo 1 Reference) -->
          <li class="nav-item no-chevron">
            <a href="category.html?sale=true" class="nav-link" onclick="window.closeMobileDrawer()" style="color:#e11d48; font-weight:800;">${isFr ? 'SOLDES' : 'SALE'}</a>
          </li>
        </ul>

        <!-- Settings Group (Photo 1 reference: Shop In, Currency, Language) -->
        <div class="mobile-drawer-settings-group">
          <div class="mobile-drawer-setting-row" data-drawer-action="locale" role="button" tabindex="0" onclick="window.closeMobileDrawer(); window.openLocalizationModal();">
            <span class="mobile-drawer-setting-left">${isFr ? "Pays d'achat" : "Shop In"}</span>
            <span class="mobile-drawer-setting-right">
              ${countryLabel}
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>

          <div class="mobile-drawer-setting-row" data-drawer-action="locale" role="button" tabindex="0" onclick="window.closeMobileDrawer(); window.openLocalizationModal();">
            <span class="mobile-drawer-setting-left">${isFr ? "Devise" : "Currency"}</span>
            <span class="mobile-drawer-setting-right">
              ${currencyLabel}
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>

          <div class="mobile-drawer-setting-row" data-drawer-action="language" role="button" tabindex="0" onclick="window.toggleLanguage();">
            <span class="mobile-drawer-setting-left">${isFr ? "Langue" : "Language"}</span>
            <span class="mobile-drawer-setting-right">
              ${langLabel}
              <i class="fas fa-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Sticky / Fixed Bottom Icon Bar (Home, Support, Sign In — Favorite removed per Requirement 2) -->
      <div class="mobile-drawer-footer-bar">
        <!-- HOME -->
        <a href="index.html" class="drawer-icon-btn" data-drawer-action="home" onclick="window.closeMobileDrawer();">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="icon-label">${isFr ? "Accueil" : "Home"}</span>
        </a>

        <!-- SUPPORT -->
        <a href="javascript:void(0)" class="drawer-icon-btn" data-drawer-action="support" onclick="window.closeMobileDrawer(); window.openSupportModal(); return false;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
          <span class="icon-label">${isFr ? "Support" : "Support"}</span>
        </a>

        <!-- SIGN IN -->
        <a href="javascript:void(0)" class="drawer-icon-btn" data-drawer-action="signin" onclick="window.closeMobileDrawer(); window.handleAccountAction('signin'); return false;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="icon-label">${isFr ? "Connexion" : "Sign In"}</span>
        </a>
      </div>
    `;
  }

  // 4. Main Footer Inner Content (Updated per Requirements 7, 8, 9, 10, 11, 12, 13 & Imagen 1, 2, 3)
  const footerEl = document.querySelector(".main-footer");
  if (footerEl && typeof siteContent !== "undefined") {
    const fData = siteContent.footer;
    const isFrFooter = currentLocale.language === "fr";
    footerEl.innerHTML = `
      <!-- 1. ABOUT US Section (White Background & Grey Typography - Imagen 3 / Req 7) -->
      <div class="footer-hero-about">
        <div class="container">
          <h2>${isFrFooter ? "À PROPOS DE NOUS" : "ABOUT US"}</h2>
          <p>${trans.aboutDesc}</p>
        </div>
      </div>

      <!-- 2. SUBSCRIBE Section (White Background, Black Button ONLY, Policy Text Below - Imagen 2 & 3 / Req 9 & 13) -->
      <div class="footer-newsletter-section">
        <div class="container" style="max-width:600px; text-align:center;">
          <h2>${isFrFooter ? "Faisons connaissance" : "Let's get to know each other"}</h2>
          <p class="newsletter-subtitle">${isFrFooter ? "Inscrivez-vous pour recevoir nos e-mails et ne jamais manquer nos nouveautés et offres exclusives." : "Sign up to receive emails from us, so you never miss out on the good stuff."}</p>
          <form class="newsletter-form" onsubmit="handleNewsletterSubmit(event)">
            <input type="email" class="newsletter-input" required placeholder="${isFrFooter ? "Veuillez saisir votre adresse e-mail" : "Please enter your email address"}">
            <button type="submit" class="btn-subscribe">${isFrFooter ? "S'ABONNER" : "SUBSCRIBE"}</button>
          </form>
          <p class="subscribe-policy-text">
            ${isFrFooter
              ? 'En soumettant vos coordonnées, vous acceptez de recevoir des communications marketing de 13th Avenue et de notre <a href="all-collections.html">famille de marques</a> par e-mail. Vous pouvez vous désabonner à tout moment. Vous consentez également à l\'utilisation de vos données conformément à notre <a href="#" onclick="openInfoPolicyModal(\'privacy\'); return false;">Politique de Confidentialité.</a>'
              : 'By submitting your details, you agree to receive marketing communications from 13th Avenue &amp; our <a href="all-collections.html">family of brands</a> by email. You can unsubscribe at any point. You also consent to the use of your details in accordance with our <a href="#" onclick="openInfoPolicyModal(\'privacy\'); return false;">Privacy Policy.</a>'}
          </p>
        </div>
      </div>

      <!-- 3. Brand Family Presentation Strip (Imagen 2 / Req 2 & 5) -->
      <div class="footer-brands-strip">
        <a href="category.html?brand=Miss Chloé" class="footer-brand-logo-item">MISS CHLOÉ</a>
        <a href="category.html?brand=Nella Hair Couture" class="footer-brand-logo-item serif-italic">Nella Hair</a>
        <a href="category.html?brand=COCO Beauty" class="footer-brand-logo-item bold-condensed">COCO BEAUTY</a>
        <a href="category.html?brand=COCO Mini" class="footer-brand-logo-item">COCO<span>MINI</span></a>
        <a href="category.html?brand=Wedding Collection" class="footer-brand-logo-item serif-italic">Wedding</a>
      </div>

      <!-- 4. Payment Methodology Strip (Imagen 1 & 2 / Req 11 & 12 — Security Payment removed) -->
      <div class="footer-payments-strip">
        <div class="payment-methods-icons">
          <span class="payment-badge" style="color:#1a1f71; font-style:italic; font-weight:900; font-size:13px;">VISA</span>
          <span class="payment-badge" style="display:inline-flex; align-items:center; gap:2px;">
            <span style="width:12px; height:12px; border-radius:50%; background:#eb001b; display:inline-block;"></span>
            <span style="width:12px; height:12px; border-radius:50%; background:#f79e1b; margin-left:-5px; display:inline-block;"></span>
          </span>
          <span class="payment-badge" style="display:inline-flex; align-items:center; gap:2px;">
            <span style="width:12px; height:12px; border-radius:50%; background:#0099df; display:inline-block;"></span>
            <span style="width:12px; height:12px; border-radius:50%; background:#eb001b; margin-left:-5px; display:inline-block;"></span>
          </span>
          <span class="payment-badge" style="color:#1a1f71; font-weight:800; font-size:10px;">VISA <span style="font-weight:400;">Electron</span></span>
          <span class="payment-badge" style="color:#003087; font-style:italic; font-weight:800;">Pay<span style="color:#0079c1;">Pal</span></span>
          <span class="payment-badge" style="background:#016fd0; color:#ffffff; border-color:#016fd0; font-size:10px;">AMEX</span>
          <span class="payment-badge" style="color:#374151; font-weight:700;"><i class="fab fa-apple" style="font-size:13px;"></i> Pay</span>
          <span class="payment-badge" style="background:#f5e1ff; color:#4b5563; border-color:#e9d5ff; font-weight:800;">tamara</span>
          <span class="payment-badge" style="background:#d1fae5; color:#374151; border-color:#a7f3d0; font-weight:800;">tabby</span>
        </div>
      </div>

      <!-- 5. Hidden / Collapsible Information Accordions (Original Netlify Sections: SHOP, CUSTOMER CARE, COMPANY, CONTACT) -->
      <div class="footer-accordions-wrapper">
        <!-- Row 1: SHOP -->
        <div class="footer-accordion-item" id="footer-acc-shop">
          <button type="button" class="footer-accordion-header" onclick="toggleFooterAccordion('footer-acc-shop')">
            <span>${trans.shopColTitle}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="footer-accordion-content">
            <ul>
              <li><a href="category.html?brand=Miss Chloé">Miss Chloé</a></li>
              <li><a href="category.html?brand=Nella Hair Couture">Nella Hair Couture</a></li>
              <li><a href="category.html?brand=COCO Beauty">COCO Beauty</a></li>
              <li><a href="category.html?brand=COCO Mini">COCO Mini</a></li>
              <li><a href="category.html?brand=Wedding Collection">${trans.weddingCollection}</a></li>
              <li><a href="category.html?sort=newest">${trans.trending}</a></li>
            </ul>
          </div>
        </div>

        <!-- Row 2: CUSTOMER CARE -->
        <div class="footer-accordion-item" id="footer-acc-care">
          <button type="button" class="footer-accordion-header" onclick="toggleFooterAccordion('footer-acc-care')">
            <span>${trans.customerCareColTitle}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="footer-accordion-content">
            <ul>
              <li><a href="#" onclick="openSupportModal(); return false;">${trans.contactUs}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('faq'); return false;">${trans.faqs}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('delivery'); return false;">${trans.shippingDelivery}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('returns'); return false;">${trans.returnsExchanges}</a></li>
              <li><a href="#" onclick="handleAccountAction('orders'); return false;">${trans.trackOrder}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('size'); return false;">${trans.sizeGuide}</a></li>
            </ul>
          </div>
        </div>

        <!-- Row 3: COMPANY -->
        <div class="footer-accordion-item" id="footer-acc-company">
          <button type="button" class="footer-accordion-header" onclick="toggleFooterAccordion('footer-acc-company')">
            <span>${trans.companyColTitle}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="footer-accordion-content">
            <ul>
              <li><a href="#" onclick="openInfoPolicyModal('about'); return false;">${trans.aboutUs}</a></li>
              <li><a href="all-collections.html">${trans.ourBrands}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('privacy'); return false;">${trans.privacyPolicy}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('terms'); return false;">${trans.termsConditions}</a></li>
              <li><a href="#" onclick="openInfoPolicyModal('cookies'); return false;">${trans.cookiePolicy}</a></li>
            </ul>
          </div>
        </div>

        <!-- Row 4: CONTACT -->
        <div class="footer-accordion-item" id="footer-acc-contact">
          <button type="button" class="footer-accordion-header" onclick="toggleFooterAccordion('footer-acc-contact')">
            <span>${trans.contactColTitle}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div class="footer-accordion-content">
            <ul style="flex-direction: column; gap: 8px; color: #6b7280; font-size: 13px; line-height: 1.7;">
              <li style="color: #4b5563; font-weight: 700;"><i class="fas fa-map-marker-alt" style="width: 20px;"></i> ${fData.contactName}</li>
              <li style="padding-left: 20px; font-size: 12px; margin-top: -4px; margin-bottom: 4px;">${trans.contactSub}<br>${trans.contactAddress}</li>
              <li><a href="mailto:${fData.contactEmail}" style="text-decoration: none;"><i class="far fa-envelope" style="width: 20px;"></i> ${fData.contactEmail}</a></li>
              <li><i class="far fa-clock" style="width: 20px;"></i> ${trans.contactHours}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 6. Country Selector & Social Media Icons (Imagen 1 Bottom Reference / Req 1, 2, 13) -->
      <div class="footer-bottom-extras">
        <div class="footer-country-label">${isFrFooter ? "Pays" : "Country"}</div>
        <div class="footer-country-box" onclick="openLocalizationModal()">
          <span class="footer-country-box-left">
            <img src="https://flagcdn.com/w20/${currentLocale.country.toLowerCase()}.png"
                 onerror="this.style.display='none';"
                 style="width:20px; height:14px; border-radius:2px; object-fit:cover; border:1px solid #e5e7eb;">
            <span>13th Avenue ${currentLocale.countryName || 'Mena'}</span>
          </span>
          <span class="footer-country-box-right">
            <span>${currentLocale.country} ${currentLocale.currency}</span>
            <i class="fas fa-chevron-down" style="font-size:10px;"></i>
          </span>
        </div>

        <div class="footer-social-title">${isFrFooter ? "Suivez-nous sur les réseaux sociaux" : "Follow Us On Social Media"}</div>
        <div class="footer-social-minimal">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://youtube.com" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="https://tiktok.com" target="_blank" rel="noopener" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="https://x.com" target="_blank" rel="noopener" aria-label="X"><i class="fab fa-x-twitter"></i><span style="font-family:sans-serif; font-weight:800; font-size:16px; display:none;">X</span></a>
          <a href="https://wa.me/971501234567" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>

      <!-- 7. Subtle Copyright & Mandatory Signature (White Background, Grey Text) -->
      <div class="footer-copyright-bar">
        <div class="container">
          <p>${fData.copyright}</p>
          <p style="margin-top:4px; font-size:11px; color:#9ca3af;">Developed by Tecnoemprende</p>
        </div>
      </div>
    `;
  }

  // Bind Listeners
  bindHeaderFooterListeners();
  updateHeaderCountsGlobal();
  applyPageDOMTranslations();
}

// Toggle Collapsible Footer Accordion (Requirement 10 / Imagen 1 & 2)
window.toggleFooterAccordion = function(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const isNowActive = !item.classList.contains("active");
  item.classList.toggle("active", isNowActive);
  item.classList.toggle("open", isNowActive);
};

// Lightweight Info Policy Modal for Footer Links
window.openInfoPolicyModal = function(type) {
  const existing = document.getElementById("info-policy-modal");
  if (existing) existing.remove();
  const isFr = (currentLocale && currentLocale.language) === "fr";
  const titles = {
    about: isFr ? "À Propos de Nous" : "About Us",
    privacy: isFr ? "Politique de Confidentialité" : "Privacy Policy",
    terms: isFr ? "Conditions Générales" : "Terms & Conditions",
    cookies: isFr ? "Politique de Cookies" : "Cookie Policy",
    faq: isFr ? "Questions Fréquentes (FAQ)" : "Frequently Asked Questions",
    delivery: isFr ? "Livraison & Expédition" : "Shipping & Delivery",
    returns: isFr ? "Retours & Échanges" : "Returns & Exchanges",
    size: isFr ? "Guide des Tailles" : "Size Guide"
  };
  const bodies = {
    about: isFr
      ? "Chez 13TH AVENUE, nous réunissons mode, beauté, cheveux de luxe, enfants et mariage sous une seule destination de shopping d'exception à Dubaï, Émirats Arabes Unis."
      : "At 13TH AVENUE, we bring together fashion, beauty, luxury hair, kids and weddings under one premium shopping destination in Dubai, United Arab Emirates.",
    privacy: isFr
      ? "13th Avenue respecte votre vie privée. Vos informations personnelles sont utilisées uniquement pour traiter vos commandes et vous envoyer nos offres exclusives si vous y êtes abonné. Vous pouvez vous désabonner à tout moment."
      : "13th Avenue & our family of brands respect your privacy. Your personal details are securely processed in accordance with international data protection standards and used solely to fulfill your orders and deliver curated communications when subscribed.",
    terms: isFr
      ? "Toutes les commandes passées sur 13th Avenue sont soumises à disponibilité et vérification de paiement sécurisé."
      : "All orders placed on 13th Avenue are subject to availability and secure payment verification via our authorized gateways.",
    cookies: isFr
      ? "Nous utilisons des cookies essentiels pour mémoriser votre panier, votre devise et vos préférences linguistiques."
      : "We use essential cookies to keep your shopping bag, currency preferences, and language settings synchronized across sessions.",
    faq: isFr
      ? "Nos perruques Nella Hair sont 100% cheveux humains Remy. Nos créations Miss Chloé, COCO Beauty et COCO Mini sont expédiées sous 24 à 48 heures."
      : "Our Nella Hair wigs are crafted from 100% human Remy hair. All Miss Chloé, COCO Beauty, and COCO Mini orders are dispatched within 24–48 hours.",
    delivery: isFr
      ? "Livraison standard et express disponible aux Émirats Arabes Unis, en France et à l'international avec suivi en temps réel."
      : "Standard and Express delivery available across the UAE, MENA, Europe, and internationally with real-time order tracking.",
    returns: isFr
      ? "Les retours et échanges sont acceptés sous 14 jours pour les articles non portés dans leur emballage d'origine."
      : "Returns and exchanges are accepted within 14 days of delivery for unused items in their original packaging.",
    size: isFr
      ? "Nos coupes vont du XS au XL. Consultez les détails de chaque fiche produit pour les mesures exactes."
      : "Our apparel ranges from XS to XL. Please check each product detail page for exact garment measurements."
  };
  const overlay = document.createElement("div");
  overlay.id = "info-policy-modal";
  overlay.className = "modal-overlay active";
  overlay.innerHTML = `
    <div class="modal-content" style="max-width:480px; padding:28px 24px; background:#ffffff; color:#52525b; border-radius:8px; position:relative; text-align:left;">
      <button onclick="document.getElementById('info-policy-modal').remove()" style="position:absolute; top:14px; right:16px; background:none; border:none; font-size:18px; color:#71717a; cursor:pointer;">&times;</button>
      <h3 style="font-family:var(--font-serif); font-size:20px; color:#4b5563; margin-bottom:12px;">${titles[type] || "Information"}</h3>
      <p style="font-size:13px; color:#6b7280; line-height:1.7;">${bodies[type] || ""}</p>
    </div>
  `;
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
};

// Translate page DOM elements (Hero slides, Category banner, Mega menus, 4 Brand Architecture Cards, Section Titles)
function applyPageDOMTranslations() {
  const lang = (currentLocale && currentLocale.language) ? currentLocale.language : "fr";
  const isFr = lang === "fr";

  // 1. Homepage Hero Slides (Requirement 3: Only "30% OFF" centered + "Shop Now" button)
  document.querySelectorAll(".slide").forEach((slide) => {
    const title = slide.querySelector(".slide-title");
    const subtitle = slide.querySelector(".slide-subtitle");
    const btn = slide.querySelector(".btn-premium");
    const brandTag = slide.querySelector(".slide-brand");

    if (brandTag) brandTag.textContent = "";
    if (title) title.textContent = isFr ? "30% DE RÉDUCTION" : "30% OFF";
    if (subtitle) subtitle.textContent = "";
    if (btn) btn.textContent = isFr ? "ACHETER MAINTENANT" : "SHOP NOW";
  });

  // 2. Horizontal Categories Banner
  const catTitleEl = document.querySelector(".categories-banner-title");
  if (catTitleEl) {
    catTitleEl.textContent = isFr ? "ACHETER PAR CATÉGORIE" : "SHOP BY CATEGORY";
  }

  const catData = [
    { title: isFr ? "MODE" : "FASHION", desc: isFr ? "Pièces intemporelles pour chaque occasion" : "Timeless pieces for every occasion" },
    { title: isFr ? "CHEVEUX" : "HAIR", desc: isFr ? "Cheveux humains 100% Remy d'exception" : "100% Human Hair Luxury Collection" },
    { title: isFr ? "BEAUTÉ" : "BEAUTY", desc: isFr ? "Essentiels de beauté de luxe" : "Premium beauty essentials" },
    { title: isFr ? "ENFANTS" : "KIDS", desc: isFr ? "Styles adorables pour vos tout-petits" : "Adorable styles for little ones" },
    { title: isFr ? "MARIAGE" : "WEDDING", desc: isFr ? "Tout pour vos moments précieux" : "Everything for your special moments" }
  ];

  document.querySelectorAll(".category-banner-item").forEach((item, idx) => {
    if (catData[idx]) {
      const tEl = item.querySelector(".category-banner-title");
      const dEl = item.querySelector(".category-banner-desc");
      if (tEl) tEl.textContent = catData[idx].title;
      if (dEl) dEl.textContent = catData[idx].desc;
    }
  });

  // 3. Section Titles Across Pages
  document.querySelectorAll(".section-title").forEach(el => {
    const txt = el.textContent.trim().toUpperCase();
    if (txt.includes("BRAND ARCHITECTURE") || txt.includes("ARCHITECTURE DE MARQUE")) {
      el.textContent = isFr ? "ARCHITECTURE DE MARQUE" : "BRAND ARCHITECTURE";
    } else if (txt.includes("SHOP BY CATEGORY") || txt.includes("ACHETER PAR CATÉGORIE")) {
      el.textContent = isFr ? "ACHETER PAR CATÉGORIE" : "SHOP BY CATEGORY";
    } else if (txt.includes("SHOP BY BRAND") || txt.includes("ACHETER PAR MARQUE")) {
      el.textContent = isFr ? "ACHETER PAR MARQUE" : "SHOP BY BRAND";
    } else if (txt.includes("TRENDING NOW") || txt.includes("TENDANCES DU MOMENT")) {
      el.textContent = isFr ? "TENDANCES DU MOMENT" : "TRENDING NOW";
    }
  });

  document.querySelectorAll(".section-subtitle").forEach(el => {
    const txt = el.textContent.trim().toLowerCase();
    if (txt.includes("our curated collections") || txt.includes("nos collections sélectionnées")) {
      el.textContent = isFr ? "Nos collections sélectionnées" : "Our curated collections";
    }
  });

  // 4. Brand Architecture Showcase Cards (4 Brands)
  const brandCards = document.querySelectorAll(".brand-showcase-card");
  if (brandCards.length >= 4) {
    // Card 1: Miss Chloe
    const c1Desc = brandCards[0].querySelector(".brand-showcase-desc");
    const c1Btn = brandCards[0].querySelector(".btn-brand-explore");
    if (c1Desc) c1Desc.textContent = isFr ? "Mode intemporelle, vêtements élégants et confort d'exception." : "High fashion modest apparel tailoring elegance and comfort.";
    if (c1Btn) c1Btn.textContent = isFr ? "Découvrir Miss Chloé" : "Explore Miss Chloé";

    // Card 2: Nella Hair
    const c2Desc = brandCards[1].querySelector(".brand-showcase-desc");
    const c2Btn = brandCards[1].querySelector(".btn-brand-explore");
    if (c2Desc) c2Desc.textContent = isFr ? "Perruques HD Lace 100% cheveux humains, extensions et soins." : "Premium human hair lace frontals, extensions, and styling pieces.";
    if (c2Btn) c2Btn.textContent = isFr ? "Découvrir Nella Hair" : "Explore Nella Hair";

    // Card 3: COCO Beauty
    const c3Desc = brandCards[2].querySelector(".brand-showcase-desc");
    const c3Btn = brandCards[2].querySelector(".btn-brand-explore");
    if (c3Desc) c3Desc.textContent = isFr ? "Soins de la peau bio, cosmétiques de luxe, soins corps et parfums d'oud." : "Organic skincare, luxury cosmetics, body care, and oud perfumes.";
    if (c3Btn) c3Btn.textContent = isFr ? "Découvrir COCO Beauty" : "Explore COCO Beauty";

    // Card 4: COCO Mini
    const c4Desc = brandCards[3].querySelector(".brand-showcase-desc");
    const c4Btn = brandCards[3].querySelector(".btn-brand-explore");
    if (c4Desc) c4Desc.textContent = isFr ? "Barboteuses douces pour bébés, vêtements bio enfants et peluches." : "Soft baby rompers, organic kids clothing, plush toys, and blankets.";
    if (c4Btn) c4Btn.textContent = isFr ? "Découvrir COCO Mini" : "Explore COCO Mini";
  }

  // 5. Mega Menu Subcategories and Column Headers Translation Dictionary
  const termMap = {
    // Column Headers
    "SHOP BY APPAREL": isFr ? "VÊTEMENTS" : "SHOP BY APPAREL",
    "SHOES": isFr ? "CHAUSSURES" : "SHOES",
    "BAGS": isFr ? "SACS" : "BAGS",
    "JEWELRY": isFr ? "BIJOUX" : "JEWELRY",
    "ACCESSORIES": isFr ? "ACCESSOIRES" : "ACCESSORIES",
    "COLLECTIONS": isFr ? "COLLECTIONS" : "COLLECTIONS",
    "SHOP BY PRODUCT": isFr ? "PAR PRODUIT" : "SHOP BY PRODUCT",
    "SHOP BY STYLE": isFr ? "PAR STYLE" : "SHOP BY STYLE",
    "SHOP BY LACE": isFr ? "PAR DENTELLE (LACE)" : "SHOP BY LACE",
    "HAIR GUIDES": isFr ? "GUIDES CHEVEUX" : "HAIR GUIDES",
    "MAKEUP": isFr ? "MAQUILLAGE" : "MAKEUP",
    "NAILS": isFr ? "ONGLES" : "NAILS",
    "SKINCARE": isFr ? "SOINS DU VISAGE" : "SKINCARE",
    "FRAGRANCES": isFr ? "PARFUMS & OUD" : "FRAGRANCES",
    "BEAUTY TOOLS": isFr ? "OUTILS DE BEAUTÉ" : "BEAUTY TOOLS",
    "BATH & BODY": isFr ? "CORPS & BAIN" : "BATH & BODY",
    "TRENDING": isFr ? "TENDANCES" : "TRENDING",
    "BABY CLOTHING": isFr ? "BÉBÉ (0-24M)" : "BABY CLOTHING",
    "KIDS FASHION": isFr ? "ENFANTS (2-10 ANS)" : "KIDS FASHION",
    "TOYS": isFr ? "JOUETS & PELUCHES" : "TOYS",
    "BABY ESSENTIALS": isFr ? "ESSENTIELS BÉBÉ" : "BABY ESSENTIALS",
    "BRIDAL GOWNS": isFr ? "ROBES DE MARIÉE" : "BRIDAL GOWNS",
    "VEILS & TIARAS": isFr ? "VOILES & TIARES" : "VEILS & TIARAS",
    "BRIDESMAIDS & GUESTS": isFr ? "DEMOISELLES D'HONNEUR" : "BRIDESMAIDS & GUESTS",
    "BRIDAL ACCESSORIES": isFr ? "ACCESSOIRES MARIÉE" : "BRIDAL ACCESSORIES",

    // Links & Subcategories
    "Dresses": isFr ? "Robes" : "Dresses",
    "Abayas": isFr ? "Abayas" : "Abayas",
    "Sets": isFr ? "Ensembles" : "Sets",
    "Casual Wear": isFr ? "Tenues décontractées" : "Casual Wear",
    "Casual Wear & Coordinates": isFr ? "Tenues décontractées" : "Casual Wear & Coordinates",
    "Leather Bags": isFr ? "Sacs en cuir" : "Leather Bags",
    "Evening Wear": isFr ? "Tenues de soirée" : "Evening Wear",
    "Lace Front Wigs": isFr ? "Perruques HD Lace" : "Lace Front Wigs",
    "Human Extensions": isFr ? "Extensions naturelles" : "Human Extensions",
    "Luxury Accessories": isFr ? "Accessoires de luxe" : "Luxury Accessories",
    "Organic Skincare": isFr ? "Soins du visage bio" : "Organic Skincare",
    "Luxury Makeup": isFr ? "Maquillage de luxe" : "Luxury Makeup",
    "Body Care & Scrubs": isFr ? "Soins du corps & Gommages" : "Body Care & Scrubs",
    "Oud Perfumes": isFr ? "Parfums d'Oud" : "Oud Perfumes",
    "Baby Rompers (0-24M)": isFr ? "Barboteuses (0-24M)" : "Baby Rompers (0-24M)",
    "Girls & Boys Outfits": isFr ? "Tenues filles & garçons" : "Girls & Boys Outfits",
    "Swaddles & Blankets": isFr ? "Couvertures & Langes" : "Swaddles & Blankets",
    "Plush Toys & Gifts": isFr ? "Peluches & Cadeaux" : "Plush Toys & Gifts",
    "Heels": isFr ? "Talons" : "Heels",
    "Flats": isFr ? "Chaussures plates" : "Flats",
    "Sandals": isFr ? "Sandales" : "Sandals",
    "Boots": isFr ? "Bottes" : "Boots",
    "Sneakers": isFr ? "Baskets" : "Sneakers",
    "Handbags": isFr ? "Sacs à main" : "Handbags",
    "Clutches": isFr ? "Pochettes" : "Clutches",
    "Crossbody Bags": isFr ? "Sacs bandoulière" : "Crossbody Bags",
    "Tote Bags": isFr ? "Sacs cabas" : "Tote Bags",
    "Shoulder Bags": isFr ? "Sacs d'épaule" : "Shoulder Bags",
    "Earrings": isFr ? "Boucles d'oreilles" : "Earrings",
    "Necklaces": isFr ? "Colliers" : "Necklaces",
    "Bracelets": isFr ? "Bracelets" : "Bracelets",
    "Rings": isFr ? "Bagues" : "Rings",
    "Anklets": isFr ? "Bracelets de cheville" : "Anklets",
    "Jewelry Sets": isFr ? "Parures de bijoux" : "Jewelry Sets",
    "Sunglasses": isFr ? "Lunettes de soleil" : "Sunglasses",
    "Belts": isFr ? "Ceintures" : "Belts",
    "Scarves": isFr ? "Foulards & Écharpes" : "Scarves",
    "Hats": isFr ? "Chapeaux & Casquettes" : "Hats",
    "Hair Accessories": isFr ? "Accessoires cheveux" : "Hair Accessories",
    "Wigs": isFr ? "Perruques" : "Wigs",
    "Extensions": isFr ? "Extensions" : "Extensions",
    "Hair Care": isFr ? "Soins capillaires" : "Hair Care",
    "Hair Tools": isFr ? "Outils de coiffage" : "Hair Tools",
    "Straight": isFr ? "Lisse" : "Straight",
    "Body Wave": isFr ? "Ondulé" : "Body Wave",
    "Curly": isFr ? "Bouclé" : "Curly",
    "Water Wave": isFr ? "Ondulation eau" : "Water Wave",
    "Bob": isFr ? "Carré (Bob)" : "Bob",
    "HD Lace": isFr ? "HD Lace" : "HD Lace",
    "Transparent Lace": isFr ? "Dentelle transparente" : "Transparent Lace",
    "Glueless": isFr ? "Sans colle" : "Glueless",
    "Closure": isFr ? "Closure" : "Closure",
    "Frontal": isFr ? "Frontale" : "Frontal",
    "Lace Guide": isFr ? "Guide Lace" : "Lace Guide",
    "Density Guide": isFr ? "Guide Densité" : "Density Guide",
    "Installation Guide": isFr ? "Guide Pose" : "Installation Guide",
    "FAQ": isFr ? "FAQ" : "FAQ",
    "Face": isFr ? "Visage" : "Face",
    "Eyes": isFr ? "Yeux" : "Eyes",
    "Lips": isFr ? "Lèvres" : "Lips",
    "Brows": isFr ? "Sourcils" : "Brows",
    "Makeup Accessories": isFr ? "Accessoires maquillage" : "Makeup Accessories",
    "Nail Polish": isFr ? "Vernis à ongles" : "Nail Polish",
    "Gel Polish": isFr ? "Vernis gel" : "Gel Polish",
    "Nail Care": isFr ? "Soins des ongles" : "Nail Care",
    "Nail Tools": isFr ? "Outils manucure" : "Nail Tools",
    "Press-On Nails": isFr ? "Faux ongles" : "Press-On Nails",
    "Nail Accessories": isFr ? "Accessoires ongles" : "Nail Accessories",
    "Cleansers": isFr ? "Nettoyants" : "Cleansers",
    "Toners": isFr ? "Lotions & Toniques" : "Toners",
    "Serums": isFr ? "Sérums & Huiles" : "Serums",
    "Moisturizers": isFr ? "Crèmes hydratantes" : "Moisturizers",
    "Masks": isFr ? "Masques visage" : "Masks",
    "Sunscreen": isFr ? "Protection solaire" : "Sunscreen",
    "Eye Care": isFr ? "Soins des yeux" : "Eye Care",
    "Perfumes": isFr ? "Parfums" : "Perfumes",
    "Body Mist": isFr ? "Brumes corporelles" : "Body Mist",
    "Perfume Oils": isFr ? "Huiles d'oud" : "Perfume Oils",
    "Gift Sets": isFr ? "Coffrets cadeaux" : "Gift Sets",
    "Facial Devices": isFr ? "Appareils visage" : "Facial Devices",
    "Beauty Gadgets": isFr ? "Accessoires beauté" : "Beauty Gadgets",
    "Makeup Brushes": isFr ? "Pinceaux maquillage" : "Makeup Brushes",
    "Beauty Sponges": isFr ? "Éponges beauté" : "Beauty Sponges",
    "Beauty Mirrors": isFr ? "Miroirs de beauté" : "Beauty Mirrors",
    "Cosmetic Bags": isFr ? "Trousses de toilette" : "Cosmetic Bags",
    "Makeup Organizers": isFr ? "Rangements maquillage" : "Makeup Organizers",
    "Body Lotion": isFr ? "Lait corps" : "Body Lotion",
    "Body Butter": isFr ? "Beurre corporel" : "Body Butter",
    "Body Scrub": isFr ? "Gommage corps" : "Body Scrub",
    "Shower Gel": isFr ? "Gel douche" : "Shower Gel",
    "Hand Care": isFr ? "Soins des mains" : "Hand Care",
    "Foot Care": isFr ? "Soins des pieds" : "Foot Care",
    "Soaps": isFr ? "Savons" : "Soaps",
    "Newborn": isFr ? "Nouveau-né" : "Newborn",
    "Baby Girl": isFr ? "Fille bébé" : "Baby Girl",
    "Baby Boy": isFr ? "Garçon bébé" : "Baby Boy",
    "Girls": isFr ? "Filles" : "Girls",
    "Boys": isFr ? "Garçons" : "Boys",
    "Educational Toys": isFr ? "Jouets éducatifs" : "Educational Toys",
    "Plush Toys": isFr ? "Peluches" : "Plush Toys",
    "Outdoor Toys": isFr ? "Jouets d'extérieur" : "Outdoor Toys",
    "Swaddles & Blankets": isFr ? "Couvertures & Langes" : "Swaddles & Blankets",
    "Bibs & Accessories": isFr ? "Bavoirs & Accessoires" : "Bibs & Accessories",
    "Nursery Decor": isFr ? "Décoration chambre" : "Nursery Decor",
    "Wedding Dresses": isFr ? "Robes de mariée" : "Wedding Dresses",
    "Reception Dresses": isFr ? "Robes de réception" : "Reception Dresses",
    "Lace Veils": isFr ? "Voiles en dentelle" : "Lace Veils",
    "Tiaras & Hair Combs": isFr ? "Tiares & Peignes" : "Tiaras & Hair Combs",
    "Bridesmaid Dresses": isFr ? "Robes demoiselles d'honneur" : "Bridesmaid Dresses",
    "Wedding Guest Dresses": isFr ? "Robes d'invitées" : "Wedding Guest Dresses",
    "Bridal Jewelry": isFr ? "Bijoux de mariée" : "Bridal Jewelry",
    "Bridal Shoes": isFr ? "Chaussures de mariée" : "Bridal Shoes",
    "Bridal Clutches": isFr ? "Pochettes de mariage" : "Bridal Clutches",

    // Descriptions & CTA Buttons
    "Timeless fashion, refined accessories and statement pieces for the modern woman.": isFr ? "Mode intemporelle, vêtements élégants et accessoires d'exception." : "Timeless fashion, refined accessories and statement pieces for the modern woman.",
    "SHOP MISS CHLOÉ": isFr ? "ACHETER MISS CHLOÉ" : "SHOP MISS CHLOÉ",
    "100% HUMAN LACE WIGS": isFr ? "PERRUQUES HD LACE 100% CHEVEUX HUMAINS" : "100% HUMAN LACE WIGS",
    "Uncompromising luxury wigs, HD lace frontals, and clip-in extensions crafted from 100% human Remy hair.": isFr ? "Perruques d'exception, frontales HD lace et extensions à clips en cheveux humains." : "Uncompromising luxury wigs, HD lace frontals, and clip-in extensions crafted from 100% human Remy hair.",
    "SHOP NELLA HAIR": isFr ? "ACHETER NELLA HAIR" : "SHOP NELLA HAIR",
    "Premium beauty & self-care essentials for your best self, every day.": isFr ? "Essentiels de beauté bio, cosmétiques de luxe et parfums d'oud." : "Premium beauty & self-care essentials for your best self, every day.",
    "SHOP COCO BEAUTY": isFr ? "ACHETER COCO BEAUTY" : "SHOP COCO BEAUTY",
    "Everything your little ones need, all in one beautiful place.": isFr ? "Tout ce dont vos tout-petits ont besoin, réuni dans un endroit magnifique." : "Everything your little ones need, all in one beautiful place.",
    "SHOP COCO MINI": isFr ? "ACHETER COCO MINI" : "SHOP COCO MINI",
    "Breathtaking bridal gowns, lace veils, sparkling jewelry and wedding guest attire.": isFr ? "Robes de mariée somptueuses, voiles en dentelle et bijoux étincelants." : "Breathtaking bridal gowns, lace veils, sparkling jewelry and wedding guest attire.",
    "SHOP WEDDING": isFr ? "COLLECTION MARIAGE" : "SHOP WEDDING"
  };

  // Translate mega menu titles & links
  document.querySelectorAll(".mega-col-title").forEach(colTitle => {
    const textNode = Array.from(colTitle.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) {
      const rawText = textNode.nodeValue.trim();
      if (!colTitle.dataset.rawTerm) colTitle.dataset.rawTerm = rawText;
      const key = colTitle.dataset.rawTerm;
      if (termMap[key]) {
        textNode.nodeValue = " " + termMap[key];
      }
    }
  });

  document.querySelectorAll(".mega-menu ul li a, .brand-links-list li a").forEach(link => {
    const rawText = link.textContent.trim();
    if (!link.dataset.rawTerm) link.dataset.rawTerm = rawText;
    const key = link.dataset.rawTerm;
    if (termMap[key]) {
      link.textContent = termMap[key];
    }
  });

  document.querySelectorAll(".mega-brand-desc").forEach(p => {
    const rawText = p.textContent.trim();
    if (!p.dataset.rawTerm) p.dataset.rawTerm = rawText;
    const key = p.dataset.rawTerm;
    if (termMap[key]) {
      p.textContent = termMap[key];
    }
  });

  document.querySelectorAll(".btn-mega-action").forEach(btn => {
    const rawText = btn.textContent.trim();
    if (!btn.dataset.rawTerm) btn.dataset.rawTerm = rawText;
    const key = btn.dataset.rawTerm;
    if (termMap[key]) {
      btn.textContent = termMap[key];
    }
  });
}

// Get search query from URL parameter
function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || "";
}

// Bind interactive event listeners for modals, dropdowns, and drawers
function bindHeaderFooterListeners() {
  // Mobile Hamburger Toggle
  const menuBtn = document.getElementById("menu-toggle-btn");
  const mainNav = document.getElementById("main-nav");
  if (menuBtn && mainNav) {
    // Clean old listeners
    menuBtn.replaceWith(menuBtn.cloneNode(true));
    const newMenuBtn = document.getElementById("menu-toggle-btn");

    // Remove any legacy body-level .menu-backdrop that caused stacking-context dimming
    document.querySelectorAll("body > .menu-backdrop").forEach(el => el.remove());

    // Ensure mobile backdrop overlay lives inside .main-header right before #main-nav
    const headerParent = mainNav.parentNode || document.body;
    let backdrop = headerParent.querySelector(".menu-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "menu-backdrop";
      headerParent.insertBefore(backdrop, mainNav);
    }

    const closeMenu = () => {
      mainNav.classList.remove("active");
      newMenuBtn.classList.remove("active");
      backdrop.classList.remove("active");
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
      const icon = newMenuBtn.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    };

    window.closeMobileDrawer = closeMenu;

    newMenuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mainNav.classList.contains("active");
      const icon = newMenuBtn.querySelector("i");
      
      if (isOpen) {
        closeMenu();
      } else {
        mainNav.classList.add("active");
        newMenuBtn.classList.add("active");
        backdrop.classList.add("active");
        document.body.classList.add("menu-open");
        document.body.style.overflow = "hidden";
        if (icon) icon.className = "fas fa-times";
      }
    });

    backdrop.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    };

    const drawerCloseBtn = document.getElementById("mobile-drawer-close-btn") || mainNav.querySelector(".mobile-drawer-close-btn");
    if (drawerCloseBtn) {
      drawerCloseBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      };
    }

    // Bind all subcategory / CTA links inside .mega-menu so tapping them on mobile closes the drawer & navigates
    mainNav.querySelectorAll(".mega-menu a").forEach(subLink => {
      subLink.addEventListener("click", () => {
        if (window.innerWidth <= 1024) {
          closeMenu();
        }
      });
    });

    // Bind Settings Rows (Shop In, Currency, Language) programmatically in addition to inline onclick
    mainNav.querySelectorAll(".mobile-drawer-setting-row").forEach(row => {
      row.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = row.getAttribute("data-drawer-action");
        if (action === "language") {
          window.toggleLanguage();
        } else {
          closeMenu();
          window.openLocalizationModal();
        }
      };
    });

    // Bind Sticky Bottom Bar Buttons (Home, Support, Sign In) programmatically
    mainNav.querySelectorAll(".drawer-icon-btn").forEach(btn => {
      btn.onclick = (e) => {
        const action = btn.getAttribute("data-drawer-action");
        if (action === "support") {
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
          window.openSupportModal();
        } else if (action === "signin") {
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
          window.handleAccountAction("signin");
        } else {
          closeMenu();
        }
      };
    });
  }

  // Desktop Mega Menu Hover & Mobile Nav Collapsible Accordions
  document.querySelectorAll(".nav-item").forEach(item => {
    const link = item.querySelector(".nav-link");
    const mega = item.querySelector(".mega-menu");
    if (!link) return;

    // Direct navigation items without a mega-menu (e.g., HOME, SALE)
    if (!mega) {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1024 && typeof window.closeMobileDrawer === "function") {
          window.closeMobileDrawer();
        }
      });
      return;
    }

    let hoverTimer = null;

    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 1024) {
        if (hoverTimer) clearTimeout(hoverTimer);
        document.querySelectorAll(".nav-item.mega-hover").forEach(other => {
          if (other !== item) other.classList.remove("mega-hover");
        });
        item.classList.add("mega-hover");
      }
    });

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 1024) {
        hoverTimer = setTimeout(() => {
          item.classList.remove("mega-hover");
        }, 90);
      }
    });

    // Mobile Drawer Accordion Toggle (<= 1024px)
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        e.stopPropagation();
        const isAlreadyOpen = item.classList.contains("mobile-open");
        document.querySelectorAll(".nav-item").forEach(o => o.classList.remove("mobile-open"));
        if (!isAlreadyOpen) {
          item.classList.add("mobile-open");
        }
      }
    });
  });

  // Cart Drawer Toggle Button (Re-bound whenever Header re-renders)
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.toggleCartDrawer === "function") {
        window.toggleCartDrawer(true);
      } else {
        const drawer = document.getElementById("cart-drawer");
        const backdrop = document.getElementById("cart-drawer-backdrop");
        if (drawer) drawer.classList.add("active");
        if (backdrop) backdrop.classList.add("active");
      }
    });
  }

  // Account Popover Dropdown Toggle
  const accountBtn = document.getElementById("account-dropdown-trigger");
  const popover = document.getElementById("account-popover-box");
  if (accountBtn && popover) {
    accountBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popover.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!popover.contains(e.target) && e.target !== accountBtn) {
        popover.classList.remove("active");
      }
    });
  }

  // Search Submit Listener (Enter key & Search Icon Button)
  const searchInput = document.getElementById("search-input");
  const searchSubmitBtn = document.getElementById("search-submit-btn");
  const executeSearch = () => {
    if (!searchInput) return;
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `category.html?search=${encodeURIComponent(query)}`;
    }
  };
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        executeSearch();
      }
    });
  }
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      executeSearch();
    });
  }

  // Localization Modal Trigger & Injection
  const localeBtn = document.getElementById("locale-modal-trigger");
  if (localeBtn) {
    localeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openLocalizationModal();
    });
  }

  // Recently Viewed Trigger
  const recentBtn = document.getElementById("recently-viewed-trigger");
  if (recentBtn) {
    recentBtn.addEventListener("click", () => {
      openRecentlyViewedDrawer();
    });
  }

  // Mobile Drawer Utilities Event Bindings
  const mobileRecentBtn = document.getElementById("mobile-recently-viewed-trigger");
  if (mobileRecentBtn) {
    mobileRecentBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.closeMobileDrawer();
      openRecentlyViewedDrawer();
    });
  }

  const mobileLocaleBtn = document.getElementById("mobile-locale-trigger");
  if (mobileLocaleBtn) {
    mobileLocaleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.closeMobileDrawer();
      openLocalizationModal();
    });
  }
}

// Open Localization Selection Modal (Mockup 11)
function openLocalizationModal() {
  // Remove existing modal if any
  const existing = document.getElementById("locale-modal-overlay");
  if (existing) existing.remove();

  const trans = t[currentLocale.language] || t.en;

  const overlay = document.createElement("div");
  overlay.id = "locale-modal-overlay";
  overlay.className = "modal-overlay active";
  
  overlay.innerHTML = `
    <div class="modal-container locale-modal-box">
      <div class="modal-header">
        <span class="modal-title" style="font-weight:700; letter-spacing:0.05em;">${trans.regionsTitle}</span>
        <button class="modal-close" onclick="closeLocaleModal()"><i class="fas fa-times"></i></button>
      </div>
      <div class="modal-body" style="padding:20px 24px;">
        
        <!-- Select Language -->
        <div class="locale-section">
          <label class="locale-label">${trans.selectLang}</label>
          <div class="lang-options-grid" style="display:flex; gap:12px; margin-top:8px; margin-bottom:24px;">
            <button class="btn-lang ${currentLocale.language === "en" ? "active" : ""}" onclick="selectLocaleLang('en')" style="flex:1; padding:12px; font-size:13px; font-weight:700; border:1px solid var(--border-color); background:none; text-align:center;">English</button>
            <button class="btn-lang ${currentLocale.language === "fr" ? "active" : ""}" onclick="selectLocaleLang('fr')" style="flex:1; padding:12px; font-size:13px; font-weight:700; border:1px solid var(--border-color); background:none; text-align:center;">Français</button>
          </div>
        </div>

        <!-- Select Region/Currency -->
        <div class="locale-section">
          <label class="locale-label">${trans.selectRegion}</label>
          
          <div class="search-region-container" style="position:relative; margin-top:8px; margin-bottom:12px;">
            <i class="fas fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-muted); font-size:12px;"></i>
            <input type="text" id="region-search-input" onkeyup="filterLocaleCountries()" placeholder="${trans.searchPlaceholderModal}" style="width:100%; border:1px solid var(--border-color); padding:10px 14px 10px 36px; font-size:13px;">
          </div>

          <div class="countries-list-container" id="countries-list-container" style="max-height:220px; overflow-y:auto; border:1px solid var(--border-color); border-radius:var(--rounded-sm);">
            <!-- Populated dynamically -->
          </div>
        </div>

        <button class="btn-premium btn-locale-apply" onclick="applyLocaleSelection()" style="width:100%; margin-top:24px; text-align:center;">${trans.applyBtn}</button>

      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  renderCountriesList();
}

function closeLocaleModal() {
  const overlay = document.getElementById("locale-modal-overlay");
  if (overlay) overlay.remove();
}

window.openLocalizationModal = openLocalizationModal;
window.closeLocaleModal = closeLocaleModal;

// Global Language Toggle Handler (EN / FR)
window.toggleLanguage = function() {
  const currentLang = (currentLocale && currentLocale.language) ? currentLocale.language : "fr";
  const newLang = currentLang === "fr" ? "en" : "fr";
  currentLocale.language = newLang;
  localStorage.setItem("user_locale", JSON.stringify(currentLocale));
  window.location.reload();
};

// Temporary values used in the open modal
let tempLocale = { ...currentLocale };

window.selectLocaleLang = function(langCode) {
  tempLocale.language = langCode;
  // Toggle active class on language buttons
  document.querySelectorAll(".btn-lang").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase().includes(langCode === "en" ? "english" : "français")) {
      btn.classList.add("active");
    }
  });
};

window.selectLocaleCountry = function(code) {
  const matched = countriesList.find(c => c.code === code);
  if (matched) {
    tempLocale.country = matched.code;
    tempLocale.countryName = matched.name;
    tempLocale.flag = matched.flag;
    tempLocale.currency = matched.currency;
    
    // Auto-update rate
    tempLocale.rate = exchangeRates[matched.currency] || 1.0;
    
    // Highlight selected item
    document.querySelectorAll(".country-list-row").forEach(row => {
      row.classList.remove("selected");
      const check = row.querySelector(".checkmark-circle");
      if (check) check.style.display = "none";
    });
    
    const selectedRow = document.getElementById(`country-row-${code}`);
    if (selectedRow) {
      selectedRow.classList.add("selected");
      const check = selectedRow.querySelector(".checkmark-circle");
      if (check) check.style.display = "flex";
    }
  }
};

window.filterLocaleCountries = function() {
  const query = document.getElementById("region-search-input").value.toLowerCase();
  renderCountriesList(query);
};

function renderCountriesList(filterQuery = "") {
  const container = document.getElementById("countries-list-container");
  if (!container) return;

  const trans = t[tempLocale.language];

  container.innerHTML = countriesList
    .filter(c => c.name.toLowerCase().includes(filterQuery) || c.currency.toLowerCase().includes(filterQuery))
    .map(c => {
      const isSelected = tempLocale.country === c.code;
      const currencySymbol = currencySymbols[c.currency];
      return `
        <div class="country-list-row ${isSelected ? "selected" : ""}" id="country-row-${c.code}" onclick="selectLocaleCountry('${c.code}')" style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid var(--border-color); cursor:pointer; font-size:13px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <img src="https://flagcdn.com/w32/${c.code.toLowerCase()}.png" 
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" 
                 style="width: 24px; height: 16px; border-radius: 2px; border: 1px solid var(--border-color); vertical-align: middle; object-fit: cover; display: inline-block;">
            <span class="flag-fallback" style="display: none; font-size: 10px; font-weight: 700; background: #e2e8f0; color: #475569; padding: 2px 5px; border-radius: 3px; vertical-align: middle; text-transform: uppercase;">${c.code}</span>
            <span>${c.name} ${c.recommended ? `<span style="font-size:10px; color:var(--text-muted); font-style:italic;">(${trans.recommended})</span>` : ""}</span>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-weight:700; color:var(--text-muted); font-size:12px;">${currencySymbol}</span>
            <div class="checkmark-circle" style="width:16px; height:16px; border-radius:50%; background-color:black; color:white; display:${isSelected ? "flex" : "none"}; align-items:center; justify-content:center; font-size:8px;">
              <i class="fas fa-check"></i>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

window.applyLocaleSelection = function() {
  currentLocale = { ...tempLocale };
  localStorage.setItem("user_locale", JSON.stringify(currentLocale));
  closeLocaleModal();
  // Reload page to recalculate all products prices and render translations
  window.location.reload();
};

window.handleAccountAction = function(action) {
  const user = localStorage.getItem("user_logged_in") || (localStorage.getItem("admin_logged_in") === "true" ? "admin" : null);

  // If already logged in, clicking signin or create can act as logout/switch
  if (user && (action === "signin" || action === "create")) {
    if (confirm(`You are currently logged in as ${user}. Do you want to logout?`)) {
      localStorage.removeItem("user_logged_in");
      localStorage.removeItem("admin_logged_in");
      localStorage.removeItem("avenue13_wishlist");
      alert("Logged out successfully.");
      window.location.reload();
    }
    return;
  }

  // If clicking other account actions when not logged in, redirect to login
  if (!user && action !== "signin" && action !== "create") {
    alert("Please Sign In first to access this section.");
    openAuthModal("signin");
    return;
  }

  // If already logged in and clicking details/orders
  if (user) {
    if (user === "admin") {
      window.location.href = "admin.html";
    } else {
      alert(`Accessing ${action}... (Simulated for user ${user})`);
    }
    return;
  }

  // Otherwise, open auth modal
  openAuthModal(action === "create" ? "register" : "signin");
};

function openAuthModal(defaultTab = "signin") {
  const existing = document.getElementById("auth-modal-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "auth-modal-overlay";
  overlay.className = "modal-overlay active";
  
  overlay.innerHTML = `
    <style>
      .auth-modal-box {
        max-width: 420px;
        width: 90%;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 8px;
        overflow: hidden;
      }
      .auth-tabs {
        display: flex;
        border-bottom: 1px solid var(--border-color);
        background-color: var(--bg-color-alt);
      }
      .auth-tab-btn {
        flex: 1;
        padding: 14px;
        font-weight: 700;
        font-size: 13px;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-muted);
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        transition: var(--transition-fast);
      }
      .auth-tab-btn.active {
        color: var(--text-color);
        background-color: var(--bg-color);
        border-bottom: 2px solid var(--accent-pink);
      }
      .auth-form {
        padding: 24px;
        display: none;
      }
      .auth-form.active {
        display: block;
      }
      .auth-field {
        margin-bottom: 18px;
      }
      .auth-field label {
        display: block;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 6px;
        color: var(--text-muted);
        letter-spacing: 0.05em;
      }
      .auth-field input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--border-color);
        background-color: var(--bg-color);
        color: var(--text-color);
        font-size: 13px;
        border-radius: 4px;
        transition: var(--transition-fast);
      }
      .auth-field input:focus {
        border-color: var(--accent-pink);
        outline: none;
      }
      .auth-submit-btn {
        width: 100%;
        background-color: var(--accent-pink);
        color: white;
        border: none;
        padding: 12px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.05em;
        cursor: pointer;
        border-radius: 4px;
        transition: var(--transition-fast);
      }
      .auth-submit-btn:hover {
        background-color: #d946ef;
        transform: translateY(-1px);
      }
    </style>
    <div class="modal-container auth-modal-box">
      <div class="modal-header" style="border-bottom:none; padding: 16px 20px 8px 20px;">
        <span class="modal-title" style="font-weight:700; letter-spacing:0.05em; color:var(--text-color);">13th Avenue Portal</span>
        <button class="modal-close" onclick="closeAuthModal()"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="auth-tabs">
        <button class="auth-tab-btn \${defaultTab === 'signin' ? 'active' : ''}" onclick="switchAuthTab('signin')" id="tab-btn-signin">Sign In</button>
        <button class="auth-tab-btn \${defaultTab === 'register' ? 'active' : ''}" onclick="switchAuthTab('register')" id="tab-btn-register">Register</button>
      </div>
      
      <!-- SIGN IN FORM -->
      <div class="auth-form \${defaultTab === 'signin' ? 'active' : ''}" id="form-signin">
        <div class="auth-field">
          <label>Username or Email</label>
          <input type="text" id="signin-user" placeholder="Enter username (admin for admin dashboard)">
        </div>
        <div class="auth-field">
          <label>Password</label>
          <input type="password" id="signin-pass" placeholder="Enter password (avenue13 for admin)">
        </div>
        <button class="auth-submit-btn" onclick="submitSignIn()">Sign In</button>
      </div>
      
      <!-- REGISTER FORM -->
      <div class="auth-form \${defaultTab === 'register' ? 'active' : ''}" id="form-register">
        <div class="auth-field">
          <label>Choose Username</label>
          <input type="text" id="reg-user" placeholder="e.g. fashionlover">
        </div>
        <div class="auth-field">
          <label>Email Address</label>
          <input type="email" id="reg-email" placeholder="e.g. user@example.com">
        </div>
        <div class="auth-field">
          <label>Create Password</label>
          <input type="password" id="reg-pass" placeholder="At least 6 characters">
        </div>
        <div class="auth-field">
          <label>Confirm Password</label>
          <input type="password" id="reg-confirm" placeholder="Repeat password">
        </div>
        <button class="auth-submit-btn" onclick="submitRegister()">Register Account</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

window.closeAuthModal = function() {
  const overlay = document.getElementById("auth-modal-overlay");
  if (overlay) overlay.remove();
};

window.switchAuthTab = function(tab) {
  document.getElementById("tab-btn-signin").classList.toggle("active", tab === "signin");
  document.getElementById("tab-btn-register").classList.toggle("active", tab === "register");
  
  document.getElementById("form-signin").classList.toggle("active", tab === "signin");
  document.getElementById("form-register").classList.toggle("active", tab === "register");
};

window.submitSignIn = function() {
  const user = document.getElementById("signin-user").value.trim();
  const pass = document.getElementById("signin-pass").value;
  
  if (!user || !pass) {
    alert("Please fill in all fields.");
    return;
  }
  
  if (user === "admin") {
    if (pass === "avenue13") {
      localStorage.setItem("admin_logged_in", "true");
      localStorage.setItem("avenue13_live_edit_mode", "true");
      closeAuthModal();
      if (window.showMomentosToast) {
        window.showMomentosToast("👑 Modo Administrador y Edición en Vivo Activado");
      }
      setTimeout(() => window.location.reload(), 250);
    } else {
      alert("Invalid admin password.");
    }
    return;
  }
  
  // Normal customer check
  let usersList = JSON.parse(localStorage.getItem("avenue13_registered_users")) || [];
  const registeredUser = usersList.find(u => u.username === user || u.email === user);
  
  if (registeredUser) {
    if (registeredUser.password === pass) {
      localStorage.setItem("user_logged_in", registeredUser.username);
      localStorage.setItem("avenue13_wishlist", JSON.stringify(registeredUser.wishlist || []));
      
      registeredUser.lastLogin = new Date().toISOString().slice(0, 16).replace("T", " ");
      localStorage.setItem("avenue13_registered_users", JSON.stringify(usersList));
      
      alert(`Welcome back, ${registeredUser.username}!`);
      closeAuthModal();
      window.location.reload();
    } else {
      alert("Invalid password.");
    }
  } else {
    alert("User account not found. Try registering a new account!");
  }
};

window.submitRegister = function() {
  const user = document.getElementById("reg-user").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const confirmPass = document.getElementById("reg-confirm").value;
  
  if (!user || !email || !pass || !confirmPass) {
    alert("Please fill in all fields.");
    return;
  }
  
  if (user === "admin") {
    alert("Username 'admin' is reserved.");
    return;
  }
  
  if (pass !== confirmPass) {
    alert("Passwords do not match.");
    return;
  }
  
  if (pass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }
  
  let usersList = JSON.parse(localStorage.getItem("avenue13_registered_users")) || [];
  if (usersList.some(u => u.username === user)) {
    alert("Username is already taken.");
    return;
  }
  if (usersList.some(u => u.email === email)) {
    alert("Email address is already registered.");
    return;
  }
  
  const newUser = {
    username: user,
    email: email,
    password: pass,
    role: "Customer",
    lastLogin: new Date().toISOString().slice(0, 16).replace("T", " "),
    wishlist: JSON.parse(localStorage.getItem("avenue13_wishlist")) || []
  };
  
  usersList.push(newUser);
  localStorage.setItem("avenue13_registered_users", JSON.stringify(usersList));
  localStorage.setItem("user_logged_in", user);
  
  alert(`Account successfully created! Welcome, ${user}!`);
  closeAuthModal();
  window.location.reload();
};

// --- Recently Viewed Products Logic ---
function trackProductVisit(productId) {
  let viewed = JSON.parse(localStorage.getItem("recently_viewed_ids")) || [];
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);
  if (viewed.length > 6) viewed.pop();
  localStorage.setItem("recently_viewed_ids", JSON.stringify(viewed));
}

function openRecentlyViewedDrawer() {
  const existing = document.getElementById("recent-drawer-overlay");
  if (existing) existing.remove();

  const trans = t[currentLocale.language];
  const viewedIds = JSON.parse(localStorage.getItem("recently_viewed_ids")) || [];
  
  const viewedProducts = viewedIds
    .map(id => typeof products !== "undefined" ? products.find(p => String(p.id) === String(id)) : null)
    .filter(p => p !== null && p !== undefined);

  const overlay = document.createElement("div");
  overlay.id = "recent-drawer-overlay";
  overlay.className = "cart-drawer-backdrop active";
  
  const drawer = document.createElement("div");
  drawer.className = "cart-drawer active";
  drawer.id = "recent-drawer";
  drawer.style.padding = "0";
  drawer.style.display = "flex";
  drawer.style.flexDirection = "column";

  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <span class="cart-drawer-title"><i class="far fa-clock"></i> ${trans.recentlyViewedDrawerTitle}</span>
      <button class="cart-drawer-close" onclick="closeRecentlyViewedDrawer()"><i class="fas fa-times"></i></button>
    </div>
    <div class="cart-drawer-body" style="flex:1; overflow-y:auto; padding:20px;">
      ${viewedProducts.length === 0 ? `
        <p style="color:var(--text-muted); text-align:center; margin-top:40px; font-size:13px;">${trans.noRecentlyViewed}</p>
      ` : viewedProducts.map(p => `
        <div class="cart-item" style="display:flex; gap:16px; margin-bottom:20px; border-bottom:1px solid var(--border-color); padding-bottom:16px; cursor:pointer;" onclick="window.location.href='product.html?id=${p.id}'">
          <img src="${p.image}" alt="${p.name}" style="width:70px; aspect-ratio:3/4; object-fit:cover; border-radius:var(--rounded-sm);">
          <div style="flex:1;">
            <div style="font-size:10px; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); font-weight:700; margin-bottom:2px;">${p.brand}</div>
            <div style="font-size:12px; font-weight:700; line-height:1.3; color:var(--text-main); margin-bottom:6px;">${p.name}</div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:13px; font-weight:900;">${formatPrice(p.price)}</span>
              ${p.originalPrice > p.price ? `<span style="font-size:11px; text-decoration:line-through; color:var(--text-muted);">${formatPrice(p.originalPrice)}</span>` : ""}
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;

  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeRecentlyViewedDrawer();
  });
}

window.closeRecentlyViewedDrawer = function() {
  const overlay = document.getElementById("recent-drawer-overlay");
  if (overlay) overlay.remove();
};

function updateHeaderCountsGlobal() {
  const cart = JSON.parse(localStorage.getItem("avenue13_cart") || localStorage.getItem("cart") || "[]");
  const wishlist = JSON.parse(localStorage.getItem("avenue13_wishlist") || localStorage.getItem("wishlist") || "[]");

  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartBadge.textContent = totalQty;
    cartBadge.style.display = totalQty > 0 ? "flex" : "none";
  }

  const wishlistBadge = document.getElementById("wishlist-badge");
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
}

window.formatPrice = formatPrice;
window.trackProductVisit = trackProductVisit;
window.updateHeaderCountsGlobal = updateHeaderCountsGlobal;

// ============================================================================
// REAL-TIME STORE ANALYTICS & CLEAN BASELINE (Starts from 0 now)
// ============================================================================
function ensureCleanRealStatsBaselineGlobal() {
  if (localStorage.getItem("avenue13_stats_cleaned_v1") !== "true") {
    localStorage.removeItem("avenue13_orders");
    localStorage.removeItem("avenue13_registered_users");
    localStorage.removeItem("avenue13_analytics");
    localStorage.removeItem("admin_new_order_placed");
    localStorage.setItem("avenue13_stats_cleaned_v1", "true");
  } else {
    let uList = JSON.parse(localStorage.getItem("avenue13_registered_users") || "[]");
    if (uList.some(u => u.username === "client_test")) {
      uList = uList.filter(u => u.username !== "client_test");
      localStorage.setItem("avenue13_registered_users", JSON.stringify(uList));
    }
  }
}

function trackRealSiteVisit() {
  ensureCleanRealStatsBaselineGlobal();
  const today = new Date().toISOString().slice(0, 10);
  let analytics = {
    totalVisitors: 0,
    pageViews: 0,
    dailyVisits: {},
    startedAt: today
  };
  try {
    const saved = localStorage.getItem("avenue13_analytics");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        analytics = {
          totalVisitors: Number(parsed.totalVisitors || 0),
          pageViews: Number(parsed.pageViews || 0),
          dailyVisits: parsed.dailyVisits || {},
          startedAt: parsed.startedAt || today
        };
      }
    }
  } catch (e) {}

  analytics.pageViews += 1;
  if (!sessionStorage.getItem("avenue13_visit_counted")) {
    analytics.totalVisitors += 1;
    analytics.dailyVisits[today] = Number(analytics.dailyVisits[today] || 0) + 1;
    sessionStorage.setItem("avenue13_visit_counted", "true");
  }

  localStorage.setItem("avenue13_analytics", JSON.stringify(analytics));

  if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
    try {
      const q = window.supabaseClient
        .from("site_settings")
        .upsert([{ key: "real_analytics", value: analytics }]);
      if (q && typeof q.then === "function") {
        q.then(() => {}, () => {});
      }
    } catch (e) {}
  }
}

// ============================================================================
// HTML5 CANVAS IMAGE COMPRESSION ENGINE (Rule 6.2 - Mobile & Desktop Ready)
// ============================================================================
window.compressImageWithCanvas = function(file, maxDimension = 1200, quality = 0.86) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error("No file provided"));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

// ============================================================================
// MOMENTOS SPA IDENTICAL IN-PAGE LIVE EDITOR SYSTEM
// ============================================================================
function getSavedCustomTexts() {
  try {
    return JSON.parse(localStorage.getItem("avenue13_custom_texts") || "{}");
  } catch (e) {
    return {};
  }
}

function getSavedCustomImages() {
  try {
    return JSON.parse(localStorage.getItem("avenue13_custom_images") || "{}");
  } catch (e) {
    return {};
  }
}

async function syncCustomOverridesToSupabase() {
  if (typeof window.supabaseClient === "undefined" || !window.supabaseClient) return;
  try {
    const customTexts = getSavedCustomTexts();
    const customImages = getSavedCustomImages();
    await window.supabaseClient.from("site_settings").upsert([
      { key: "custom_texts", value: customTexts },
      { key: "custom_images", value: customImages }
    ]);
  } catch (e) {
    console.warn("Supabase custom overrides sync warning:", e);
  }
}

window.showMomentosToast = function(msg) {
  const existing = document.getElementById("momentos-live-toast");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.id = "momentos-live-toast";
  toast.className = "momentos-live-toast";
  toast.innerHTML = `<i class="fas fa-check-circle" style="font-size:15px;"></i> <span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.remove();
  }, 3400);
};

// Assign deterministic data-edit-key & data-img-key to all page elements and apply saved overrides
window.bindMomentosLiveEditorElements = function() {
  const customTexts = getSavedCustomTexts();
  const customImages = getSavedCustomImages();

  // 1. Deterministic Text Selectors Map
  const textBindings = [
    { selector: ".brand-logo span", prefix: "header_logo_sub", label: "Subtítulo del Logo" },
    { selector: ".hero-slider .slide .slide-title", prefix: "hero_slide_title", label: "Título Principal del Banner" },
    { selector: ".hero-slider .slide .btn-premium", prefix: "hero_slide_btn", label: "Botón del Banner" },
    { selector: ".section-header .section-title", prefix: "section_title", label: "Título de Sección" },
    { selector: ".section-header .section-subtitle", prefix: "section_subtitle", label: "Subtítulo de Sección" },
    { selector: ".brand-showcase-card .brand-card-emblem", prefix: "brand_emblem", label: "Emblema de Marca" },
    { selector: ".brand-showcase-card .brand-card-logo", prefix: "brand_logo_title", label: "Nombre de Marca" },
    { selector: ".brand-showcase-card .brand-showcase-desc", prefix: "brand_desc", label: "Descripción de Marca", multiline: true },
    { selector: ".brand-showcase-card .brand-links-list li a", prefix: "brand_link", label: "Enlace de Categoría de Marca" },
    { selector: ".brand-showcase-card .btn-brand-explore", prefix: "brand_explore_btn", label: "Botón Explorar Marca" },
    { selector: ".footer-hero-about h2", prefix: "footer_about_title", label: "Título About Us" },
    { selector: ".footer-hero-about .about-subtitle", prefix: "footer_about_sub", label: "Subtítulo About Us" },
    { selector: ".footer-hero-about p:not(.about-subtitle)", prefix: "footer_about_text", label: "Párrafo About Us", multiline: true },
    { selector: ".footer-newsletter-section h2", prefix: "footer_news_title", label: "Título Suscripción" },
    { selector: ".footer-newsletter-section .newsletter-subtitle", prefix: "footer_news_sub", label: "Subtítulo Suscripción", multiline: true },
    { selector: ".footer-newsletter-section .btn-subscribe", prefix: "footer_news_btn", label: "Botón Subscribe" },
    { selector: ".footer-newsletter-section .subscribe-policy-text", prefix: "footer_news_policy", label: "Texto Políticas Subscribe", multiline: true },
    { selector: ".footer-accordion-header span", prefix: "footer_acc_title", label: "Título Acordeón Footer" },
    { selector: ".footer-acc-info-block h5", prefix: "footer_info_h5", label: "Subtítulo Bloque Info" },
    { selector: ".footer-acc-info-block p", prefix: "footer_info_p", label: "Texto Bloque Info", multiline: true },
    { selector: "#category-display-title", prefix: "cat_page_title", label: "Título de Categoría" }
  ];

  textBindings.forEach(group => {
    document.querySelectorAll(group.selector).forEach((el, idx) => {
      const key = `${group.prefix}_${idx}`;
      if (!el.dataset.editKey) {
        el.dataset.editKey = key;
        el.dataset.editLabel = `${group.label} #${idx + 1}`;
        el.dataset.editMultiline = group.multiline ? "true" : "false";
        el.dataset.defaultText = el.textContent.trim();
        if (el.tagName === "A") {
          el.dataset.defaultHref = el.getAttribute("href") || "";
        }
      }
      // Apply saved text override if present
      if (customTexts[key] !== undefined && customTexts[key] !== null) {
        if (typeof customTexts[key] === "object") {
          if (customTexts[key].text !== undefined) el.textContent = customTexts[key].text;
          if (customTexts[key].href && el.tagName === "A") el.setAttribute("href", customTexts[key].href);
        } else {
          el.textContent = customTexts[key];
        }
      }
    });
  });

  // 2. Deterministic Image & Background Selectors Map
  // 2a. Hero Banner Slides
  document.querySelectorAll(".hero-slider .slide").forEach((slideEl, idx) => {
    const imgKey = `hero_slide_img_${idx}`;
    const imgEl = slideEl.querySelector(".slide-img");
    if (imgEl && !imgEl.dataset.imgKey) {
      imgEl.dataset.imgKey = imgKey;
      imgEl.dataset.defaultSrc = imgEl.getAttribute("src") || "";
    }
    if (customImages[imgKey] && imgEl) {
      imgEl.src = customImages[imgKey];
    }

    // Inject floating "Cambiar Foto Banner" button for Admin in Edit Mode
    if (!slideEl.querySelector(".momentos-img-edit-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "momentos-img-edit-btn momentos-slide-img-btn";
      btn.innerHTML = `<i class="fas fa-camera"></i> <span>Cambiar Imagen Banner #${idx + 1}</span>`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.openMomentosImageChanger(imgKey, `Banner Principal #${idx + 1}`, imgEl ? imgEl.src : "", (newUrl) => {
          if (imgEl) imgEl.src = newUrl;
        }, imgEl ? imgEl.dataset.defaultSrc : "");
      });
      slideEl.appendChild(btn);
    }
  });

  // 2b. Brand Architecture Cards (4 Background Cards)
  document.querySelectorAll(".brand-showcase-card").forEach((cardEl, idx) => {
    const imgKey = `brand_card_bg_${idx}`;
    const bgImgEl = cardEl.querySelector(".brand-card-bg-img");
    if (!cardEl.dataset.imgKey) {
      cardEl.dataset.imgKey = imgKey;
      cardEl.dataset.defaultSrc = bgImgEl ? bgImgEl.getAttribute("src") : "";
    }
    if (customImages[imgKey]) {
      if (bgImgEl) bgImgEl.src = customImages[imgKey];
      cardEl.style.backgroundImage = `url('${customImages[imgKey]}')`;
    }

    if (!cardEl.querySelector(".momentos-img-edit-btn")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "momentos-img-edit-btn momentos-brand-img-btn";
      btn.innerHTML = `<i class="fas fa-camera"></i> <span>Cambiar Fondo</span>`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const currentSrc = bgImgEl ? bgImgEl.src : "";
        window.openMomentosImageChanger(imgKey, `Fondo Tarjeta de Marca #${idx + 1}`, currentSrc, (newUrl) => {
          if (bgImgEl) bgImgEl.src = newUrl;
          cardEl.style.backgroundImage = `url('${newUrl}')`;
        }, cardEl.dataset.defaultSrc || "");
      });
      cardEl.appendChild(btn);
    }
  });

  // Update count badge on toolbar if present
  updateMomentosToolbarBadge();
};

function updateMomentosToolbarBadge() {
  const badge = document.getElementById("momentos-overrides-count");
  if (!badge) return;
  const count = Object.keys(getSavedCustomTexts()).length + Object.keys(getSavedCustomImages()).length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

// Open Inline Text Editor Modal (Identical UX to EditableText.jsx in Momentos Spa)
window.openMomentosInlineTextEditor = function(targetEl) {
  const existing = document.getElementById("momentos-inline-editor-overlay");
  if (existing) existing.remove();

  const key = targetEl.dataset.editKey;
  const label = targetEl.dataset.editLabel || "Texto de la página";
  const isMultiline = targetEl.dataset.editMultiline === "true";
  const defaultText = targetEl.dataset.defaultText || "";
  const currentText = targetEl.textContent.trim();
  const isLink = targetEl.tagName === "A";
  const currentHref = isLink ? (targetEl.getAttribute("href") || "") : "";
  const customTexts = getSavedCustomTexts();
  const hasOverride = customTexts[key] !== undefined;

  const overlay = document.createElement("div");
  overlay.id = "momentos-inline-editor-overlay";
  overlay.className = "momentos-inline-overlay";

  overlay.innerHTML = `
    <div class="momentos-inline-card">
      <div class="momentos-inline-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="momentos-inline-badge">✏️ Editando: ${label}</span>
          ${hasOverride ? `<span class="momentos-inline-custom-tag">Personalizado</span>` : ""}
        </div>
        <button type="button" class="momentos-inline-close" id="momentos-txt-cancel-top"><i class="fas fa-times"></i></button>
      </div>

      <div class="momentos-inline-body">
        <label class="momentos-field-label">Contenido del Texto</label>
        ${isMultiline ? `
          <textarea id="momentos-txt-input" rows="4" class="momentos-field-input">${currentText}</textarea>
        ` : `
          <input type="text" id="momentos-txt-input" class="momentos-field-input" value="${currentText.replace(/"/g, '&quot;')}">
        `}

        ${isLink ? `
          <label class="momentos-field-label" style="margin-top:12px;">Enlace de Destino (URL / Categoría)</label>
          <input type="text" id="momentos-href-input" class="momentos-field-input" value="${currentHref.replace(/"/g, '&quot;')}" placeholder="Ej. category.html?brand=Miss Chloé">
        ` : ""}
      </div>

      <div class="momentos-inline-footer">
        <div style="display:flex; gap:8px;">
          <button type="button" class="momentos-btn-save" id="momentos-txt-save">
            <i class="fas fa-check"></i> Listo y Guardar
          </button>
          <button type="button" class="momentos-btn-cancel" id="momentos-txt-cancel">
            Cancelar
          </button>
        </div>
        ${hasOverride ? `
          <button type="button" class="momentos-btn-reset" id="momentos-txt-reset" title="Restaurar al texto original por defecto">
            <i class="fas fa-rotate-left"></i> Original
          </button>
        ` : ""}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const inputEl = document.getElementById("momentos-txt-input");
  if (inputEl) {
    inputEl.focus();
    if (inputEl.select && !isMultiline) inputEl.select();
  }

  const saveHandler = async () => {
    const newVal = inputEl ? inputEl.value.trim() : currentText;
    const hrefInput = document.getElementById("momentos-href-input");
    const newHref = hrefInput ? hrefInput.value.trim() : currentHref;

    targetEl.textContent = newVal;
    if (isLink && newHref) {
      targetEl.setAttribute("href", newHref);
    }

    const allTexts = getSavedCustomTexts();
    if (isLink) {
      allTexts[key] = { text: newVal, href: newHref };
    } else {
      allTexts[key] = newVal;
    }
    localStorage.setItem("avenue13_custom_texts", JSON.stringify(allTexts));
    updateMomentosToolbarBadge();
    overlay.remove();
    window.showMomentosToast("✅ Texto actualizado y guardado en vivo");
    await syncCustomOverridesToSupabase();
  };

  document.getElementById("momentos-txt-save").addEventListener("click", saveHandler);
  document.getElementById("momentos-txt-cancel").addEventListener("click", () => overlay.remove());
  document.getElementById("momentos-txt-cancel-top").addEventListener("click", () => overlay.remove());

  if (inputEl && !isMultiline) {
    inputEl.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        saveHandler();
      } else if (ev.key === "Escape") {
        overlay.remove();
      }
    });
  }

  const resetBtn = document.getElementById("momentos-txt-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      targetEl.textContent = defaultText;
      if (isLink && targetEl.dataset.defaultHref) {
        targetEl.setAttribute("href", targetEl.dataset.defaultHref);
      }
      const allTexts = getSavedCustomTexts();
      delete allTexts[key];
      localStorage.setItem("avenue13_custom_texts", JSON.stringify(allTexts));
      updateMomentosToolbarBadge();
      overlay.remove();
      window.showMomentosToast("↺ Texto restaurado al original");
      await syncCustomOverridesToSupabase();
    });
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
};

// Open Inline Image Changer Modal (Hero Banners, Brand Architecture Backgrounds, etc.)
window.openMomentosImageChanger = function(imgKey, label, currentSrc, onApplyCallback, defaultSrc = "") {
  const existing = document.getElementById("momentos-inline-editor-overlay");
  if (existing) existing.remove();

  const customImages = getSavedCustomImages();
  const hasOverride = customImages[imgKey] !== undefined;

  const overlay = document.createElement("div");
  overlay.id = "momentos-inline-editor-overlay";
  overlay.className = "momentos-inline-overlay";

  overlay.innerHTML = `
    <div class="momentos-inline-card" style="max-width:460px;">
      <div class="momentos-inline-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="momentos-inline-badge">📷 Cambiar Imagen: ${label}</span>
          ${hasOverride ? `<span class="momentos-inline-custom-tag">Personalizada</span>` : ""}
        </div>
        <button type="button" class="momentos-inline-close" id="momentos-img-cancel-top"><i class="fas fa-times"></i></button>
      </div>

      <div class="momentos-inline-body">
        <div style="display:flex; gap:14px; align-items:center; margin-bottom:14px;">
          <img id="momentos-img-preview" src="${currentSrc}" style="width:90px; height:90px; object-fit:cover; border-radius:10px; border:1px solid #e2e8f0; background:#f8fafc;">
          <div style="flex:1;">
            <input type="file" id="momentos-img-file" accept="image/*" style="display:none;">
            <button type="button" class="momentos-btn-upload" onclick="document.getElementById('momentos-img-file').click()">
              <i class="fas fa-cloud-arrow-up"></i> Subir Foto desde Celular / PC
            </button>
            <div style="font-size:11px; color:#64748b; margin-top:6px; line-height:1.3;">
              Compresión automática HD (Canvas Engine) para carga instantánea.
            </div>
          </div>
        </div>

        <label class="momentos-field-label">O pega la ruta / URL de la imagen</label>
        <input type="text" id="momentos-img-url-input" class="momentos-field-input" value="${currentSrc.startsWith('data:') ? '' : currentSrc}" placeholder="Ej. assets/hero_fashion.png o https://...">
      </div>

      <div class="momentos-inline-footer">
        <div style="display:flex; gap:8px;">
          <button type="button" class="momentos-btn-save" id="momentos-img-save">
            <i class="fas fa-check"></i> Aplicar Imagen
          </button>
          <button type="button" class="momentos-btn-cancel" id="momentos-img-cancel">
            Cancelar
          </button>
        </div>
        ${hasOverride && defaultSrc ? `
          <button type="button" class="momentos-btn-reset" id="momentos-img-reset">
            <i class="fas fa-rotate-left"></i> Original
          </button>
        ` : ""}
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  let pendingDataUrl = currentSrc;
  const fileInput = document.getElementById("momentos-img-file");
  const previewEl = document.getElementById("momentos-img-preview");
  const urlInput = document.getElementById("momentos-img-url-input");

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const compressed = await window.compressImageWithCanvas(file, 1400, 0.88);
      pendingDataUrl = compressed;
      previewEl.src = compressed;
      urlInput.value = "(Imagen subida desde tu dispositivo)";
    } catch (err) {
      console.error("Image compression error:", err);
    }
  });

  urlInput.addEventListener("input", () => {
    const val = urlInput.value.trim();
    if (val && !val.startsWith("(Imagen")) {
      pendingDataUrl = val;
      previewEl.src = val;
    }
  });

  document.getElementById("momentos-img-save").addEventListener("click", async () => {
    if (!pendingDataUrl) return;
    onApplyCallback(pendingDataUrl);
    const allImages = getSavedCustomImages();
    allImages[imgKey] = pendingDataUrl;
    localStorage.setItem("avenue13_custom_images", JSON.stringify(allImages));
    updateMomentosToolbarBadge();
    overlay.remove();
    window.showMomentosToast("📷 Imagen actualizada en vivo en la página y Supabase");
    await syncCustomOverridesToSupabase();
  });

  const resetBtn = document.getElementById("momentos-img-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      onApplyCallback(defaultSrc);
      const allImages = getSavedCustomImages();
      delete allImages[imgKey];
      localStorage.setItem("avenue13_custom_images", JSON.stringify(allImages));
      updateMomentosToolbarBadge();
      overlay.remove();
      window.showMomentosToast("↺ Imagen restaurada a la original");
      await syncCustomOverridesToSupabase();
    });
  }

  document.getElementById("momentos-img-cancel").addEventListener("click", () => overlay.remove());
  document.getElementById("momentos-img-cancel-top").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
};

// Quick 1-click Product Photo Changer directly on product card
window.openQuickProductPhotoChanger = function(productId) {
  const prod = products.find(p => String(p.id) === String(productId));
  if (!prod) return;

  window.openMomentosImageChanger(`product_img_${prod.id}`, prod.name, prod.image, async (newUrl) => {
    prod.image = newUrl;
    localStorage.setItem("avenue13_products_draft", JSON.stringify(products));
    document.querySelectorAll(`img[data-product-img-id="${prod.id}"]`).forEach(img => {
      img.src = newUrl;
    });
    if (window.supabaseClient) {
      try {
        await window.supabaseClient.from("products").upsert([{
          id: String(prod.id),
          name: prod.name,
          brand: prod.brand,
          price: Number(prod.price),
          original_price: prod.originalPrice || prod.price,
          category: prod.category,
          subcategory: prod.subcategory,
          image: prod.image,
          description: prod.description,
          sizes: prod.sizes || ["One Size"],
          colors: prod.colors || [],
          in_stock: prod.inStock !== false,
          rating: Number(prod.rating || 5.0)
        }]);
      } catch (e) {
        console.warn("Supabase quick product image update warning:", e);
      }
    }
  });
};

// Toggle Live Edit Mode ON / OFF (Momentos Spa Style)
window.toggleMomentosEditMode = function(forceState) {
  const isAdmin = localStorage.getItem("admin_logged_in") === "true";
  if (!isAdmin) return;

  const current = localStorage.getItem("avenue13_live_edit_mode") !== "false";
  const next = typeof forceState === "boolean" ? forceState : !current;
  localStorage.setItem("avenue13_live_edit_mode", next ? "true" : "false");

  document.body.classList.toggle("momentos-edit-mode", next);
  renderMomentosFloatingToolbar();
  renderAllDynamicComponents();
  window.bindMomentosLiveEditorElements();

  if (next) {
    window.showMomentosToast("✏️ Modo Editor Activo: Toca cualquier texto o imagen para editarlo");
  } else {
    window.showMomentosToast("👁️ Vista Previa Normal Activa");
  }
};

// Render the Momentos Spa Floating Bottom-Left Live Editor Toolbar
function renderMomentosFloatingToolbar() {
  const existing = document.getElementById("momentos-live-toolbar");
  if (existing) existing.remove();

  const isAdmin = localStorage.getItem("admin_logged_in") === "true";
  if (!isAdmin) return;

  const isEditingMode = localStorage.getItem("avenue13_live_edit_mode") !== "false";
  document.body.classList.toggle("momentos-edit-mode", isEditingMode);

  const count = Object.keys(getSavedCustomTexts()).length + Object.keys(getSavedCustomImages()).length;

  const toolbar = document.createElement("div");
  toolbar.id = "momentos-live-toolbar";
  toolbar.className = "momentos-live-toolbar";

  toolbar.innerHTML = `
    <button type="button" class="momentos-main-toggle-pill ${isEditingMode ? 'active' : ''}" onclick="window.toggleMomentosEditMode()" title="${isEditingMode ? 'Desactivar Modo Edición Visual' : 'Activar Modo Edición Visual Directa'}">
      <span class="momentos-pill-icon"><i class="fas fa-pencil-alt"></i></span>
      <span>${isEditingMode ? 'Modo Editor Activo' : 'Editar Página en Vivo'}</span>
      <span id="momentos-overrides-count" class="momentos-pill-badge" style="display:${count > 0 ? 'inline-flex' : 'none'};">${count}</span>
    </button>

    ${isEditingMode ? `
      <div class="momentos-secondary-bar">
        <div class="momentos-hint-pill">
          <span class="momentos-pulse-dot"></span>
          <span>Toca cualquier texto o imagen con borde naranja para editarlo</span>
        </div>

        <button type="button" class="momentos-action-pill add-prod" onclick="window.openInPageProductModal(null)" title="Crear nuevo producto en la tienda">
          <i class="fas fa-plus"></i>
          <span>Nuevo Producto</span>
        </button>

        <button type="button" class="momentos-action-pill stats-btn" onclick="window.openMomentosAdminModal('stats')" title="Ver Estadísticas Reales, Pedidos y Catálogo">
          <i class="fas fa-chart-pie"></i>
          <span>Panel y Estadísticas</span>
        </button>

        <button type="button" class="momentos-action-pill save-btn" onclick="window.saveAllMomentosChangesLive()" title="Guardar todos los cambios en Supabase">
          <i class="fas fa-check"></i>
          <span>Guardar</span>
        </button>

        <button type="button" class="momentos-action-pill exit-btn" onclick="window.toggleMomentosEditMode(false)" title="Ocultar bordes de edición">
          <i class="fas fa-times"></i>
          <span>Vista Normal</span>
        </button>

        <button type="button" class="momentos-action-pill logout-btn" onclick="window.logoutAdminInPage()" title="Cerrar sesión de Administrador">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    ` : `
      <div class="momentos-secondary-bar">
        <button type="button" class="momentos-action-pill stats-btn" onclick="window.openMomentosAdminModal('stats')">
          <i class="fas fa-chart-pie"></i>
          <span>Panel Admin</span>
        </button>
        <button type="button" class="momentos-action-pill logout-btn" onclick="window.logoutAdminInPage()" title="Cerrar sesión de Administrador">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    `}
  `;

  document.body.appendChild(toolbar);
}

window.saveAllMomentosChangesLive = async function() {
  await syncCustomOverridesToSupabase();
  if (typeof window.supabaseClient !== "undefined" && window.supabaseClient && Array.isArray(window.products)) {
    try {
      const formatted = window.products.map(p => ({
        id: String(p.id),
        name: p.name,
        brand: p.brand,
        price: Number(p.price),
        original_price: p.originalPrice || null,
        category: p.category,
        subcategory: p.subcategory,
        image: p.image,
        description: p.description,
        sizes: p.sizes || ["One Size"],
        colors: p.colors || [],
        in_stock: p.inStock !== false,
        rating: Number(p.rating || 5.0)
      }));
      await window.supabaseClient.from("products").upsert(formatted);
    } catch (e) {
      console.warn("Supabase products bulk save warning:", e);
    }
  }
  window.showMomentosToast("✨ ¡Todos los textos, imágenes y productos han sido guardados con éxito!");
};

// Global Click Interceptor when Momentos Edit Mode is Active
let momentosClickListenerAttached = false;
function attachMomentosGlobalClickListener() {
  if (momentosClickListenerAttached) return;
  momentosClickListenerAttached = true;

  document.addEventListener("click", (e) => {
    const isAdmin = localStorage.getItem("admin_logged_in") === "true";
    const isEditMode = localStorage.getItem("avenue13_live_edit_mode") !== "false";
    if (!isAdmin || !isEditMode) return;

    // Ignore clicks inside editor modals, toolbars, navigation drawers, or admin buttons
    if (
      e.target.closest("#main-nav") ||
      e.target.closest("#menu-toggle-btn") ||
      e.target.closest(".menu-backdrop") ||
      e.target.closest(".mobile-quick-cats-bar") ||
      e.target.closest("#locale-modal-overlay") ||
      e.target.closest("#support-modal-overlay") ||
      e.target.closest("#auth-modal-overlay") ||
      e.target.closest("#momentos-live-toolbar") ||
      e.target.closest("#momentos-inline-editor-overlay") ||
      e.target.closest("#admin-inpage-modal-overlay") ||
      e.target.closest("#momentos-admin-dashboard-overlay") ||
      e.target.closest(".admin-card-controls") ||
      e.target.closest(".momentos-img-edit-btn") ||
      e.target.closest(".momentos-header-admin-pill") ||
      e.target.closest("#account-dropdown-trigger") ||
      e.target.closest("#account-popover-box") ||
      e.target.closest(".slider-controls") ||
      e.target.closest(".trending-nav-btn")
    ) {
      return;
    }

    const editableEl = e.target.closest("[data-edit-key]");
    if (editableEl) {
      e.preventDefault();
      e.stopPropagation();
      window.openMomentosInlineTextEditor(editableEl);
    }
  }, true);
}

// ============================================================================
// IN-PAGE FULL ADMIN DASHBOARD & REAL STATISTICS MODAL (Momentos Spa Style)
// ============================================================================
window.openMomentosAdminModal = function(initialTab = "stats") {
  const existing = document.getElementById("momentos-admin-dashboard-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "momentos-admin-dashboard-overlay";
  overlay.className = "momentos-inline-overlay";

  overlay.innerHTML = `
    <div class="momentos-dashboard-modal">
      <div class="momentos-dashboard-header">
        <div>
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; letter-spacing:0.12em; color:#d97706;">13TH AVENUE • LIVE ADMIN SUITE</div>
          <h3 style="margin:2px 0 0 0; font-family:var(--font-serif); font-size:20px; color:#0f172a;">Panel de Control y Estadísticas Reales</h3>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <a href="admin.html" class="momentos-btn-cancel" style="text-decoration:none; font-size:11px; display:inline-flex; align-items:center; gap:6px;">
            <i class="fas fa-up-right-from-square"></i> Vista Completa
          </a>
          <button type="button" class="momentos-inline-close" onclick="document.getElementById('momentos-admin-dashboard-overlay').remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="momentos-dashboard-tabs">
        <button type="button" class="momentos-dash-tab" data-tab="stats" onclick="window.switchMomentosDashTab('stats')">
          <i class="fas fa-chart-line"></i> Estadísticas Reales y Pedidos
        </button>
        <button type="button" class="momentos-dash-tab" data-tab="catalog" onclick="window.switchMomentosDashTab('catalog')">
          <i class="fas fa-bag-shopping"></i> Catálogo (${typeof products !== 'undefined' ? products.length : 0})
        </button>
        <button type="button" class="momentos-dash-tab" data-tab="banners" onclick="window.switchMomentosDashTab('banners')">
          <i class="fas fa-images"></i> Banners y Fondos
        </button>
        <button type="button" class="momentos-dash-tab" data-tab="users" onclick="window.switchMomentosDashTab('users')">
          <i class="fas fa-users"></i> Clientes y Nube
        </button>
      </div>

      <div class="momentos-dashboard-body" id="momentos-dashboard-body"></div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  window.switchMomentosDashTab(initialTab);
};

window.switchMomentosDashTab = function(tabName) {
  document.querySelectorAll(".momentos-dash-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  const body = document.getElementById("momentos-dashboard-body");
  if (!body) return;

  if (tabName === "stats") {
    const ordersList = JSON.parse(localStorage.getItem("avenue13_orders") || "[]");
    const analytics = JSON.parse(localStorage.getItem("avenue13_analytics") || '{"totalVisitors":0,"pageViews":0,"dailyVisits":{}}');
    const totalOrders = ordersList.length;
    const totalSales = ordersList.reduce((acc, o) => acc + (Number(o.totals?.total || o.total) || 0), 0);
    const aov = totalOrders > 0 ? (totalSales / totalOrders) : 0;
    const visitors = Number(analytics.totalVisitors || 0);
    const views = Number(analytics.pageViews || 0);

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px;">
        <div style="display:inline-flex; align-items:center; gap:8px; background:#ecfdf5; border:1px solid #a7f3d0; color:#065f46; padding:6px 12px; border-radius:20px; font-size:11px; font-weight:700;">
          <span class="momentos-pulse-dot"></span> Contabilizando estadísticas reales en tiempo real (desde 0)
        </div>
        <button type="button" class="momentos-btn-reset" style="border:1px solid #fca5a5; padding:6px 12px; border-radius:8px; color:#dc2626; font-weight:700;" onclick="window.resetMomentosRealStatsInPage()">
          <i class="fas fa-rotate-left"></i> Reiniciar Estadísticas a Cero
        </button>
      </div>

      <div class="momentos-stats-grid">
        <div class="momentos-stat-box">
          <div class="momentos-stat-label">Ventas Reales (AED)</div>
          <div class="momentos-stat-val">${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AED</div>
          <div class="momentos-stat-sub">Ingresos confirmados</div>
        </div>
        <div class="momentos-stat-box">
          <div class="momentos-stat-label">Pedidos Totales</div>
          <div class="momentos-stat-val">${totalOrders}</div>
          <div class="momentos-stat-sub">Órdenes registradas</div>
        </div>
        <div class="momentos-stat-box">
          <div class="momentos-stat-label">Ticket Promedio (AOV)</div>
          <div class="momentos-stat-val">${aov.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} AED</div>
          <div class="momentos-stat-sub">Promedio por compra</div>
        </div>
        <div class="momentos-stat-box">
          <div class="momentos-stat-label">Visitantes Reales</div>
          <div class="momentos-stat-val">${visitors.toLocaleString('en-US')}</div>
          <div class="momentos-stat-sub">${views.toLocaleString('en-US')} páginas vistas</div>
        </div>
      </div>

      <h4 style="margin:22px 0 10px 0; font-size:13px; text-transform:uppercase; letter-spacing:0.05em; color:#334155;">Historial de Pedidos Reales (${totalOrders})</h4>
      ${ordersList.length === 0 ? `
        <div style="text-align:center; padding:36px 20px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:12px; color:#64748b; font-size:13px;">
          <i class="fas fa-receipt" style="font-size:26px; margin-bottom:8px; display:block; color:#94a3b8;"></i>
          Aún no se han registrado pedidos. Las compras reales aparecerán aquí automáticamente.
        </div>
      ` : `
        <div style="overflow-x:auto; border:1px solid #e2e8f0; border-radius:10px;">
          <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0; color:#475569;">
                <th style="padding:10px 12px;">Orden</th>
                <th style="padding:10px 12px;">Fecha</th>
                <th style="padding:10px 12px;">Cliente</th>
                <th style="padding:10px 12px;">Total</th>
                <th style="padding:10px 12px;">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${ordersList.map(o => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:10px 12px; font-weight:700;">#${o.orderNumber}</td>
                  <td style="padding:10px 12px;">${o.date || ''}</td>
                  <td style="padding:10px 12px;">${o.address?.name || 'Cliente'} (${o.address?.phone || ''})</td>
                  <td style="padding:10px 12px; font-weight:700;">${Number(o.totals?.total || o.total || 0).toFixed(2)} AED</td>
                  <td style="padding:10px 12px;"><span style="background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:10px; font-size:10px; font-weight:700;">${o.status || 'Pending'}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    `;
  } else if (tabName === "catalog") {
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
        <input type="text" id="momentos-cat-search" class="momentos-field-input" style="max-width:320px;" placeholder="Buscar producto por nombre o marca..." oninput="window.filterMomentosModalCatalog(this.value)">
        <button type="button" class="momentos-btn-save" onclick="window.openInPageProductModal(null)">
          <i class="fas fa-plus"></i> Añadir Nuevo Producto
        </button>
      </div>
      <div id="momentos-modal-catalog-list" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:12px;"></div>
    `;
    window.filterMomentosModalCatalog("");
  } else if (tabName === "banners") {
    const customImages = getSavedCustomImages();
    const bannerItems = [
      { key: "hero_slide_img_0", title: "Banner Principal #1 (Moda)", fallback: "assets/hero_fashion.png" },
      { key: "hero_slide_img_1", title: "Banner Principal #2 (Nella Hair)", fallback: "assets/hero_beauty.png" },
      { key: "hero_slide_img_2", title: "Banner Principal #3 (COCO)", fallback: "assets/hero_lifestyle.png" },
      { key: "brand_card_bg_0", title: "Fondo Marca 1: Miss Chloé", fallback: "assets/emerald_dress.png" },
      { key: "brand_card_bg_1", title: "Fondo Marca 2: Nella Hair", fallback: "assets/lace_wig.png" },
      { key: "brand_card_bg_2", title: "Fondo Marca 3: COCO Beauty", fallback: "assets/coco_candle.png" },
      { key: "brand_card_bg_3", title: "Fondo Marca 4: COCO Mini", fallback: "assets/cat_lifestyle.png" }
    ];

    body.innerHTML = `
      <p style="font-size:12px; color:#64748b; margin-top:0; margin-bottom:16px;">
        Cambia cualquiera de los banners principales o las fotos de fondo de las tarjetas de marca directamente desde aquí o tocando el botón <strong>📷 Cambiar Fondo</strong> en la página:
      </p>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:14px;">
        ${bannerItems.map(item => {
          const src = customImages[item.key] || item.fallback;
          return `
            <div style="border:1px solid #e2e8f0; border-radius:12px; overflow:hidden; background:#fff; display:flex; flex-direction:column;">
              <img src="${src}" style="width:100%; height:130px; object-fit:cover; background:#f1f5f9;">
              <div style="padding:12px; display:flex; flex-direction:column; gap:8px; flex:1; justify-content:space-between;">
                <div style="font-size:12px; font-weight:700; color:#0f172a;">${item.title}</div>
                <button type="button" class="momentos-btn-upload" style="width:100%; justify-content:center;" onclick="window.openMomentosImageChanger('${item.key}', '${item.title}', '${src}', () => { window.bindMomentosLiveEditorElements(); window.switchMomentosDashTab('banners'); }, '${item.fallback}')">
                  <i class="fas fa-camera"></i> Cambiar Foto
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  } else if (tabName === "users") {
    const usersList = (JSON.parse(localStorage.getItem("avenue13_registered_users") || "[]")).filter(u => u.username !== "client_test");
    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:16px; padding:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
        <div>
          <div style="font-weight:700; font-size:13px; color:#0f172a;">☁️ Sincronización Dual-Layer con Supabase</div>
          <div style="font-size:11px; color:#64748b;">Guarda todos tus cambios en la nube o descarga una copia de seguridad en JSON.</div>
        </div>
        <div style="display:flex; gap:8px;">
          <button type="button" class="momentos-btn-save" onclick="window.saveAllMomentosChangesLive()">
            <i class="fas fa-cloud-arrow-up"></i> Sincronizar Nube
          </button>
          <button type="button" class="momentos-btn-cancel" onclick="window.downloadMomentosBackupJSON()">
            <i class="fas fa-download"></i> Backup JSON
          </button>
        </div>
      </div>

      <h4 style="margin:16px 0 10px 0; font-size:13px; text-transform:uppercase; color:#334155;">Cuentas de Clientes Registrados (${usersList.length})</h4>
      ${usersList.length === 0 ? `
        <div style="text-align:center; padding:30px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; color:#64748b; font-size:12px;">
          No hay cuentas de clientes externas registradas todavía.
        </div>
      ` : `
        <div style="overflow-x:auto; border:1px solid #e2e8f0; border-radius:10px;">
          <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
            <thead>
              <tr style="background:#f8fafc; border-bottom:1px solid #e2e8f0;">
                <th style="padding:10px 12px;">Usuario</th>
                <th style="padding:10px 12px;">Email</th>
                <th style="padding:10px 12px;">Último Acceso</th>
              </tr>
            </thead>
            <tbody>
              ${usersList.map(u => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:10px 12px; font-weight:700;">${u.username}</td>
                  <td style="padding:10px 12px;">${u.email}</td>
                  <td style="padding:10px 12px;">${u.lastLogin || '-'}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    `;
  }
};

window.filterMomentosModalCatalog = function(query = "") {
  const container = document.getElementById("momentos-modal-catalog-list");
  if (!container || typeof products === "undefined") return;
  const q = query.toLowerCase().trim();
  const list = products.filter(p =>
    !q ||
    (p.name || "").toLowerCase().includes(q) ||
    (p.brand || "").toLowerCase().includes(q) ||
    (p.category || "").toLowerCase().includes(q)
  );

  container.innerHTML = list.map(p => `
    <div style="display:flex; gap:10px; align-items:center; padding:10px; border:1px solid #e2e8f0; border-radius:10px; background:#fff;">
      <img src="${p.image}" style="width:52px; height:66px; object-fit:cover; border-radius:6px; background:#f8fafc;">
      <div style="flex:1; min-width:0;">
        <div style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase;">${p.brand}</div>
        <div style="font-size:12px; font-weight:700; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
        <div style="font-size:12px; font-weight:800; color:#db2777;">${p.price} AED</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:4px;">
        <button type="button" class="momentos-btn-cancel" style="padding:5px 8px; font-size:11px;" onclick="window.openInPageProductModal(${JSON.stringify(p.id).replace(/"/g, "'")})"><i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="momentos-btn-cancel" style="padding:5px 8px; font-size:11px; color:#dc2626;" onclick="document.querySelector('.admin-delete-btn[data-id=\\'${p.id}\\']')?.click()"><i class="far fa-trash-can"></i></button>
      </div>
    </div>
  `).join("");
};

window.resetMomentosRealStatsInPage = async function() {
  if (!confirm("¿Confirmas reiniciar a CERO todas las estadísticas de ventas, pedidos y visitantes?")) return;
  const freshAnalytics = {
    totalVisitors: 0,
    pageViews: 0,
    dailyVisits: {},
    startedAt: new Date().toISOString().slice(0, 10)
  };
  localStorage.setItem("avenue13_orders", JSON.stringify([]));
  localStorage.setItem("avenue13_analytics", JSON.stringify(freshAnalytics));
  localStorage.removeItem("admin_new_order_placed");

  if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
    try {
      await window.supabaseClient.from("site_settings").upsert([
        { key: "real_analytics", value: freshAnalytics },
        { key: "real_orders", value: [] }
      ]);
    } catch (e) {}
  }

  window.switchMomentosDashTab("stats");
  window.showMomentosToast("✅ Estadísticas limpiadas a 0. Registrando métricas reales desde ahora.");
};

window.downloadMomentosBackupJSON = function() {
  const backup = {
    exportedAt: new Date().toISOString(),
    products: typeof products !== "undefined" ? products : [],
    customTexts: getSavedCustomTexts(),
    customImages: getSavedCustomImages(),
    analytics: JSON.parse(localStorage.getItem("avenue13_analytics") || "{}"),
    orders: JSON.parse(localStorage.getItem("avenue13_orders") || "[]")
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `13th-avenue-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
};

function initAdminInPageSystem() {
  window.bindMomentosLiveEditorElements();
  attachMomentosGlobalClickListener();

  const isAdmin = localStorage.getItem("admin_logged_in") === "true";
  if (!isAdmin) return;

  if (localStorage.getItem("avenue13_live_edit_mode") === null) {
    localStorage.setItem("avenue13_live_edit_mode", "true");
  }

  renderMomentosFloatingToolbar();
}

// Logout in-page admin
window.logoutAdminInPage = function() {
  if (confirm("¿Deseas cerrar la sesión de Administrador?")) {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("avenue13_live_edit_mode");
    document.body.classList.remove("momentos-edit-mode");
    window.location.reload();
  }
};

// Open dynamic edit/add product modal (with HTML5 Canvas compression & live Supabase upsert)
window.openInPageProductModal = function(productId) {
  const existing = document.getElementById("admin-inpage-modal-overlay");
  if (existing) existing.remove();

  let p = null;
  if (productId !== null && productId !== undefined) {
    p = products.find(prod => String(prod.id) === String(productId));
    if (!p) {
      alert("Product not found!");
      return;
    }
  }

  const overlay = document.createElement("div");
  overlay.id = "admin-inpage-modal-overlay";
  overlay.className = "admin-inpage-overlay";
  
  overlay.innerHTML = `
    <div class="admin-inpage-modal">
      <div class="admin-inpage-modal-header">
        <h3>${p ? '✏️ Editar Producto en Vivo' : '➕ Añadir Nuevo Producto'}</h3>
        <button type="button" onclick="document.getElementById('admin-inpage-modal-overlay').remove()"><i class="fas fa-times"></i></button>
      </div>
      <div class="admin-inpage-modal-body">
        <form id="inpage-product-form" style="display:flex; flex-direction:column; gap:14px;">
          <div style="display:flex; gap:14px; flex-wrap:wrap;">
            <div style="flex:1; min-width:200px;">
              <label class="locale-label" style="margin-bottom:6px;">Nombre del Producto</label>
              <input type="text" id="inpage-p-name" value="${p ? p.name.replace(/"/g, '&quot;') : ''}" required style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
            <div style="width:180px;">
              <label class="locale-label" style="margin-bottom:6px;">Marca</label>
              <select id="inpage-p-brand" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
                <option value="Miss Chloé" ${p && p.brand === 'Miss Chloé' ? 'selected' : ''}>Miss Chloé</option>
                <option value="Nella Hair Couture" ${p && p.brand === 'Nella Hair Couture' ? 'selected' : ''}>Nella Hair Couture</option>
                <option value="COCO Beauty" ${p && p.brand === 'COCO Beauty' ? 'selected' : ''}>COCO Beauty</option>
                <option value="COCO Mini" ${p && p.brand === 'COCO Mini' ? 'selected' : ''}>COCO Mini</option>
                <option value="Wedding Collection" ${p && p.brand === 'Wedding Collection' ? 'selected' : ''}>Wedding Collection</option>
                <option value="13th Avenue" ${p && p.brand === '13th Avenue' ? 'selected' : ''}>13th Avenue</option>
              </select>
            </div>
          </div>

          <div style="display:flex; gap:14px; flex-wrap:wrap;">
            <div style="flex:1; min-width:150px;">
              <label class="locale-label" style="margin-bottom:6px;">Categoría</label>
              <select id="inpage-p-cat" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
                <option value="Fashion" ${p && p.category === 'Fashion' ? 'selected' : ''}>Fashion</option>
                <option value="Hair & Wigs" ${p && p.category === 'Hair & Wigs' ? 'selected' : ''}>Hair & Wigs</option>
                <option value="Beauty" ${p && p.category === 'Beauty' ? 'selected' : ''}>Beauty</option>
                <option value="Kids & Baby" ${p && p.category === 'Kids & Baby' ? 'selected' : ''}>Kids & Baby</option>
                <option value="Wedding" ${p && p.category === 'Wedding' ? 'selected' : ''}>Wedding</option>
                <option value="Exclusive Collections" ${p && p.category === 'Exclusive Collections' ? 'selected' : ''}>Exclusive Collections</option>
              </select>
            </div>
            <div style="flex:1; min-width:150px;">
              <label class="locale-label" style="margin-bottom:6px;">Subcategoría</label>
              <input type="text" id="inpage-p-sub" value="${p && p.subcategory ? p.subcategory : ''}" placeholder="Ej. Dresses, Wigs, Skincare" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
          </div>

          <div style="display:flex; gap:14px;">
            <div style="flex:1;">
              <label class="locale-label" style="margin-bottom:6px;">Precio (AED)</label>
              <input type="number" step="0.01" id="inpage-p-price" value="${p ? p.price : ''}" required style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
            <div style="flex:1;">
              <label class="locale-label" style="margin-bottom:6px;">Precio Anterior (Opcional AED)</label>
              <input type="number" step="0.01" id="inpage-p-orig" value="${p && p.originalPrice ? p.originalPrice : ''}" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
          </div>

          <div>
            <label class="locale-label" style="margin-bottom:6px;">Fotografía del Producto (Subir desde Celular/PC o URL)</label>
            <div style="display:flex; gap:12px; align-items:center;">
              <img id="inpage-p-preview" src="${p ? p.image : 'assets/cat_exclusive.png'}" style="width:56px; height:72px; object-fit:cover; border-radius:6px; border:1px solid #cbd5e1;">
              <input type="text" id="inpage-p-image" value="${p ? p.image : ''}" required style="flex:1; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
              <input type="file" id="inpage-p-file" accept="image/*" style="display:none;" onchange="handleInPageImageUpload(this)">
              <button type="button" onclick="document.getElementById('inpage-p-file').click()" style="padding:10px 14px; background-color:#d97706; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:700; font-size:12px;"><i class="fas fa-camera"></i> Subir Foto</button>
            </div>
          </div>

          <div>
            <label class="locale-label" style="margin-bottom:6px;">Descripción</label>
            <textarea id="inpage-p-desc" required style="width:100%; padding:10px; border:1px solid var(--border-color); height:70px; resize:vertical; background-color:white; color:#0f172a; border-radius:6px;">${p ? p.description : ''}</textarea>
          </div>

          <div style="display:flex; gap:14px;">
            <div style="flex:1;">
              <label class="locale-label" style="margin-bottom:6px;">Tallas (separadas por coma)</label>
              <input type="text" id="inpage-p-sizes" value="${p && p.sizes ? p.sizes.join(', ') : 'XS, S, M, L'}" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
            <div style="width:100px;">
              <label class="locale-label" style="margin-bottom:6px;">Rating</label>
              <input type="number" id="inpage-p-rating" step="0.1" min="0" max="5" value="${p ? p.rating : '5.0'}" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:white; color:#0f172a; border-radius:6px;">
            </div>
          </div>

          <button type="submit" id="inpage-p-submit-btn" class="btn-premium" style="margin-top:6px; padding:14px; background:#db2777 !important; border:none; width:100%; font-size:12px; color:white !important; font-weight:800; border-radius:8px; cursor:pointer;">
            <i class="fas fa-check"></i> ${p ? 'Guardar Cambios en Vivo' : 'Crear y Publicar Producto'}
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("inpage-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("inpage-p-submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Guardando en Vivo...`;
    }

    const name = document.getElementById("inpage-p-name").value.trim();
    const brand = document.getElementById("inpage-p-brand").value;
    const category = document.getElementById("inpage-p-cat").value;
    const subcategory = document.getElementById("inpage-p-sub").value.trim();
    const price = Number(document.getElementById("inpage-p-price").value);
    const originalPrice = Number(document.getElementById("inpage-p-orig").value) || price;
    const image = document.getElementById("inpage-p-image").value.trim();
    const description = document.getElementById("inpage-p-desc").value.trim();
    const sizes = document.getElementById("inpage-p-sizes").value.split(",").map(s => s.trim()).filter(Boolean);
    const rating = Number(document.getElementById("inpage-p-rating").value) || 5.0;

    let targetProd = p;
    if (p) {
      p.name = name;
      p.brand = brand;
      p.category = category;
      p.subcategory = subcategory;
      p.price = price;
      p.originalPrice = originalPrice;
      p.image = image;
      p.description = description;
      p.sizes = sizes;
      p.rating = rating;
    } else {
      const newId = products.reduce((max, prod) => (Number(prod.id) || 0) > max ? Number(prod.id) : max, 0) + 1;
      targetProd = {
        id: newId,
        name,
        brand,
        category,
        subcategory,
        price,
        originalPrice,
        rating,
        reviews: 0,
        sizes: sizes.length ? sizes : ["One Size"],
        colors: [{ name: "Default", hex: "#111111" }],
        image,
        description,
        inStock: true,
        features: ["Premium Collection"]
      };
      products.unshift(targetProd);
    }

    localStorage.setItem("avenue13_products_draft", JSON.stringify(products));

    if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
      try {
        await window.supabaseClient.from("products").upsert([{
          id: String(targetProd.id),
          name: targetProd.name,
          brand: targetProd.brand,
          price: Number(targetProd.price),
          original_price: targetProd.originalPrice || targetProd.price,
          category: targetProd.category,
          subcategory: targetProd.subcategory,
          image: targetProd.image,
          description: targetProd.description,
          sizes: targetProd.sizes,
          colors: targetProd.colors || [{ name: "Default", hex: "#111111" }],
          in_stock: true,
          rating: Number(targetProd.rating || 5.0)
        }]);
      } catch (err) {
        console.warn("Supabase product save warning:", err);
      }
    }

    overlay.remove();
    window.showMomentosToast(`✅ Producto "${targetProd.name}" guardado en vivo`);

    if (typeof renderProductGrid === "function" && document.getElementById("trending-products-grid")) {
      renderProductGrid(products.slice(0, 10), "trending-products-grid");
    }
    if (typeof applyFiltersAndRender === "function" && document.getElementById("category-products-grid")) {
      applyFiltersAndRender();
    }
    if (typeof initProductDetailPage === "function" && document.getElementById("detail-title")) {
      initProductDetailPage();
    }
    if (document.getElementById("momentos-modal-catalog-list")) {
      window.filterMomentosModalCatalog(document.getElementById("momentos-cat-search")?.value || "");
    }
  });
};

// Handle in-page image upload with HTML5 Canvas compression
window.handleInPageImageUpload = async function(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  try {
    const compressedBase64 = await window.compressImageWithCanvas(file, 1000, 0.86);
    const preview = document.getElementById("inpage-p-preview");
    if (preview) preview.src = compressedBase64;
    const imgInput = document.getElementById("inpage-p-image");
    if (imgInput) imgInput.value = compressedBase64;
  } catch (e) {
    console.error("Image upload compression error:", e);
  }
};

// Global Mobile Drawer Close Handler
window.closeMobileDrawer = function() {
  const mainNav = document.getElementById("main-nav");
  if (mainNav) mainNav.classList.remove("active");
  const backdrop = document.querySelector(".menu-backdrop");
  if (backdrop) backdrop.classList.remove("active");
  document.body.classList.remove("menu-open");
  document.body.style.overflow = "";
  const menuIcon = document.getElementById("menu-toggle-btn")?.querySelector("i");
  if (menuIcon) menuIcon.className = "fas fa-bars";
};

// Global Support Modal Handler (Rule 5: WhatsApp icon ONLY, zero text)
window.openSupportModal = function() {
  const existing = document.getElementById("support-modal-overlay");
  if (existing) existing.remove();

  const isFr = (currentLocale && currentLocale.language) === 'fr';
  const overlay = document.createElement("div");
  overlay.id = "support-modal-overlay";
  overlay.className = "modal-overlay active";

  const content = document.createElement("div");
  content.className = "modal-content";
  content.style.maxWidth = "440px";
  content.style.padding = "28px 24px";
  content.style.borderRadius = "var(--rounded-lg)";
  content.style.textAlign = "center";
  content.style.position = "relative";

  content.innerHTML = `
    <button class="modal-close-btn" onclick="closeSupportModal()" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:18px; color:var(--text-muted); cursor:pointer;"><i class="fas fa-times"></i></button>
    <div style="width: 56px; height: 56px; background: rgba(219, 39, 119, 0.1); color: var(--accent-pink); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; font-size: 24px;">
      <i class="fas fa-headset"></i>
    </div>
    <h3 style="font-family: var(--font-serif); font-size: 22px; font-weight: 700; margin-bottom: 8px; color: var(--text-main);">${isFr ? "Support Client 24/7" : "24/7 Customer Support"}</h3>
    <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5; margin-bottom: 24px;">${isFr ? "Une question sur une commande ou un produit ? Notre équipe est là pour vous aider à tout moment." : "Have a question about an order or a product? Our dedicated team is here to assist you anytime."}</p>
    
    <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; align-items: center;">
      <a href="https://wa.me/971501234567" target="_blank" rel="noopener" aria-label="WhatsApp" style="display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; background: #25D366; color: white; border-radius: 50%; text-decoration: none; font-size: 26px; box-shadow: 0 4px 12px rgba(37,211,102,0.25);">
        <i class="fab fa-whatsapp"></i>
      </a>
      <a href="mailto:support@13thavenue.com" style="display: flex; width: 100%; align-items: center; justify-content: center; gap: 10px; background: #ffffff; color: var(--text-main); border: 1px solid var(--border-color); padding: 14px 20px; border-radius: var(--rounded-md); text-decoration: none; font-weight: 700; font-size: 13px;">
        <i class="far fa-envelope" style="font-size: 16px;"></i> support@13thavenue.com
      </a>
    </div>

    <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
      ${isFr ? "Heures d'ouverture : Lundi - Dimanche, 9:00 - 21:00 (GST)" : "Opening hours: Monday - Sunday, 9:00 AM - 9:00 PM (GST)"}
    </div>
  `;

  overlay.appendChild(content);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeSupportModal();
  });
};

window.closeSupportModal = function() {
  const overlay = document.getElementById("support-modal-overlay");
  if (overlay) overlay.remove();
};

// Supabase Live Store Data Hydration (Products + Custom Texts + Custom Images + Real Analytics)
async function fetchSupabaseLiveStoreData() {
  if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
    try {
      const [prodRes, settingsRes] = await Promise.allSettled([
        window.supabaseClient.from("products").select("*"),
        window.supabaseClient.from("site_settings").select("key, value").in("key", ["custom_texts", "custom_images", "real_analytics", "real_orders"])
      ]);

      if (prodRes.status === "fulfilled" && !prodRes.value.error && Array.isArray(prodRes.value.data) && prodRes.value.data.length > 0) {
        const mapped = prodRes.value.data.map(item => ({
          id: isNaN(Number(item.id)) ? item.id : Number(item.id),
          name: item.name,
          brand: item.brand,
          price: Number(item.price),
          originalPrice: item.original_price ? Number(item.original_price) : undefined,
          category: item.category,
          subcategory: item.subcategory,
          image: item.image,
          description: item.description,
          sizes: item.sizes || [],
          colors: item.colors || [],
          inStock: item.in_stock !== false,
          rating: Number(item.rating || 5.0)
        }));
        window.products = mapped;
        if (typeof products !== "undefined" && Array.isArray(products)) {
          products.length = 0;
          products.push(...mapped);
        }
        if (typeof renderProductGrid === "function" && document.getElementById("trending-products-grid")) {
          renderProductGrid(products.slice(0, 10), "trending-products-grid");
        }
        if (typeof renderProductGrid === "function" && document.getElementById("curated-edit-grid")) {
          renderProductGrid(products.slice(4, 12), "curated-edit-grid");
        }
        if (typeof applyFiltersAndRender === "function" && document.getElementById("category-products-grid")) {
          applyFiltersAndRender();
        }
      }

      if (settingsRes.status === "fulfilled" && !settingsRes.value.error && Array.isArray(settingsRes.value.data)) {
        settingsRes.value.data.forEach(row => {
          if (row.key === "custom_texts" && row.value && typeof row.value === "object") {
            const merged = { ...row.value, ...getSavedCustomTexts() };
            localStorage.setItem("avenue13_custom_texts", JSON.stringify(merged));
          }
          if (row.key === "custom_images" && row.value && typeof row.value === "object") {
            const merged = { ...row.value, ...getSavedCustomImages() };
            localStorage.setItem("avenue13_custom_images", JSON.stringify(merged));
          }
          if (row.key === "real_orders" && Array.isArray(row.value)) {
            const localOrds = JSON.parse(localStorage.getItem("avenue13_orders") || "[]");
            if (row.value.length > localOrds.length) {
              localStorage.setItem("avenue13_orders", JSON.stringify(row.value));
            }
          }
        });
        window.bindMomentosLiveEditorElements();
      }
    } catch (e) {
      console.warn("Supabase live hydration error:", e);
    }
  }
}

// 24/7 Wake-Lock Pulse for Render & Supabase (Every 5 minutes per Rule 2.2)
function startWakeLockPulse() {
  const pulse = () => {
    try {
      fetch("/healthz", { method: "GET", cache: "no-store" }).catch(() => {});
    } catch (e) {}
    if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
      try {
        const q = window.supabaseClient.from("products").select("id", { count: "exact", head: true });
        if (q && typeof q.then === "function") {
          q.then(() => {}, () => {});
        }
      } catch (e) {}
    }
  };
  setInterval(pulse, 5 * 60 * 1000);
}

// Run initialization cleanly once
let avenue13Bootstrapped = false;
async function bootstrapAvenue13App() {
  if (avenue13Bootstrapped) return;
  avenue13Bootstrapped = true;

  try {
    initLocalization();
  } catch (e) {
    console.warn("initLocalization error:", e);
  }

  try {
    renderAllDynamicComponents();
  } catch (e) {
    console.error("renderAllDynamicComponents error:", e);
  }

  try {
    trackRealSiteVisit();
  } catch (e) {
    console.warn("trackRealSiteVisit error:", e);
  }

  try {
    initAdminInPageSystem();
  } catch (e) {
    console.warn("initAdminInPageSystem error:", e);
  }

  startWakeLockPulse();
  await fetchSupabaseLiveStoreData();

  try {
    initAdminInPageSystem();
  } catch (e) {}
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapAvenue13App);
} else {
  bootstrapAvenue13App();
}

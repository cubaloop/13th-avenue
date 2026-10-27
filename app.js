// --- Browser On-Screen Diagnostic System ---
window.addEventListener("error", (e) => {
  let diag = document.getElementById("diag-banner");
  if (!diag) {
    diag = document.createElement("div");
    diag.id = "diag-banner";
    diag.style.position = "fixed";
    diag.style.bottom = "20px";
    diag.style.left = "20px";
    diag.style.right = "20px";
    diag.style.backgroundColor = "#fee2e2";
    diag.style.border = "2px solid #ef4444";
    diag.style.color = "#991b1b";
    diag.style.padding = "16px";
    diag.style.borderRadius = "8px";
    diag.style.zIndex = "1000000";
    diag.style.fontFamily = "monospace";
    diag.style.fontSize = "12px";
    diag.style.boxShadow = "0 10px 15px rgba(0,0,0,0.1)";
    diag.innerHTML = `<strong>⚠️ JS Runtime Error Detected:</strong><br><span id="diag-msg"></span>`;
    document.body.appendChild(diag);
  }
  document.getElementById("diag-msg").innerHTML += `${e.message} at ${e.filename}:${e.lineno}:${e.colno}<br>`;
});

function checkProductsLoaded() {
  if (typeof products === "undefined" || products.length === 0) {
    const errorMsg = document.createElement("div");
    errorMsg.style.position = "fixed";
    errorMsg.style.bottom = "120px";
    errorMsg.style.left = "20px";
    errorMsg.style.right = "20px";
    errorMsg.style.backgroundColor = "#ffedd5";
    errorMsg.style.border = "2px solid #f97316";
    errorMsg.style.color = "#c2410c";
    errorMsg.style.padding = "16px";
    errorMsg.style.borderRadius = "8px";
    errorMsg.style.zIndex = "1000000";
    errorMsg.style.fontFamily = "monospace";
    errorMsg.style.fontSize = "12px";
    errorMsg.innerHTML = `<strong>⚠️ Diagnostic: products variable is ${typeof products === "undefined" ? "UNDEFINED" : "EMPTY"}. Check if products.js loaded successfully.</strong>`;
    document.body.appendChild(errorMsg);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkProductsLoaded);
} else {
  checkProductsLoaded();
}

// --- Global State & Storage ---
let cart = JSON.parse(localStorage.getItem("avenue13_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("avenue13_wishlist")) || [];
let appliedPromo = JSON.parse(localStorage.getItem("avenue13_promo")) || null;

// --- Currency/Price Localization Fallback Helper ---
function formatPrice(amount) {
  if (window.formatPrice && window.formatPrice !== formatPrice) {
    return window.formatPrice(amount);
  }
  return `${Number(amount).toFixed(2)} AED`;
}

// --- Draft Database Fallback Override ---
const draftDb = localStorage.getItem("avenue13_products_draft");
if (draftDb) {
  try {
    const parsed = JSON.parse(draftDb);
    if (Array.isArray(parsed) && parsed.length > 0) {
      products.length = 0;
      products.push(...parsed);
    } else {
      console.warn("Draft database in localStorage was empty or invalid, using default catalog.");
      localStorage.removeItem("avenue13_products_draft");
    }
  } catch (e) {
    console.error("Could not parse draft products database from localStorage", e);
    localStorage.removeItem("avenue13_products_draft");
  }
}

// --- Initialize Page Logic ---
function runInitPageLogic() {
  initGlobalUI();
  updateHeaderCounts();
  renderCartDrawer();
  
  // Event Delegation for In-Page Product Edits
  document.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".admin-edit-btn");
    if (editBtn) {
      e.preventDefault();
      const pid = Number(editBtn.dataset.id);
      if (window.openInPageProductModal) {
        window.openInPageProductModal(pid);
      }
    }
    
    const deleteBtn = e.target.closest(".admin-delete-btn");
    if (deleteBtn) {
      e.preventDefault();
      const pid = Number(deleteBtn.dataset.id);
      if (confirm(`Are you sure you want to delete Product #${pid}?`)) {
        const idx = products.findIndex(p => p.id === pid);
        if (idx > -1) {
          products.splice(idx, 1);
          localStorage.setItem("avenue13_products_draft", JSON.stringify(products));
          alert("Product deleted from browser draft. Save changes to make it permanent!");
          window.location.reload();
        }
      }
    }
  });
  
  // Page-specific initializations
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.includes("index") || pathname === "/" || pathname.endsWith("13th-avenue/") || pathname.endsWith("13th-avenue")) {
    initHomePage();
  } else if (pathname.includes("category")) {
    initCategoryPage();
  } else if (pathname.includes("product")) {
    initProductDetailPage();
  } else if (pathname.includes("cart")) {
    initCartPage();
  } else if (pathname.includes("checkout")) {
    initCheckoutPage();
  } else if (pathname.includes("confirmation")) {
    initConfirmationPage();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runInitPageLogic);
} else {
  runInitPageLogic();
}

// --- Helper Functions to Save State ---
function saveCart() {
  localStorage.setItem("avenue13_cart", JSON.stringify(cart));
  updateHeaderCounts();
  renderCartDrawer();
  // Trigger update on Cart Page if active
  if (window.location.pathname.toLowerCase().includes("cart")) {
    renderCartPageTable();
  }
}

function saveWishlist() {
  localStorage.setItem("avenue13_wishlist", JSON.stringify(wishlist));
  
  // Sync to registered user database if logged in
  const loggedInUser = localStorage.getItem("user_logged_in");
  if (loggedInUser && loggedInUser !== "admin") {
    let usersList = JSON.parse(localStorage.getItem("avenue13_registered_users")) || [];
    const userIdx = usersList.findIndex(u => u.username === loggedInUser);
    if (userIdx > -1) {
      usersList[userIdx].wishlist = [...wishlist];
      localStorage.setItem("avenue13_registered_users", JSON.stringify(usersList));
    }
  }

  updateHeaderCounts();
  // Refresh category grid elements if active
  if (window.location.pathname.toLowerCase().includes("category")) {
    updateCategoryGridWishlistStates();
  }
}

// --- Global UI Listeners (Header, Footer, Cart Drawer) ---
function initGlobalUI() {
  // Cart Drawer open/close
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const cartDrawerClose = document.getElementById("cart-drawer-close");
  const cartBackdrop = document.getElementById("cart-drawer-backdrop");
  
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleCartDrawer(true);
    });
  }
  
  if (cartDrawerClose) {
    cartDrawerClose.addEventListener("click", () => toggleCartDrawer(false));
  }
  
  if (cartBackdrop) {
    cartBackdrop.addEventListener("click", () => toggleCartDrawer(false));
  }
  



  // Global Search bar execution
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
          window.location.href = `category.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  }

  // Global Promo code apply in Drawer
  const promoApplyBtn = document.getElementById("promo-apply-btn");
  const promoInput = document.getElementById("promo-input");
  if (promoApplyBtn && promoInput) {
    promoApplyBtn.addEventListener("click", () => {
      const code = promoInput.value.trim().toUpperCase();
      applyPromoCode(code);
    });
  }
  
  // Newsletter signup Form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input");
      if (emailInput.value) {
        alert("¡Thank you for subscribing to 13th Avenue! You will receive 15% discount on your next email.");
        emailInput.value = "";
      }
    });
  }
}

function toggleCartDrawer(open) {
  const backdrop = document.getElementById("cart-drawer-backdrop");
  const drawer = document.getElementById("cart-drawer");
  if (backdrop && drawer) {
    if (open) {
      backdrop.classList.add("active");
      drawer.classList.add("active");
    } else {
      backdrop.classList.remove("active");
      drawer.classList.remove("active");
    }
  }
}

function updateHeaderCounts() {
  const cartBadge = document.getElementById("cart-badge");
  const wishlistBadge = document.getElementById("wishlist-badge");
  
  if (cartBadge) {
    const qtyCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = qtyCount;
    cartBadge.style.display = qtyCount > 0 ? "flex" : "none";
  }
  
  if (wishlistBadge) {
    wishlistBadge.textContent = wishlist.length;
    wishlistBadge.style.display = wishlist.length > 0 ? "flex" : "none";
  }
}

// --- Cart State Modifiers ---
function addToCart(productId, size, quantity = 1, color = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // Find match with same size and color
  const existingItemIndex = cart.findIndex(item => 
    item.id === productId && 
    item.size === size && 
    (!color || item.color === color)
  );
  
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      size: size,
      color: color || (product.colors && product.colors[0]?.name) || null,
      quantity: quantity
    });
  }
  
  saveCart();
  toggleCartDrawer(true);
}

function updateCartQty(productId, size, color, change) {
  const index = cart.findIndex(item => 
    item.id === productId && 
    item.size === size && 
    (!color || item.color === color)
  );
  
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeFromCart(productId, size, color) {
  cart = cart.filter(item => 
    !(item.id === productId && item.size === size && (!color || item.color === color))
  );
  saveCart();
}

function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  saveWishlist();
}

// --- Promo Code Engine ---
function applyPromoCode(code) {
  const alertBox = document.getElementById("promo-message") || { setAttribute: () => {}, textContent: "" };
  
  if (code === "AVENUE13") {
    appliedPromo = {
      code: "AVENUE13",
      discountType: "percentage",
      value: 15 // 15% off
    };
    localStorage.setItem("avenue13_promo", JSON.stringify(appliedPromo));
    alert("Coupon 'AVENUE13' applied successfully! 15% discount has been deducted.");
  } else {
    alert("Invalid promo code. Try 'AVENUE13' for 15% off.");
  }
  
  saveCart();
}

// --- Cart Calculations ---
function getCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  
  if (appliedPromo && appliedPromo.code === "AVENUE13") {
    discount = subtotal * (appliedPromo.value / 100);
  }
  
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 25; // Free over 150 AED, else 25 AED
  const total = subtotal - discount + shipping;
  
  return { subtotal, discount, shipping, total };
}

// --- Render Cart Drawer Content ---
function renderCartDrawer() {
  const cartItemsContainer = document.getElementById("cart-drawer-items");
  if (!cartItemsContainer) return;
  
  cartItemsContainer.innerHTML = "";
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center" style="padding: 40px 0; color: var(--text-muted);">
        <p style="font-size: 16px; margin-bottom: 12px;">Your shopping bag is empty.</p>
        <a href="category.html" class="btn-premium" style="font-size: 11px; padding: 12px 24px;">Shop New In</a>
      </div>
    `;
    updateDrawerSummary(0, 0, 0, 0);
    return;
  }
  
  cart.forEach(item => {
    const itemCard = document.createElement("div");
    itemCard.className = "cart-item-card";
    itemCard.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div>
          <div class="cart-item-meta" style="font-weight: 700; color: var(--gold-brand); text-transform: uppercase;">${item.brand}</div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ''}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn minus-qty" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn plus-qty" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">+</button>
        </div>
        <div class="cart-item-price-remove">
          <div class="current-price" style="font-size: 13px;">${formatPrice(item.price * item.quantity)}</div>
          <button class="cart-item-remove-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">Remove</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemCard);
  });
  
  // Attach listeners to cart action elements
  cartItemsContainer.querySelectorAll(".plus-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null, 1);
    });
  });
  
  cartItemsContainer.querySelectorAll(".minus-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null, -1);
    });
  });
  
  cartItemsContainer.querySelectorAll(".cart-item-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null);
    });
  });
  
  const { subtotal, discount, shipping, total } = getCartTotals();
  updateDrawerSummary(subtotal, discount, shipping, total);
}

function updateDrawerSummary(subtotal, discount, shipping, total) {
  const subtotalEl = document.getElementById("drawer-subtotal");
  const discountEl = document.getElementById("drawer-discount");
  const shippingEl = document.getElementById("drawer-shipping");
  const totalEl = document.getElementById("drawer-total");
  const discountRow = document.getElementById("drawer-discount-row");
  
  const isFr = (window.currentLocale && window.currentLocale.language === "fr");
  const freeText = isFr ? "GRATUIT" : "FREE";
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) {
    discountEl.textContent = `-${formatPrice(discount)}`;
    if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
  }
  if (shippingEl) shippingEl.textContent = shipping === 0 ? freeText : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

// --- Home Page Interactive Features ---
function initHomePage() {
  // Slideshow interval
  const slides = document.querySelectorAll(".slide");
  let activeSlideIndex = 0;
  
  function nextSlide() {
    slides[activeSlideIndex].classList.remove("active");
    activeSlideIndex = (activeSlideIndex + 1) % slides.length;
    slides[activeSlideIndex].classList.add("active");
  }
  
  function prevSlide() {
    slides[activeSlideIndex].classList.remove("active");
    activeSlideIndex = (activeSlideIndex - 1 + slides.length) % slides.length;
    slides[activeSlideIndex].classList.add("active");
  }
  
  // Slider controls
  const nextBtn = document.getElementById("slider-next");
  const prevBtn = document.getElementById("slider-prev");
  
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  }
  
  let slideInterval = setInterval(nextSlide, 7000);
  
  // Pause slider on button click
  [nextBtn, prevBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 10000); // Resume slow
      });
    }
  });
  
  // Render Trending Feed (10 items for horizontal left-to-right carousel per Requirement 6)
  renderProductGrid(products.slice(0, 10), "trending-products-grid");

  // Horizontal Left-to-Right Carousel Controls & Auto-Slide (Requirement 6)
  window.scrollTrendingCarousel = function(direction) {
    const track = document.getElementById("trending-products-grid");
    if (!track) return;
    const scrollAmount = 300;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (direction > 0 && track.scrollLeft >= maxScroll - 10) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction < 0 && track.scrollLeft <= 10) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
  };

  const trendingTrack = document.getElementById("trending-products-grid");
  if (trendingTrack) {
    let trendingPaused = false;
    trendingTrack.addEventListener("mouseenter", () => { trendingPaused = true; });
    trendingTrack.addEventListener("mouseleave", () => { trendingPaused = false; });
    trendingTrack.addEventListener("touchstart", () => { trendingPaused = true; }, { passive: true });
    trendingTrack.addEventListener("touchend", () => { trendingPaused = false; }, { passive: true });

    setInterval(() => {
      if (!trendingPaused && window.scrollTrendingCarousel) {
        window.scrollTrendingCarousel(1);
      }
    }, 4000);
  }
}

// --- Category Page Interactive Features ---
let activeFilters = {
  brands: [],
  categories: [],
  sizes: [],
  priceRanges: [],
  searchQuery: "",
  subcategory: ""
};

function initCategoryPage() {
  // Read query params
  const params = new URLSearchParams(window.location.search);
  const brandParam = params.get("brand");
  const categoryParam = params.get("category");
  const subcategoryParam = params.get("subcategory");
  const searchParam = params.get("search");
  
  if (brandParam) {
    activeFilters.brands.push(brandParam);
    checkFilterCheckbox("brand-filter", brandParam);
  }
  if (categoryParam) {
    activeFilters.categories.push(categoryParam);
    checkFilterCheckbox("cat-filter", categoryParam);
  }
  if (subcategoryParam) {
    activeFilters.subcategory = subcategoryParam;
  }
  if (searchParam) {
    activeFilters.searchQuery = searchParam;
    const searchHeader = document.getElementById("category-display-title");
    if (searchHeader) searchHeader.textContent = `Search Results for "${searchParam}"`;
  } else {
    // Set Page Title
    const displayTitle = document.getElementById("category-display-title");
    if (displayTitle) {
      displayTitle.textContent = subcategoryParam 
        ? `${brandParam || 'Featured'} - ${subcategoryParam}`
        : `${categoryParam || brandParam || 'All Collections'}`;
    }
  }
  
  // Listeners for Sidebar filters
  document.querySelectorAll(".brand-filter-check").forEach(cb => {
    cb.addEventListener("change", () => {
      toggleFilterArray(activeFilters.brands, cb.value, cb.checked);
      applyFiltersAndRender();
    });
  });
  
  document.querySelectorAll(".cat-filter-check").forEach(cb => {
    cb.addEventListener("change", () => {
      toggleFilterArray(activeFilters.categories, cb.value, cb.checked);
      applyFiltersAndRender();
    });
  });
  
  document.querySelectorAll(".size-filter-check").forEach(cb => {
    cb.addEventListener("change", () => {
      toggleFilterArray(activeFilters.sizes, cb.value, cb.checked);
      applyFiltersAndRender();
    });
  });
  
  document.querySelectorAll(".price-filter-check").forEach(cb => {
    cb.addEventListener("change", () => {
      toggleFilterArray(activeFilters.priceRanges, cb.value, cb.checked);
      applyFiltersAndRender();
    });
  });
  
  // Sort Dropdown Change
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      applyFiltersAndRender();
    });
  }
  
  // Collapsible Filters Widget Headers
  document.querySelectorAll(".filter-widget-title").forEach(header => {
    header.addEventListener("click", () => {
      const options = header.nextElementSibling;
      const icon = header.querySelector("i");
      if (options) {
        if (options.style.display === "none") {
          options.style.display = "flex";
          if (icon) icon.className = "fas fa-chevron-up";
        } else {
          options.style.display = "none";
          if (icon) icon.className = "fas fa-chevron-down";
        }
      }
    });
  });
  
  // Mobile Filter Drawer Toggling
  const filterToggleBtn = document.getElementById("filter-toggle-btn");
  const filterSidebar = document.getElementById("filter-sidebar");
  const closeFilterBtn = document.getElementById("close-filter-btn");

  if (filterToggleBtn && filterSidebar) {
    filterToggleBtn.addEventListener("click", () => {
      filterSidebar.classList.add("active");
      
      // Inject backdrop overlay
      let backdrop = document.querySelector(".filter-backdrop");
      if (!backdrop) {
        backdrop = document.createElement("div");
        backdrop.className = "filter-backdrop";
        document.body.appendChild(backdrop);
      }
      setTimeout(() => backdrop.classList.add("active"), 10);
      document.body.style.overflow = "hidden";
      
      const closeFilterDrawer = () => {
        filterSidebar.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
      };
      
      backdrop.addEventListener("click", closeFilterDrawer);
      if (closeFilterBtn) {
        closeFilterBtn.addEventListener("click", closeFilterDrawer);
      }
    });
  }

  // Initial filtering run
  applyFiltersAndRender();
}

// Normalization helper to strip accents and casing, preventing encoding/collation mismatches
function normalizeString(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/Ã©/g, "e")
    .replace(/[^a-z0-9]/g, "");
}

function checkFilterCheckbox(className, value) {
  const normValue = normalizeString(value);
  document.querySelectorAll(`.${className}-check`).forEach(cb => {
    if (normalizeString(cb.value) === normValue) {
      cb.checked = true;
    }
  });
}

function toggleFilterArray(arr, value, checked) {
  if (checked) {
    if (!arr.includes(value)) arr.push(value);
  } else {
    const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1);
  }
}

function applyFiltersAndRender() {
  let filtered = [...products];
  
  // 1. Search Query Filter
  if (activeFilters.searchQuery) {
    const q = normalizeString(activeFilters.searchQuery);
    filtered = filtered.filter(p => 
      normalizeString(p.name).includes(q) || 
      normalizeString(p.brand).includes(q) || 
      normalizeString(p.category).includes(q) ||
      (p.subcategory && normalizeString(p.subcategory).includes(q))
    );
  }
  
  // 1.1 Subcategory Filter
  if (activeFilters.subcategory) {
    const normSub = normalizeString(activeFilters.subcategory);
    
    // Subcategory Alias Mappings for home/lifestyle cards & mega menus
    let targetSubs = [normSub];
    if (normSub === "home" || normSub === "decor") {
      targetSubs = ["fragrances", "beautytools", "home", "decor"];
    } else if (normSub === "electronics" || normSub === "electronicscosmetics" || normSub === "electronic") {
      targetSubs = ["beautytools", "skincare", "electronics", "cosmetics"];
    } else if (normSub === "kids" || normSub === "babyclothing") {
      targetSubs = ["babyclothing", "toys", "kids"];
    } else if (normSub === "gifts" || normSub === "giftsparty" || normSub === "gifts-party") {
      targetSubs = ["gifts", "giftsets"];
    } else if (normSub === "bag" || normSub === "bags") {
      targetSubs = ["shoulderbags", "bags", "bag"];
    } else if (normSub === "shoes") {
      targetSubs = ["heels", "flats", "sandals", "boots", "sneakers", "shoes"];
    }

    filtered = filtered.filter(p => {
      if (!p.subcategory) return false;
      const pSubNorm = normalizeString(p.subcategory);
      return targetSubs.includes(pSubNorm);
    });
  }
  
  // 2. Brand Filter
  if (activeFilters.brands.length > 0) {
    const normBrands = activeFilters.brands.map(b => normalizeString(b));
    filtered = filtered.filter(p => {
      const pBrandNorm = normalizeString(p.brand);
      return normBrands.some(b => {
        if (b === "coco") {
          return pBrandNorm.includes("coco");
        }
        return pBrandNorm === b;
      });
    });
  }
  
  // 3. Category Filter
  if (activeFilters.categories.length > 0) {
    const normCats = activeFilters.categories.map(c => normalizeString(c));
    filtered = filtered.filter(p => normCats.includes(normalizeString(p.category)));
  }
  
  // 4. Size Filter
  if (activeFilters.sizes.length > 0) {
    filtered = filtered.filter(p => p.sizes.some(s => activeFilters.sizes.includes(s)));
  }
  
  // 5. Price Ranges Filter
  if (activeFilters.priceRanges.length > 0) {
    filtered = filtered.filter(p => {
      return activeFilters.priceRanges.some(range => {
        if (range === "0-100") return p.price <= 100;
        if (range === "100-250") return p.price > 100 && p.price <= 250;
        if (range === "250-500") return p.price > 250 && p.price <= 500;
        if (range === "500+") return p.price > 500;
        return true;
      });
    });
  }
  
  // 6. Sorting Engine
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    const sortVal = sortSelect.value;
    if (sortVal === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === "newest") {
      filtered.sort((a, b) => b.id - a.id); // Seed IDs act as age
    } else {
      filtered.sort((a, b) => b.rating - a.rating); // Popularity fallback
    }
  }
  
  // Render Count
  const countEl = document.getElementById("category-results-count");
  if (countEl) countEl.textContent = `${filtered.length} products found`;
  
  // Render Grid
  renderProductGrid(filtered, "category-products-grid");
}

function updateCategoryGridWishlistStates() {
  // Favorite/Wishlist removed per Requirement 2
}

// --- Render Generic Product Grid ---
function renderProductGrid(itemsList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = "";
  
  if (itemsList.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="grid-column: span 4; padding: 60px 0; color: var(--text-muted);">
        <p style="font-size: 16px;">No products match your filters.</p>
        <button onclick="resetAllFilters()" class="btn-premium" style="margin-top: 16px; font-size: 11px; padding: 12px 24px;">Reset Filters</button>
      </div>
    `;
    return;
  }
  
  itemsList.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    
    // Check if on sale
    const isSale = p.originalPrice > p.price;
    
    const isAdmin = localStorage.getItem("admin_logged_in") === "true";
    card.innerHTML = `
      <div class="product-image-container">
        ${isSale ? `<span class="product-tag sale-tag">Sale</span>` : ''}
        ${isAdmin ? `
          <div class="admin-card-controls">
            <button class="admin-edit-btn" data-id="${p.id}" title="Edit Product"><i class="fas fa-pencil-alt"></i></button>
            <button class="admin-delete-btn" data-id="${p.id}" title="Delete Product"><i class="far fa-trash-can"></i></button>
          </div>
        ` : ''}
        <a href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}">
        </a>
        <button class="quick-add-cart-btn" data-id="${p.id}" title="Quick Add to Bag">
          <i class="fas fa-shopping-bag"></i>
        </button>
        <div class="quick-add-sizes">
          <span style="font-size: 9px; font-weight: 700; width: 100%; text-align: center; display: block; color: var(--text-muted); text-transform: uppercase;">Quick Add</span>
          ${(p.sizes || []).map(sz => `
            <button class="quick-size-btn" data-id="${p.id}" data-size="${sz}">${sz}</button>
          `).join('')}
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></div>
        <div class="price-block">
          <span class="current-price ${isSale ? 'sale-price' : ''}">${formatPrice(p.price)}</span>
          ${isSale ? `<span class="original-price">${formatPrice(p.originalPrice)}</span>` : ''}
        </div>
        <div class="product-rating">
          <i class="fas fa-star"></i>
          <span>${p.rating}</span>
          <span class="rating-count">(${p.reviews || 12})</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".quick-add-cart-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pid = Number(btn.dataset.id);
      const product = products.find(prod => prod.id === pid);
      if (product) {
        const defaultSize = product.sizes[0] || "One Size";
        addToCart(pid, defaultSize, 1);
      }
    });
  });
  
  container.querySelectorAll(".quick-size-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const pid = Number(btn.dataset.id);
      const sz = btn.dataset.size;
      addToCart(pid, sz, 1);
    });
  });
}

function resetAllFilters() {
  activeFilters.brands = [];
  activeFilters.categories = [];
  activeFilters.sizes = [];
  activeFilters.priceRanges = [];
  
  document.querySelectorAll(".brand-filter-check, .cat-filter-check, .size-filter-check, .price-filter-check").forEach(cb => {
    cb.checked = false;
  });
  
  applyFiltersAndRender();
}

// --- Product Detail Page Interactive Features ---
let activeSelectedSize = null;
let activeSelectedColor = null;

function initProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id")) || 1; // Fallback to 1st item
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    window.location.href = "category.html";
    return;
  }
  
  // Fill text details
  document.getElementById("detail-brand").textContent = product.brand;
  document.getElementById("detail-title").textContent = product.name;
  
  const isSale = product.originalPrice > product.price;
  const priceEl = document.getElementById("detail-price");
  const origEl = document.getElementById("detail-original");
  
  if (priceEl) {
    priceEl.textContent = formatPrice(product.price);
    if (isSale) {
      priceEl.classList.add("sale");
      if (origEl) {
        origEl.textContent = formatPrice(product.originalPrice);
        origEl.style.display = "inline";
      }
    } else {
      priceEl.classList.remove("sale");
      if (origEl) origEl.style.display = "none";
    }
  }
  
  const ratingEl = document.getElementById("detail-rating-stars");
  const reviewsEl = document.getElementById("detail-reviews-count");
  if (ratingEl) {
    ratingEl.innerHTML = `<i class="fas fa-star"></i> <span>${product.rating}</span>`;
  }
  if (reviewsEl) {
    reviewsEl.textContent = `(${product.reviews} reviews)`;
  }
  
  const descText = document.getElementById("detail-desc-text");
  if (descText) descText.textContent = product.description;
  
  const featuresList = document.getElementById("detail-features-list");
  if (featuresList && product.features) {
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join("");
  }
  
  // Set Main Image and Thumbnails
  const mainImg = document.getElementById("detail-main-img");
  const thumbnailsContainer = document.getElementById("detail-thumbnails");
  
  if (mainImg) mainImg.src = product.image;
  
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = "";
    // Create 3 thumbnails (1 main + 2 category cards placeholders for gallery look)
    const galleryImages = [
      product.image,
      product.category === "Fashion" ? "assets/cat_fashion.png" : (product.category === "Hair & Wigs" ? "assets/cat_beauty.png" : "assets/cat_lifestyle.png"),
      "assets/hero_fashion.png"
    ];
    
    galleryImages.forEach((imgSrc, idx) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${imgSrc}" alt="${product.name}">`;
      thumb.addEventListener("click", () => {
        thumbnailsContainer.querySelectorAll(".thumbnail-item").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        if (mainImg) mainImg.src = imgSrc;
      });
      thumbnailsContainer.appendChild(thumb);
    });
  }
  
  // Render Size Bubbles
  const sizeGrid = document.getElementById("detail-sizes-grid");
  if (sizeGrid) {
    sizeGrid.innerHTML = "";
    product.sizes.forEach(sz => {
      const bubble = document.createElement("div");
      bubble.className = "size-bubble";
      bubble.textContent = sz;
      bubble.addEventListener("click", () => {
        sizeGrid.querySelectorAll(".size-bubble").forEach(b => b.classList.remove("active"));
        bubble.classList.add("active");
        activeSelectedSize = sz;
      });
      sizeGrid.appendChild(bubble);
    });
  }
  
  // Render Color Swatches
  const colorSwatches = document.getElementById("detail-colors-list");
  if (colorSwatches && product.colors) {
    colorSwatches.innerHTML = "";
    product.colors.forEach((col, idx) => {
      const sw = document.createElement("button");
      sw.className = `swatch-btn ${idx === 0 ? 'active' : ''}`;
      sw.style.backgroundColor = col.hex;
      sw.title = col.name;
      if (idx === 0) activeSelectedColor = col.name;
      
      sw.addEventListener("click", () => {
        colorSwatches.querySelectorAll(".swatch-btn").forEach(s => s.classList.remove("active"));
        sw.classList.add("active");
        activeSelectedColor = col.name;
      });
      colorSwatches.appendChild(sw);
    });
  }
  
  // Size Guide Modals
  const sizeGuideLink = document.getElementById("size-guide-link");
  const modalBackdrop = document.getElementById("size-guide-modal");
  const modalClose = document.getElementById("modal-close");
  
  if (sizeGuideLink && modalBackdrop) {
    sizeGuideLink.addEventListener("click", (e) => {
      e.preventDefault();
      modalBackdrop.classList.add("active");
    });
  }
  if (modalClose) {
    modalClose.addEventListener("click", () => modalBackdrop.classList.remove("active"));
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("active");
    });
  }
  
  // Expandable Accordions logic
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const icon = header.querySelector("i");
      if (content) {
        const isOpen = content.style.display === "block";
        content.style.display = isOpen ? "none" : "block";
        if (icon) icon.className = isOpen ? "fas fa-plus" : "fas fa-minus";
      }
    });
  });
  
  // Main CTAs Action Buttons
  const addToBagBtn = document.getElementById("add-to-bag-btn");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      if (!activeSelectedSize) {
        alert("Please select a size first.");
        return;
      }
      addToCart(product.id, activeSelectedSize, 1, activeSelectedColor);
    });
  }
  
  const wishBtn = document.getElementById("wishlist-btn-detail");
  if (wishBtn) {
    const updateWishBtnLabel = () => {
      const isWish = wishlist.includes(product.id);
      wishBtn.textContent = isWish ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST";
    };
    updateWishBtnLabel();
    wishBtn.addEventListener("click", () => {
      toggleWishlist(product.id);
      updateWishBtnLabel();
    });
  }
  
  // Inject In-Page Admin Edit button
  const isAdmin = localStorage.getItem("admin_logged_in") === "true";
  if (isAdmin) {
    const detailInfo = document.querySelector(".product-detail-info");
    if (detailInfo) {
      const editBtn = document.createElement("button");
      editBtn.className = "admin-detail-edit-btn";
      editBtn.innerHTML = `<i class="fas fa-pencil-alt"></i> Edit Product Specs`;
      editBtn.addEventListener("click", () => {
        if (window.openInPageProductModal) {
          window.openInPageProductModal(product.id);
        }
      });
      detailInfo.appendChild(editBtn);
    }
  }
  
  // Render "Complete the Look" suggestions (first 4 elements of another brand)
  const suggestions = products.filter(p => p.id !== product.id).slice(0, 4);
  renderProductGrid(suggestions, "complete-look-grid");
}

// --- Cart Dedicated Page Interactive Features ---
function initCartPage() {
  renderCartPageTable();
  
  // Apply coupon code on page
  const pagePromoBtn = document.getElementById("cart-page-promo-apply");
  const pagePromoInput = document.getElementById("cart-page-promo-input");
  
  if (pagePromoBtn && pagePromoInput) {
    pagePromoBtn.addEventListener("click", () => {
      const code = pagePromoInput.value.trim().toUpperCase();
      applyPromoCode(code);
      renderCartPageTable();
    });
  }
}

function renderCartPageTable() {
  const container = document.getElementById("cart-table-rows");
  if (!container) return;
  
  container.innerHTML = "";
  
  const { subtotal, discount, shipping, total } = getCartTotals();
  
  // Update totals panel
  const subtotalEl = document.getElementById("page-subtotal");
  const discountEl = document.getElementById("page-discount");
  const shippingEl = document.getElementById("page-shipping");
  const totalEl = document.getElementById("page-total");
  const discountRow = document.getElementById("page-discount-row");
  
  const isFr = (window.currentLocale && window.currentLocale.language === "fr");
  const freeText = isFr ? "GRATUIT" : "FREE";
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) {
    discountEl.textContent = `-${formatPrice(discount)}`;
    if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
  }
  if (shippingEl) shippingEl.textContent = shipping === 0 ? freeText : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
  
  if (cart.length === 0) {
    document.getElementById("cart-content-wrapper").innerHTML = `
      <div class="text-center" style="padding: 80px 0; border: 1px solid var(--border-color); border-radius: var(--rounded-default);">
        <h2 style="font-family: var(--font-serif); font-size: 28px; margin-bottom: 12px; text-transform: uppercase;">Your Shopping bag is empty</h2>
        <p style="color: var(--text-muted); margin-bottom: 30px;">Add items to your shopping bag to check out.</p>
        <a href="category.html" class="btn-premium">Continue Shopping</a>
      </div>
    `;
    return;
  }
  
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-table-row";
    row.innerHTML = `
      <div class="cart-product-cell">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <div style="font-size: 11px; font-weight: 700; color: var(--gold-brand); text-transform: uppercase;">${item.brand}</div>
          <div style="font-size: 14px; font-weight: 600; margin: 4px 0;"><a href="product.html?id=${item.id}">${item.name}</a></div>
          <div style="font-size: 12px; color: var(--text-muted);">Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ''}</div>
        </div>
      </div>
      <div>${formatPrice(item.price)}</div>
      <div class="cart-item-qty" style="margin-top: 0;">
        <button class="qty-btn minus-qty" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn plus-qty" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}">+</button>
      </div>
      <div class="cart-table-subtotal">
        <span>${formatPrice(item.price * item.quantity)}</span>
        <button class="cart-item-remove-btn" data-id="${item.id}" data-size="${item.size}" data-color="${item.color || ''}" style="display: block; margin-top: 8px;">Remove</button>
      </div>
    `;
    container.appendChild(row);
  });
  
  // Attach Listeners
  container.querySelectorAll(".plus-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null, 1);
    });
  });
  
  container.querySelectorAll(".minus-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      updateCartQty(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null, -1);
    });
  });
  
  container.querySelectorAll(".cart-item-remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(Number(btn.dataset.id), btn.dataset.size, btn.dataset.color || null);
    });
  });
}

// --- Checkout Page Logic ---
function initCheckoutPage() {
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }
  
  // Fill Summary List
  const listContainer = document.getElementById("checkout-items-summary");
  if (listContainer) {
    listContainer.innerHTML = "";
    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "d-flex justify-between align-center";
      div.style.borderBottom = "1px solid var(--border-color)";
      div.style.paddingBottom = "12px";
      div.style.marginBottom = "12px";
      div.innerHTML = `
        <div class="d-flex align-center" style="gap: 12px;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; aspect-ratio: 3/4; border-radius: var(--rounded-sm);">
          <div>
            <div style="font-size: 12px; font-weight: 700;">${item.name}</div>
            <div style="font-size: 11px; color: var(--text-muted);">Size: ${item.size} x ${item.quantity}</div>
          </div>
        </div>
        <div style="font-size: 13px; font-weight: 700;">${formatPrice(item.price * item.quantity)}</div>
      `;
      listContainer.appendChild(div);
    });
  }
  
  const { subtotal, discount, shipping, total } = getCartTotals();
  
  const subtotalEl = document.getElementById("checkout-subtotal");
  const discountEl = document.getElementById("checkout-discount");
  const shippingEl = document.getElementById("checkout-shipping");
  const totalEl = document.getElementById("checkout-total");
  const discountRow = document.getElementById("checkout-discount-row");
  
  const isFr = (window.currentLocale && window.currentLocale.language === "fr");
  const freeText = isFr ? "GRATUIT" : "FREE";
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) {
    discountEl.textContent = `-${formatPrice(discount)}`;
    if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
  }
  if (shippingEl) shippingEl.textContent = shipping === 0 ? freeText : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
  
  // Payment card toggles
  const cards = document.querySelectorAll(".payment-option-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const r = card.querySelector("input[type=radio]");
      if (r) r.checked = true;
    });
  });
  
  // Checkout Submit button
  const form = document.getElementById("checkout-form");
  const submitBtn = form ? form.querySelector("button[type=submit]") : null;
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitOriginalText = submitBtn ? submitBtn.textContent : "PLACE ORDER";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING PAYMENT...';
      }
      
      // Seed Order details in localStorage for receipt page
      const orderNumber = "AV" + Math.floor(Math.random() * 900000 + 100000);
      const deliveryEst = new Date();
      deliveryEst.setDate(deliveryEst.getDate() + 3); // 3 days estimate
      
      const orderDetails = {
        orderNumber,
        deliveryEst: deliveryEst.toLocaleDateString("en-AE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        items: cart,
        totals: { subtotal, discount, shipping, total },
        address: {
          name: document.getElementById("first-name").value + " " + document.getElementById("last-name").value,
          street: document.getElementById("street-address").value,
          city: document.getElementById("city").value,
          phone: document.getElementById("phone-number").value
        }
      };
      
      const selectedMethod = document.querySelector('input[name="payment-method"]:checked')?.id || "pay-card";
      
      processPayment(selectedMethod, orderDetails)
        .then((res) => {
          // Log order details in database
          let ordersList = JSON.parse(localStorage.getItem("avenue13_orders")) || [];
          
          orderDetails.date = new Date().toISOString().slice(0, 10);
          orderDetails.method = selectedMethod === "pay-card" ? "Credit Card" : (selectedMethod === "pay-tabby" ? "Tabby installments" : "Cash on Delivery");
          orderDetails.status = "Pending Delivery";
          
          ordersList.push(orderDetails);
          localStorage.setItem("avenue13_orders", JSON.stringify(ordersList));

          // Push order to Supabase Cloud Database if connected
          if (typeof window.supabaseClient !== "undefined" && window.supabaseClient) {
            const emailInput = document.getElementById("email-address");
            window.supabaseClient.from('orders').insert([{
              order_number: orderDetails.orderNumber,
              customer_name: orderDetails.address.name,
              customer_email: emailInput ? emailInput.value : "customer@13thavenue.com",
              customer_phone: orderDetails.address.phone,
              shipping_address: orderDetails.address,
              items: orderDetails.items,
              subtotal: orderDetails.totals.subtotal,
              discount: orderDetails.totals.discount,
              total: orderDetails.totals.total,
              currency: "AED",
              status: "Pending Delivery"
            }]).then(({ error }) => {
              if (error) console.warn("Supabase order insert warning:", error);
              else console.log("⚡ Order logged live to Supabase Cloud!");
            });
          }
          
          // Trigger admin panel order notification badge
          localStorage.setItem("admin_new_order_placed", "true");
          
          localStorage.setItem("avenue13_latest_order", JSON.stringify(orderDetails));
          
          // Clear Cart
          cart = [];
          localStorage.removeItem("avenue13_cart");
          localStorage.removeItem("avenue13_promo");
          
          // Redirect
          window.location.href = "confirmation.html";
        })
        .catch(err => {
          alert("Payment Error: " + err.message);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitOriginalText;
          }
        });
    });
  }
}

// --- Payment Gateways Integration Infrastructure (Placeholders for Owner) ---
function processPayment(method, orderDetails) {
  return new Promise((resolve, reject) => {
    console.log(`[Payment] Dispatching order transaction. Method: ${method}`, orderDetails);
    
    if (method === "pay-card") {
      // Create and open Credit Card Payment Modal
      const existing = document.getElementById("card-payment-overlay");
      if (existing) existing.remove();

      const overlay = document.createElement("div");
      overlay.id = "card-payment-overlay";
      overlay.className = "modal-overlay active";
      
      overlay.innerHTML = `
        <div class="modal-container" style="max-width: 400px; width: 90%; background-color: var(--bg-color); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: var(--shadow-lg); overflow: hidden; animation: modalFadeIn 0.3s ease;">
          <div class="modal-header" style="padding: 16px 20px; border-bottom: 1px solid var(--border-color);">
            <span style="font-weight:700; letter-spacing:0.05em; color:var(--text-color); font-size:14px; text-transform:uppercase;">Secure Card Payment</span>
            <button class="modal-close" id="close-card-modal-btn"><i class="fas fa-times"></i></button>
          </div>
          <div style="padding: 24px;">
            <div style="font-size: 14px; font-weight:700; margin-bottom: 20px; display:flex; justify-content:space-between; color:var(--text-color);">
              <span>Amount to Pay:</span>
              <span style="color:var(--accent-pink);">${formatPrice(orderDetails.totals.total)}</span>
            </div>
            
            <div style="margin-bottom:14px;">
              <label style="display:block; font-size:10px; font-weight:700; text-transform:uppercase; margin-bottom:6px; color:var(--text-muted);">Cardholder Name</label>
              <input type="text" id="card-name" value="${orderDetails.address.name}" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:var(--bg-color); color:var(--text-color); border-radius:4px; font-size:13px;">
            </div>
            
            <div style="margin-bottom:14px;">
              <label style="display:block; font-size:10px; font-weight:700; text-transform:uppercase; margin-bottom:6px; color:var(--text-muted);">Card Number</label>
              <input type="text" id="card-num" maxlength="16" placeholder="1234567812345678" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:var(--bg-color); color:var(--text-color); border-radius:4px; font-size:13px;">
            </div>
            
            <div style="display:flex; gap:16px; margin-bottom:24px;">
              <div style="flex:1;">
                <label style="display:block; font-size:10px; font-weight:700; text-transform:uppercase; margin-bottom:6px; color:var(--text-muted);">Expiry Date</label>
                <input type="text" id="card-expiry" maxlength="5" placeholder="MM/YY" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:var(--bg-color); color:var(--text-color); border-radius:4px; font-size:13px; text-align:center;">
              </div>
              <div style="flex:1;">
                <label style="display:block; font-size:10px; font-weight:700; text-transform:uppercase; margin-bottom:6px; color:var(--text-muted);">CVV / CVC</label>
                <input type="password" id="card-cvc" maxlength="3" placeholder="123" style="width:100%; padding:10px; border:1px solid var(--border-color); background-color:var(--bg-color); color:var(--text-color); border-radius:4px; font-size:13px; text-align:center;">
              </div>
            </div>
            
            <button class="btn-premium" id="pay-submit-btn" style="width:100%; text-align:center; padding:12px; font-size:12px;">PAY ${formatPrice(orderDetails.totals.total)}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Event listener to close
      document.getElementById("close-card-modal-btn").addEventListener("click", () => {
        overlay.remove();
        reject(new Error("Card payment cancelled by user."));
      });

      // Submit payment
      document.getElementById("pay-submit-btn").addEventListener("click", () => {
        const cName = document.getElementById("card-name").value.trim();
        const cNum = document.getElementById("card-num").value.trim();
        const cExp = document.getElementById("card-expiry").value.trim();
        const cCvc = document.getElementById("card-cvc").value.trim();

        if (!cName || !cNum || !cExp || !cCvc) {
          alert("Please fill in all credit card fields.");
          return;
        }

        if (cNum.length !== 16 || isNaN(Number(cNum))) {
          alert("Card number must be exactly 16 digits.");
          return;
        }

        if (!/^\d{2}\/\d{2}$/.test(cExp)) {
          alert("Expiry date must be in MM/YY format.");
          return;
        }

        if (cCvc.length !== 3 || isNaN(Number(cCvc))) {
          alert("CVC / CVV must be exactly 3 digits.");
          return;
        }

        // Show processing state on payment modal
        const submitBtn = document.getElementById("pay-submit-btn");
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AUTHORIZING...';

        setTimeout(() => {
          overlay.remove();
          resolve({ status: "success", gateway: "card", details: { cardholder: cName, cardLast4: cNum.slice(-4) } });
        }, 1500);
      });
      
    } else if (method === "pay-tabby") {
      // Simulating Tabby transaction delay and redirection
      console.log("Redirecting to Tabby checkout session...");
      setTimeout(() => {
        resolve({ status: "success", gateway: "tabby" });
      }, 1200);
      
    } else if (method === "pay-cod") {
      setTimeout(() => {
        resolve({ status: "success", gateway: "cod" });
      }, 800);
    } else {
      reject(new Error("Unknown payment method selected."));
    }
  });
}

// --- Order Confirmation Page Logic ---
function initConfirmationPage() {
  const order = JSON.parse(localStorage.getItem("avenue13_latest_order"));
  if (!order) {
    window.location.href = "index.html";
    return;
  }
  
  const orderNumEl = document.getElementById("order-number-val");
  const deliveryEl = document.getElementById("delivery-est-val");
  const receiptItems = document.getElementById("receipt-items-list");
  
  if (orderNumEl) orderNumEl.textContent = order.orderNumber;
  if (deliveryEl) deliveryEl.textContent = order.deliveryEst;
  
  if (receiptItems) {
    receiptItems.innerHTML = "";
    order.items.forEach(item => {
      const li = document.createElement("li");
      li.className = "d-flex justify-between align-center";
      li.style.borderBottom = "1px solid var(--border-color)";
      li.style.padding = "10px 0";
      li.innerHTML = `
        <div>
          <div style="font-size: 13px; font-weight: 700;">${item.name}</div>
          <div style="font-size: 11px; color: var(--text-muted);">Size: ${item.size} x ${item.quantity} ${item.color ? `| Color: ${item.color}` : ''}</div>
        </div>
        <div style="font-weight: 700;">${formatPrice(item.price * item.quantity)}</div>
      `;
      receiptItems.appendChild(li);
    });
  }
  
  // Total summary block
  const subtotalEl = document.getElementById("receipt-subtotal");
  const discountEl = document.getElementById("receipt-discount");
  const shippingEl = document.getElementById("receipt-shipping");
  const totalEl = document.getElementById("receipt-total");
  const discountRow = document.getElementById("receipt-discount-row");
  
  const { subtotal, discount, shipping, total } = order.totals;
  
  const isFr = (window.currentLocale && window.currentLocale.language === "fr");
  const freeText = isFr ? "GRATUIT" : "FREE";
  
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (discountEl) {
    discountEl.textContent = `-${formatPrice(discount)}`;
    if (discountRow) discountRow.style.display = discount > 0 ? "flex" : "none";
  }
  if (shippingEl) shippingEl.textContent = shipping === 0 ? freeText : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

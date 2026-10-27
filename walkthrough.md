# Walkthrough - 13th Avenue E-Commerce Web Application

We have successfully built and verified the e-commerce web application for **13th Avenue**, inspired by the aesthetics and features of **PrettyLittleThing (PLT)**. 

Below is a detailed summary of the files created, reference images generated, and instructions for local execution.

---

## 1. Project Directory Structure
All project source code has been created under:
`C:\Users\Yo\.gemini\antigravity\scratch\13th-avenue`

Here is a map of the file structure:
*   [DESIGN.md](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/DESIGN.md) — The design system token definitions.
*   [index.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/index.html) — The main landing page with slider and category grids.
*   [category.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/category.html) — Product directory with filters and sorting options.
*   [product.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/product.html) — Detailed product page (size selections, swatches, modals).
*   [cart.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/cart.html) — Dedicated detailed shopping bag overview.
*   [checkout.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/checkout.html) — Order billing, shipping and payment forms.
*   [confirmation.html](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/confirmation.html) — Successful checkout invoice and receipt.
*   [styles.css](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/styles.css) — Custom stylesheet containing CSS variables, components, and animations.
*   [products.js](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/products.js) — Seed catalog holding the 19 mock items representing the brand architecture.
*   [app.js](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/app.js) — Interactive state engine (persistent cart, wishlist, search filter).
*   [server.py](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/server.py) — Development web server.

---

## 2. Generated Reference Images
To fulfill the request of having correct placeholder reference images for each category, brand, and main articles, we generated the following assets in [assets/](file:///C:/Users/Yo/.gemini/antigravity/scratch/13th-avenue/assets):

| Asset Filename | Purpose | Description |
| :--- | :--- | :--- |
| `hero_fashion.png` | Banner | Miss Chloé street-wear and evening dress models |
| `hero_beauty.png` | Banner | Nella Hair Couture human hair extensions close-up |
| `hero_lifestyle.png` | Banner | COCO Home interior design with warm lighting |
| `cat_fashion.png` | Category Card / Product | Miss Chloé modest abaya model walk |
| `cat_beauty.png` | Category Card / Product | Nella Hair model showing silky hair wig locks |
| `cat_lifestyle.png` | Category Card / Product | COCO modern home decor ceramic vases & cushions |
| `cat_exclusive.png` | Category Card | 13th Avenue exclusive handbag & accessories |
| `emerald_dress.png` | Product Detail | Miss Chloé Emerald Green Satin Wrap Dress |
| `black_abaya.png` | Product Detail | Miss Chloé Classic Silk Open Modest Abaya |
| `lace_wig.png` | Product Detail | Nella Hair 22" HD Lace Frontal Straight Human Hair Wig |
| `coco_candle.png` | Product Detail | COCO Home Matte Black Ceramic Soy Wax Candle |
| `exclusive_jacket.png`| Product Detail | 13th Avenue Monogram Bomber Jacket |

---

## 3. Brand Architecture Implementation

The website fully models the requested product catalog:
*   **MISS CHLOÉ (Fashion)**
    *   *Dresses:* Emerald Green Satin Wrap Dress, Avenue Drape Satin Maxi Dress.
    *   *Abayas:* Classic Silk Open Abaya, Embellished Luxury Occasion Abaya.
    *   *Casual Wear:* Wide-Leg Linen Trousers.
    *   *bag:* Quilted Leather Shoulder Bag.
    *   *shoes:* Elegant Strappy Heeled Sandals.
*   **NELLA HAIR COUTURE (Beauty & Hair)**
    *   *Wigs:* 22" HD Lace Front Straight Wig, HD Lace Front Body Wave Wig.
    *   *Hair Extensions:* Seamless Clip-in Extensions.
    *   *hair accessories:* Crystal Embellished Hair Clips (Pack of 3).
*   **COCO (Lifestyle)**
    *   *Home & Decor:* Scented Ceramic Candle, Minimalist Ribbed Ceramic Vase.
    *   *Electronics/Cosmetics:* Smart Aroma Diffuser & Humidifier.
    *   *Gifts & party:* Luxury Gold Gift Wrapping Set.
    *   *Kids:* Organic Cotton Baby Romper.
    *   *Fragrances:* COCO Oud Intense EDP Perfume.
*   **EXCLUSIVE COLLECTIONS**
    *   *13th Avenue Exclusive:* Avenue 13 Monogram Bomber Jacket, Limited Edition Silk Scarf.

---

## 4. Verification & Testing Instructions

To run the application locally and check all functionalities:

1.  **Open terminal / shell in the project folder:**
    ```powershell
    cd C:\Users\Yo\.gemini\antigravity\scratch\13th-avenue
    ```
2.  **Start the local development server:**
    ```powershell
    python server.py
    ```
3.  **Browse the site:**
    Open [http://localhost:8000](http://localhost:8000) in your web browser.

### Key Interactive Flows to Validate:
*   **Mobile-First Navigation:** Resize your browser to mobile width (under 768px). The top header will dynamically wrap (displaying the logo, hamburger menu, actions in one row, and search in a full-width row below). Clicking the hamburger menu opens an off-canvas drawer with collapsible categories (Miss Chloé, Nella Hair Couture, COCO) and a dark blur backdrop.
*   **Dynamic Cart Drawer:** Add an item to the shopping bag (e.g., select a size for the Emerald Green Satin Dress and click "Add to Bag"). The right drawer will slide in automatically, showing details.
*   **Wishlist Toggle:** Click the heart icon on any product card. The wishlist counter in the header will update instantly. Click the wishlist badge or navigate to `category.html?wishlist=true` to view your items.
*   **Advanced Filtering & Sorting:** Go to `category.html`. Click checkbox filters (e.g., select "Nella Hair Couture" and size "22 Inches") or sort by "Price: High to Low" to see the responsive grid update in real-time.
*   **Promo Discount Code:** In the cart drawer or cart page, type `AVENUE13` in the promo code input box and click Apply. You will receive a 15% discount deducted from your subtotal.
*   **Secure Checkout Simulation:** Proceed to checkout, fill in the shipping address, select a payment option (e.g., Tabby), and place the order. You will see a beautiful receipt confirmation with a randomly generated order ID.


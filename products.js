const products = [
  {
    "id": 1,
    "name": "Emerald Green Satin Wrap Dress",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Dresses",
    "price": 245,
    "originalPrice": 350,
    "rating": 4.8,
    "reviews": 124,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Emerald Green",
        "hex": "#0F5257"
      },
      {
        "name": "Champagne Gold",
        "hex": "#E8C88B"
      }
    ],
    "image": "assets/11-24-25_S7_40_PDF2502165_Chocolate_KF_AC_11-53-05_83923_PXF.jpg",
    "description": "Indulge in pure luxury with our Emerald Green Satin Wrap Dress. Featuring a premium silky-smooth satin fabric, an elegant wrap front, and long drape sleeves. Perfect for high-end occasions.",
    "features": [
      "100% Polyester Satin",
      "Self-tie wrap waist",
      "Drape bishop sleeves",
      "Dry clean only"
    ]
  },
  {
    "id": 2,
    "name": "Avenue Drape Satin Maxi Dress",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Dresses",
    "price": 280,
    "originalPrice": 280,
    "rating": 4.6,
    "reviews": 42,
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      {
        "name": "Classic Black",
        "hex": "#111111"
      },
      {
        "name": "Rose Gold",
        "hex": "#B76E79"
      }
    ],
    "image": "assets/cat_fashion.png",
    "description": "Turn heads in the Avenue Drape Satin Maxi Dress. Features an asymmetrical neckline with elegant draping detailing down the side and a high-leg slit to showcase your heels.",
    "features": [
      "Premium heavyweight satin",
      "Asymmetrical neckline",
      "Thigh slit details",
      "Invisible back zipper closure"
    ]
  },
  {
    "id": 3,
    "name": "Classic Silk Open Abaya",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Abayas",
    "price": 320,
    "originalPrice": 450,
    "rating": 4.9,
    "reviews": 88,
    "sizes": [
      "52",
      "54",
      "56",
      "58",
      "60"
    ],
    "colors": [
      {
        "name": "Classic Black",
        "hex": "#111111"
      }
    ],
    "image": "assets/black_abaya.png",
    "description": "An essential for every modest wardrobe, our Classic Silk Open Abaya is tailored from the finest silk blends. Offers a fluid, graceful drape and a beautiful soft sheen finish.",
    "features": [
      "Premium Silk Blend",
      "Matching belt included",
      "Side pockets",
      "Lightweight, breathable feel"
    ]
  },
  {
    "id": 4,
    "name": "Embellished Luxury Occasion Abaya",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Abayas",
    "price": 450,
    "originalPrice": 450,
    "rating": 5,
    "reviews": 19,
    "sizes": [
      "54",
      "56",
      "58"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#1c1c1c"
      },
      {
        "name": "Dusty Rose",
        "hex": "#cfa6a6"
      }
    ],
    "image": "assets/cat_fashion.png",
    "description": "Make an entrance at your next formal event in Miss Chlo\u00e9's Embellished Luxury Occasion Abaya. Intricate hand-sewn beadwork and sequined patterns trace the sleeves and hemline.",
    "features": [
      "Hand-sewn beadwork",
      "Georgette double layer crepe",
      "Includes matching shayla",
      "Dry clean only"
    ]
  },
  {
    "id": 5,
    "name": "Wide-Leg Linen Trousers",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Casual Wear",
    "price": 150,
    "originalPrice": 190,
    "rating": 4.4,
    "reviews": 65,
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Oatmeal Cream",
        "hex": "#EAE6DF"
      },
      {
        "name": "Classic White",
        "hex": "#FFFFFF"
      }
    ],
    "image": "assets/cat_fashion.png",
    "description": "Effortless casual luxury. These high-waisted wide-leg trousers are crafted from 100% breathable organic linen, offering comfort and style for daytime lounge chic.",
    "features": [
      "100% Organic Linen",
      "High-rise elasticated waist",
      "Relaxed fit",
      "Side pockets"
    ]
  },
  {
    "id": 6,
    "name": "Quilted Leather Shoulder Bag",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Shoulder Bags",
    "price": 195,
    "originalPrice": 195,
    "rating": 4.7,
    "reviews": 57,
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#111111"
      },
      {
        "name": "Ivory White",
        "hex": "#F3EFEF"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Complete your look with our signature Quilted Leather Shoulder Bag. Features a luxurious gold chain link strap and a sleek monogram turn-lock clasp.",
    "features": [
      "Genuine vegan leather",
      "Polished gold hardware",
      "Interior zip pocket",
      "Adjustable chain strap"
    ]
  },
  {
    "id": 7,
    "name": "Elegant Strappy Heeled Sandals",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "Heels",
    "price": 180,
    "originalPrice": 240,
    "rating": 4.5,
    "reviews": 38,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41"
    ],
    "colors": [
      {
        "name": "Metallic Gold",
        "hex": "#D4AF37"
      },
      {
        "name": "Midnight Black",
        "hex": "#0A0A0A"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Elevate your look with Miss Chlo\u00e9's Strappy Heeled Sandals. Designed with sleek minimalist straps, a square-toe silhouette, and a comfortable 85mm stiletto heel.",
    "features": [
      "85mm heel height",
      "Cushioned insole",
      "Adjustable buckle ankle strap",
      "Synthetic sole"
    ]
  },
  {
    "id": 8,
    "name": "22 Inch HD Lace Front Straight Wig",
    "brand": "Nella Hair Couture",
    "category": "Hair & Wigs",
    "subcategory": "Wigs",
    "price": 850,
    "originalPrice": 1200,
    "rating": 4.9,
    "reviews": 147,
    "sizes": [
      "22 Inches"
    ],
    "colors": [
      {
        "name": "Natural Black (1B)",
        "hex": "#090909"
      },
      {
        "name": "Dark Chocolate (2)",
        "hex": "#231B19"
      },
      {
        "name": "Honey Blonde Highlights",
        "hex": "#D5B88A"
      }
    ],
    "image": "assets/lace_wig.png",
    "description": "The ultimate luxury wig. Our 22\" HD Lace Front Straight Wig features 100% ethically sourced Remy human hair with an ultra-thin HD lace that melts seamlessly into any skin tone.",
    "features": [
      "100% Remy Human Hair",
      "180% Density",
      "Pre-plucked natural hairline",
      "Can be colored and heat styled"
    ]
  },
  {
    "id": 9,
    "name": "HD Lace Front Body Wave Wig",
    "brand": "Nella Hair Couture",
    "category": "Hair & Wigs",
    "subcategory": "Wigs",
    "price": 920,
    "originalPrice": 920,
    "rating": 4.8,
    "reviews": 54,
    "sizes": [
      "24 Inches"
    ],
    "colors": [
      {
        "name": "Natural Black (1B)",
        "hex": "#090909"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Add effortless volume with Nella Hair Couture's Body Wave Wig. Featuring thick, luscious waves that hold their curl beautifully and feel incredibly soft.",
    "features": [
      "100% Remy Human Hair",
      "Pre-bleached knots",
      "Swiss HD Lace",
      "Glueless cap construction"
    ]
  },
  {
    "id": 10,
    "name": "Seamless Clip-In Hair Extensions",
    "brand": "Nella Hair Couture",
    "category": "Hair & Wigs",
    "subcategory": "Extensions",
    "price": 380,
    "originalPrice": 480,
    "rating": 4.7,
    "reviews": 112,
    "sizes": [
      "20 Inches",
      "22 Inches"
    ],
    "colors": [
      {
        "name": "Natural Black",
        "hex": "#090909"
      },
      {
        "name": "Chestnut Brown",
        "hex": "#5C3E35"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Instantly add length and volume with our Seamless Clip-In Hair Extensions. Made from premium human hair, these flat silicone bands lay completely flat against your scalp.",
    "features": [
      "7 pieces (120g total)",
      "Seamless silicone band",
      "Ethically sourced human hair",
      "Comfortable, damage-free clips"
    ]
  },
  {
    "id": 11,
    "name": "Crystal Embellished Hair Clips (Pack of 3)",
    "brand": "Nella Hair Couture",
    "category": "Hair & Wigs",
    "subcategory": "Hair Accessories",
    "price": 65,
    "originalPrice": 65,
    "rating": 4.6,
    "reviews": 29,
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Silver Crystal",
        "hex": "#EAEAEA"
      },
      {
        "name": "Gold Crystal",
        "hex": "#D4AF37"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Glam up your hairstyle with our Crystal Embellished Hair Clips. A set of three glittering bobby pins that add the perfect sparkle to any bridal or occasion look.",
    "features": [
      "Alloy metal base",
      "High-clarity glass crystals",
      "Snap closure clasp",
      "Includes velvet pouch"
    ]
  },
  {
    "id": 12,
    "name": "Aesthetic Matte Black Scented Candle",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Fragrances",
    "price": 75,
    "originalPrice": 95,
    "rating": 4.7,
    "reviews": 93,
    "sizes": [
      "300g"
    ],
    "colors": [
      {
        "name": "Oud Wood & Amber",
        "hex": "#1A1513"
      },
      {
        "name": "Fig & Vanilla",
        "hex": "#EAE0DA"
      }
    ],
    "image": "assets/coco_candle.png",
    "description": "Fill your space with cozy luxury. The COCO Scented Candle is hand-poured with premium soy wax in a gorgeous matte black ceramic container. Includes a wooden wick that crackles softly.",
    "features": [
      "Natural Soy Wax",
      "Wooden wick (crackling effect)",
      "55 hours burn time",
      "Phthalate-free fragrances"
    ]
  },
  {
    "id": 13,
    "name": "Luxury Oud Intense EDP Perfume",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Fragrances",
    "price": 295,
    "originalPrice": 380,
    "rating": 5,
    "reviews": 82,
    "sizes": [
      "100ml"
    ],
    "colors": [
      {
        "name": "Deep Gold",
        "hex": "#C5A059"
      }
    ],
    "image": "assets/cat_lifestyle.png",
    "description": "COCO Beauty's signature fragrance. Oud Intense is a rich, warm oriental scent blending rich Agarwood (Oud) with spicy Amber, Rose, and Vanilla notes. Long-lasting and premium.",
    "features": [
      "Eau de Parfum formulation",
      "Unisex scent notes",
      "Sleek glass bottle with magnetic cap",
      "High projection and sillage"
    ]
  },
  {
    "id": 14,
    "name": "Smart Aroma Diffuser & Humidifier",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Beauty Tools",
    "price": 185,
    "originalPrice": 250,
    "rating": 4.8,
    "reviews": 64,
    "sizes": [
      "500ml"
    ],
    "colors": [
      {
        "name": "Oak Wood & White",
        "hex": "#F0E0D0"
      }
    ],
    "image": "assets/cat_lifestyle.png",
    "description": "An elegant solution for home fragrance and wellness. This Smart Diffuser uses ultrasonic technology to create a cool, scented mist. Controllable via touch buttons and features soft LED glows.",
    "features": [
      "Ultrasonic mist technology",
      "Auto-off safety switch",
      "7 color ambient LED light",
      "Up to 10 hours continuous mist"
    ]
  },
  {
    "id": 15,
    "name": "Flawless Glow Hydrating Serum",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Skincare",
    "price": 145,
    "originalPrice": 145,
    "rating": 4.9,
    "reviews": 37,
    "sizes": [
      "50ml"
    ],
    "colors": [
      {
        "name": "Clear Serum",
        "hex": "#FFFFFF"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Transform your skin texture. Our Flawless Glow Hydrating Serum is infused with pure Hyaluronic Acid, Niacinamide, and organic Rose extract to deliver instant dewiness.",
    "features": [
      "Hyaluronic Acid + Niacinamide",
      "Locks in moisture for 24h",
      "Vegan and cruelty-free",
      "Fragrance-free formula"
    ]
  },
  {
    "id": 16,
    "name": "Velvet Matte Lipstick Duo",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Makeup",
    "price": 95,
    "originalPrice": 120,
    "rating": 4.7,
    "reviews": 58,
    "sizes": [
      "Set of 2"
    ],
    "colors": [
      {
        "name": "Nude Rose & Coral",
        "hex": "#C08081"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Luxurious color payoff with a weightless feel. The COCO Beauty Velvet Matte Lipstick Duo provides deep, smudge-proof pigment in two bestselling nude shades.",
    "features": [
      "Cream-to-matte transfer",
      "Infused with Jojoba Oil",
      "12-hour longwear",
      "Precision bullet applicators"
    ]
  },
  {
    "id": 17,
    "name": "Organic Shea & Almond Body Lotion",
    "brand": "COCO Beauty",
    "category": "Beauty",
    "subcategory": "Bath & Body",
    "price": 110,
    "originalPrice": 110,
    "rating": 4.8,
    "reviews": 18,
    "sizes": [
      "250ml"
    ],
    "colors": [
      {
        "name": "Creamy White",
        "hex": "#FCFAF2"
      }
    ],
    "image": "assets/cat_beauty.png",
    "description": "Deeply nourish dry skin with our organic Shea Butter and Sweet Almond Oil blend. Absorbs instantly without greasiness, leaving a soft sweet almond scent.",
    "features": [
      "100% Organic Shea Butter",
      "Cold-pressed Almond Oil",
      "Paraben-free",
      "Recyclable pump bottle"
    ]
  },
  {
    "id": 18,
    "name": "Organic Cotton Baby Romper",
    "brand": "COCO Mini",
    "category": "Kids & Baby",
    "subcategory": "Baby Clothing",
    "price": 85,
    "originalPrice": 110,
    "rating": 4.7,
    "reviews": 45,
    "sizes": [
      "0-3M",
      "3-6M",
      "6-12M",
      "12-18M"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#9CAF88"
      },
      {
        "name": "Soft Beige",
        "hex": "#EAE0DA"
      }
    ],
    "image": "assets/cat_lifestyle.png",
    "description": "Dress your little ones in ultimate softness. Crafted from 100% GOTS certified organic ribbed cotton, this romper features snap buttons for easy changes.",
    "features": [
      "100% GOTS Organic Cotton",
      "Ribbed knit weave",
      "Nickel-free snap buttons",
      "Hypoallergenic dyes"
    ]
  },
  {
    "id": 19,
    "name": "Luxury Plush Teddy Bear",
    "brand": "COCO Mini",
    "category": "Kids & Baby",
    "subcategory": "Toys",
    "price": 120,
    "originalPrice": 120,
    "rating": 4.9,
    "reviews": 31,
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Golden Honey",
        "hex": "#D4B483"
      }
    ],
    "image": "assets/cat_lifestyle.png",
    "description": "The perfect companion for your baby. This luxury teddy bear is hand-crafted with ultra-soft hypoallergenic fabrics and contains double-reinforced stitching.",
    "features": [
      "Hypoallergenic plush material",
      "Embroidered child-safe eyes",
      "30cm seated height",
      "Machine washable"
    ]
  },
  {
    "id": 20,
    "name": "Luxury Gold Gift Wrapping Set",
    "brand": "COCO Mini",
    "category": "Kids & Baby",
    "subcategory": "Gifts",
    "price": 45,
    "originalPrice": 45,
    "rating": 4.9,
    "reviews": 14,
    "sizes": [
      "Pack of 5"
    ],
    "colors": [
      {
        "name": "Champagne Gold",
        "hex": "#E5C185"
      }
    ],
    "image": "assets/cat_lifestyle.png",
    "description": "Wrap your baby shower or birthday gifts in absolute style. This set includes 5 sheets of heavy metallic gold wrapping paper, matching satin ribbons, and embossed card tags.",
    "features": [
      "Premium 100gsm paper",
      "Metallic foil accents",
      "Includes 10m satin ribbon",
      "Recyclable materials"
    ]
  },
  {
    "id": 21,
    "name": "Avenue Luxury Satin Bridal Gown",
    "brand": "Wedding Collection",
    "category": "Wedding",
    "subcategory": "Bridal Fashion",
    "price": 1800,
    "originalPrice": 2500,
    "rating": 5,
    "reviews": 28,
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      {
        "name": "Ivory White",
        "hex": "#FFFFF0"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Make your walk down the aisle unforgettable in our Avenue Luxury Satin Bridal Gown. Crafted from premium duchess satin with a structured corset bodice and an elegant sweep train.",
    "features": [
      "Duchess satin fabric",
      "Built-in corset support",
      "Sweep train with bustle loop",
      "Buttons down back zip closure"
    ]
  },
  {
    "id": 22,
    "name": "Regal Crystal Tiara & Veil Set",
    "brand": "Wedding Collection",
    "category": "Wedding",
    "subcategory": "Bridal Accessories",
    "price": 350,
    "originalPrice": 350,
    "rating": 4.9,
    "reviews": 12,
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Silver Diamond",
        "hex": "#EBF1F5"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Add royal sparkle to your hair. This set includes a hand-finished rhodium plated alloy tiara with AAA cubic zirconia crystals, and a double-tier soft tulle cathedral-length veil.",
    "features": [
      "Cathedral length veil (3m)",
      "Rhodium-plated AAA tiara",
      "Comb attachment on veil",
      "Includes designer display box"
    ]
  },
  {
    "id": 23,
    "name": "Crystal Embellished Bridal Heels",
    "brand": "Wedding Collection",
    "category": "Wedding",
    "subcategory": "Wedding Shoes",
    "price": 420,
    "originalPrice": 500,
    "rating": 4.8,
    "reviews": 23,
    "sizes": [
      "36",
      "37",
      "38",
      "39",
      "40"
    ],
    "colors": [
      {
        "name": "Satin White & Crystal",
        "hex": "#FAF8F6"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Gorgeous pointed-toe heels draped in silk satin and crowned with a brilliant crystal flower motif. Built with double-cushioned soles for day-to-night comfort.",
    "features": [
      "100mm heel height",
      "Cushioned memory foam insole",
      "Silk-satin upper",
      "Hand-set glass crystal embellishments"
    ]
  },
  {
    "id": 24,
    "name": "Classic White Rose Bridal Bouquet",
    "brand": "Wedding Collection",
    "category": "Wedding",
    "subcategory": "Flowers & Accessories",
    "price": 250,
    "originalPrice": 250,
    "rating": 4.7,
    "reviews": 15,
    "sizes": [
      "Standard"
    ],
    "colors": [
      {
        "name": "White & Emerald Green",
        "hex": "#E8F0E8"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "A gorgeous, hand-tied bouquet of fresh white roses, white ranunculus, and baby eucalyptus leaves, wrapped in premium white satin ribbon.",
    "features": [
      "Freshly cut flowers",
      "Standard 30cm dome diameter",
      "Satin ribbon wrap",
      "Hand-assembled by master florists"
    ]
  },
  {
    "id": 25,
    "name": "Avenue 13 Monogram Bomber Jacket",
    "brand": "13th Avenue",
    "category": "Exclusive Collections",
    "subcategory": "Limited Edition",
    "price": 420,
    "originalPrice": 550,
    "rating": 4.9,
    "reviews": 73,
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      {
        "name": "Black & Gold Monogram",
        "hex": "#111111"
      }
    ],
    "image": "assets/exclusive_jacket.png",
    "description": "A signature statement piece designed exclusively for 13th Avenue. Features a custom geometric monogram print, satin lining, embroidered details, and ribbed collar.",
    "features": [
      "Exclusive Monogram Print",
      "Water-resistant satin shell",
      "Polished metal zippers",
      "Limited edition numbering tag"
    ]
  },
  {
    "id": 26,
    "name": "Limited Edition Monogram Silk Scarf",
    "brand": "13th Avenue",
    "category": "Exclusive Collections",
    "subcategory": "Limited Edition",
    "price": 120,
    "originalPrice": 120,
    "rating": 4.8,
    "reviews": 21,
    "sizes": [
      "90x90cm"
    ],
    "colors": [
      {
        "name": "Signature Monogram",
        "hex": "#D4AF37"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "Crafted from 100% luxurious Mulberry silk, this limited edition scarf features the classic 13th Avenue monogram motif. Style it on your head, neck, or handbag.",
    "features": [
      "100% Mulberry Silk",
      "Hand-rolled hem edges",
      "90cm x 90cm square",
      "Comes in premium presentation box"
    ]
  },
  {
    "id": 27,
    "name": "Avenue 13 Luxury Leather Clutch",
    "brand": "13th Avenue",
    "category": "Exclusive Collections",
    "subcategory": "New Arrivals",
    "price": 260,
    "originalPrice": 260,
    "rating": 5,
    "reviews": 9,
    "sizes": [
      "One Size"
    ],
    "colors": [
      {
        "name": "Sleek Black & Gold",
        "hex": "#151515"
      }
    ],
    "image": "assets/cat_exclusive.png",
    "description": "A sleek, minimal envelope leather clutch designed exclusively for VIP collections. Features a solid gold 13 monogram hardware clasp.",
    "features": [
      "100% vegan calfskin leather",
      "Embossed interior numbering",
      "Card slots inside",
      "Detachable gold chain wrist strap"
    ]
  },
  {
    "id": 28,
    "name": "Juego Carmelita",
    "brand": "Miss Chlo\u00e9",
    "category": "Fashion",
    "subcategory": "",
    "price": 200,
    "originalPrice": 300,
    "rating": 4.5,
    "reviews": 0,
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      {
        "name": "Default",
        "hex": "#111111"
      }
    ],
    "image": "data:image/jpeg;base64,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",
    "description": "juego de blusa y pantalon carmelita",
    "features": [
      "Premium Collection"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
}

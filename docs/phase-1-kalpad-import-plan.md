# DIANSHANGMATS Phase 1 Kalpad Reference & Import Plan

This document records the first-phase plan for rebuilding DIANSHANGMATS as an English single-supplier B2B commerce website.

No production deployment, real payment, or GitHub submission should happen in this phase.

## 1. Current Local Project Status

Project path: `E:\dianshangmats`

Current stack:
- React 19 + Vite
- Express static server
- Single-page app routing in `src/main.jsx`
- Static CSS in `src/styles.css`
- Static assets in `public/images`

Current limitations:
- No database
- No admin backend
- No product CRUD
- No cart or checkout persistence
- No customer accounts
- No real inquiry submission storage
- No payment integration
- Product/category/content data is hardcoded in React

Conclusion: the current project can be used as visual/reference material, but the commerce version should be rebuilt as a Next.js + TypeScript + Tailwind + MySQL + Prisma application.

## 2. Reference Site Findings

Reference site: `https://www.kalpad.com/`

Observed major structure:
- Top language/login area
- Main navigation
- Products menu with category tree
- Home hero and core product recommendations
- Product center with sidebar category navigation
- Category pages
- Product/detail-like item pages
- Customization page
- About Us / factory profile
- News / Blog / Cases / FAQ sections
- Contact and inquiry forms
- Footer with links, product shortcuts, and contact information

Important DIANSHANGMATS replacement rules:
- Brand: `DIANSHANGMATS`
- Company: `Guangzhou DIANSHANG Rubber Products Co., Ltd.`
- Location: `Guangzhou, Guangdong, China`
- Email: `info@dianshangmats.com`
- Do not retain Kalpad brand, logo, domain, email, phone, original company name, or original contact names.

## 3. Target Page List

Frontend pages:
- Home
- Products
- Product Category
- Product Detail
- Customization
- OEM/ODM Services
- About Us
- Factory Capabilities
- Quality Control
- Cases
- Knowledge
- Article Detail
- FAQ
- Contact Us
- Request a Quote
- Cart
- Checkout
- Customer Account
- Order History
- Order Tracking
- Privacy Policy
- Terms and Conditions
- 404 Page

Admin pages:
- Admin Login
- Dashboard
- Product Management
- Category Management
- Attribute Management
- Image Management
- SKU Management
- Tiered Pricing
- MOQ Management
- Inventory Management
- Sales Mode Management
- Order Management
- Customer Management
- Inquiry Management
- Uploaded Design Files
- Shipping Quote Management
- Knowledge Article Management
- Homepage Content Management
- Factory Content Management
- Company Information Management
- Navigation Management
- SEO Management
- Review Status Management
- User Permissions
- Operation Logs

## 4. Product Category Plan

Primary product categories:
1. Office Mouse Pads
2. Flat Mouse Pads
3. Gaming Mouse Pads
4. Wrist Rests
5. Desk Mats
6. Placemats
7. Coasters
8. Game Mats

Reference-derived subcategories:

Office Mouse Pads:
- Wrist Rest Mouse Pad
- Gel Mouse Pad
- Memory Foam Mouse Pad
- Crystal Gel Mouse Pad
- Foam Mouse Pad
- Leather Mouse Pad Wrist Rest
- Cork Ergonomic Mouse Pad

Flat Mouse Pads:
- Rubber Mouse Pad
- PVC Mouse Pad
- EVA Mouse Pad
- Aluminum Mouse Pad
- Leather Mouse Pad
- Cork Flat Mouse Pad
- Rug Mouse Pad
- Charging Mouse Pad

Gaming Mouse Pads:
- Rubber Gaming Mouse Pad
- Poron Gaming Mouse Pad
- RGB Gaming Mouse Pad
- Charging Gaming Mouse Pad
- Glass Gaming Mouse Pad
- Resin Gaming Mouse Pad
- Aluminum Gaming Mouse Pad

Wrist Rests:
- Keyboard Wrist Rest
- Mouse Wrist Rest

Desk Mats:
- Desk Pad Set
- Cloth Desk Mat
- Leather Desk Mat
- Cork Desk Mat
- Felt Desk Mat
- Silicone Desk Mat
- Heated Desk Mat

DIANSHANGMATS-added subcategories:

Placemats:
- Rectangular Placemats
- Round Placemats
- Oval Placemats
- Teardrop Placemats
- Custom-Shaped Placemats
- Printed Placemats

Coasters:
- Individual Coasters
- Printed Coasters
- Coaster Sets
- Custom Coasters

Game Mats:
- Mahjong Mats
- Chess and Card Game Mats
- Sports-Themed Mats
- Board Game Mats
- Custom Game Mats

Attributes must be filters, not redundant categories:
- Material
- Surface Texture
- Shape
- Color
- Size
- Thickness
- Printing Method
- Logo Method
- Edge Finish
- Base Material
- Packaging
- MOQ
- Production Time

## 5. Homepage Module Plan

Homepage order:
1. Top Announcement Bar
2. Login / Account / Cart strip
3. Logo and Main Navigation
4. Hero Banner
5. Core Product Recommendations
6. Office Mouse Pad Solutions
7. Flat Mouse Pad Solutions
8. Gaming Mouse Pad Solutions
9. Wrist Rest Solutions
10. Desk Mat Solutions
11. Placemat Solutions
12. Coaster Solutions
13. Game Mat Solutions
14. Production Capabilities
15. Customization Capabilities
16. Quality Assurance
17. About DIANSHANGMATS
18. OEM/ODM Process
19. Application Industries
20. Featured Products
21. Customer Cases
22. Knowledge Articles
23. Quick Inquiry Form
24. Footer

Homepage headline:
`Custom Mats, Mouse Pads and Desk Accessories Manufacturer`

Homepage subheadline:
`One-Stop OEM and ODM Solutions for Mouse Pads, Desk Mats, Placemats, Coasters, Wrist Rests and Custom Game Mats.`

Primary CTAs:
- View Products
- Get Factory Quote
- Order a Sample
- Start Your Custom Project

## 6. Content Import Rules

Allowed reference content types:
- Product names
- Product images
- Product gallery images
- Product descriptions
- Specifications
- Materials
- Sizes
- Thickness
- MOQ
- Production time
- Packaging
- Factory descriptions
- Production capabilities
- Factory statistics
- Quality control text
- FAQ structure
- Blog structure
- Case structure

Every imported content record must include:
- `contentSource: "kalpad"`
- `needsReview: true`

Imported content must be stored in the database or independent seed/config files. It must not be embedded directly inside page components.

## 7. Image Import Rules

Rules:
- Do not use remote hotlinked images.
- Download selected images locally.
- Convert to WebP.
- Use English SEO filenames.
- Product/category/related images must be strict 1:1 square images.
- Avoid stretching and severe cropping.
- Do not use unrelated fashion/leather bag images.

Suggested local structure:
- `public/uploads/products`
- `public/uploads/categories`
- `public/uploads/factory`
- `public/uploads/blog`
- `public/uploads/cases`
- `public/uploads/temp-import`

Recommended filename pattern:
- `office-mouse-pad-gel-wrist-rest-main.webp`
- `desk-mat-leather-brown-square-category.webp`
- `placemat-round-pu-leather-black-main.webp`
- `factory-rubber-foam-production-line.webp`

## 8. Sales Mode Plan

Each product must support:
- `DIRECT_PURCHASE`
- `QUOTE_ONLY`
- `BOTH`

Direct Purchase is for:
- Samples
- Standard products
- Stock products
- Small orders

Quote Only is for:
- Custom printing
- Custom size
- Custom shape
- Custom logo
- Custom packaging
- Large wholesale orders

Both means:
- Show price, quantity, Add to Cart, Buy Now, Order a Sample
- Also show Contact Supplier, Request a Quote, Send Inquiry, Upload Your Design

## 9. Product Detail Data Plan

Product fields:
- Product Name
- Model Number
- Main Category
- Subcategory
- Secondary Categories
- Tags
- Material
- Surface Material
- Base Material
- Surface Texture
- Shape
- Color
- Size
- Custom Size
- Thickness
- Printing Method
- Logo Method
- Edge Finish
- Packaging
- MOQ
- Sample Price
- Tiered Pricing
- Production Time
- Inventory
- Sales Mode
- Product Status
- Product Images
- Product Video
- SEO Title
- Meta Description
- Image Alt Text
- Content Source
- Needs Review

Tiered pricing:
- 10-49 Pieces
- 50-199 Pieces
- 200-499 Pieces
- 500+ Pieces

## 10. Database Model Draft

Core tables:
- `users`
- `admin_users`
- `customers`
- `categories`
- `attributes`
- `attribute_values`
- `products`
- `product_variants`
- `product_images`
- `tiered_prices`
- `inventory_movements`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `payments`
- `inquiries`
- `inquiry_files`
- `articles`
- `cases`
- `faqs`
- `navigation_items`
- `site_settings`
- `seo_records`
- `email_logs`
- `operation_logs`

Important enums:
- `SalesMode`: `DIRECT_PURCHASE`, `QUOTE_ONLY`, `BOTH`
- `ProductStatus`: `DRAFT`, `ACTIVE`, `HIDDEN`, `ARCHIVED`
- `OrderStatus`: `PENDING`, `AWAITING_PAYMENT`, `AWAITING_SHIPPING_QUOTE`, `PAID`, `PROCESSING`, `SAMPLE_PRODUCTION`, `MASS_PRODUCTION`, `SHIPPED`, `COMPLETED`, `CANCELLED`
- `InquiryStatus`: `NEW`, `CONTACTED`, `QUOTED`, `SAMPLE_PROCESSING`, `PRODUCTION`, `COMPLETED`, `CLOSED`
- `PaymentMethod`: `PAYPAL`, `CREDIT_CARD`, `BANK_TRANSFER`

## 11. Technical Migration Plan

Target stack:
- Next.js
- TypeScript
- Tailwind CSS
- MySQL
- Prisma ORM
- Secure admin authentication
- Responsive design
- Hostinger Node.js Web App compatible

Hostinger compatibility notes:
- Avoid Vercel-only features.
- Use environment variables for all secrets.
- Keep build/start commands explicit.
- Use external/persistent MySQL for production data.
- Use local filesystem only for development uploads unless Hostinger storage behavior is confirmed.
- Prefer cloud/object storage for production uploads.

## 12. Phase 2 Development Sequence

1. Create a new local Next.js project structure.
2. Add TypeScript and Tailwind.
3. Add Prisma and MySQL schema.
4. Build seed/config files for categories, homepage content, company info, navigation, and SEO.
5. Build public frontend layout and navigation.
6. Build Products mega menu.
7. Build product category and product detail pages.
8. Build cart and checkout pages in test mode only.
9. Build request quote and inquiry storage.
10. Build admin authentication.
11. Build admin product/category/order/customer/inquiry management.
12. Add Knowledge/Cases/FAQ management.
13. Add sitemap, robots, schema, Open Graph metadata.
14. Add README, `.env.example`, and Hostinger deployment notes.

## 13. Phase 3 Verification Plan

Check:
- Desktop layout
- Tablet layout
- Mobile layout
- Mega menu
- Product category links
- Product detail links
- Cart flow
- Checkout test flow
- Inquiry submission
- File upload placeholder/flow
- Admin login
- Admin CRUD pages
- Order states
- Email notification test mode
- SEO metadata
- `npm run build`

## 14. Immediate Next Step

Before starting Phase 2, confirm one implementation direction:

Recommended direction:
- Keep `E:\dianshangmats` as the project root.
- Replace the current React/Vite project with a Next.js + TypeScript + Tailwind + Prisma structure.
- Preserve current images and useful visual sections as local reference assets.
- Do not deploy, push, or enable real payment until local review is approved.

Alternative direction:
- Create a sibling folder such as `E:\dianshangmats-next` for the new commerce build and leave the current Vite project untouched.


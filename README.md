# ReCloset MERN Marketplace

ReCloset is a responsive second-hand clothing marketplace inspired by Myntra. Users can browse a large preloaded catalog, sell pre-loved clothes, and submit donation listings.

## Features

- Responsive React storefront with hero, filters, catalog grid, sell form, and donation form.
- Express API with product and donation routes.
- MongoDB models for products and donations.
- Seed generator for 144 unique clothing listings across women, men, kids, footwear, accessories, and donation sections.
- Duplicate image protection using `imageHashes` before approving new listings.
- Fallback in-memory catalog when MongoDB is not running, useful for quick UI demos.

## Tech Stack

- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Project Structure

```text
client/
  src/main.jsx
  src/styles.css
server/
  src/data/products.js
  src/models/Product.js
  src/models/Donation.js
  src/routes/products.js
  src/routes/donations.js
  src/server.js
```

## Setup

Install dependencies:

```bash
npm run install:all
```

Create server environment file:

```bash
cp server/.env.example server/.env
```

Start MongoDB locally, then seed the catalog:

```bash
npm run seed
```

Run the full app:

```bash
npm run dev
```

Open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api/health
```

## MVP Next Steps

- Add authentication for buyers, sellers, donors, NGOs, and admins.
- Add admin approval screens for pending seller and donation listings.
- Add cart, checkout, payments, and order tracking.
- Replace URL-based image input with Cloudinary uploads.
- Add perceptual image hashing for stronger duplicate-image detection.

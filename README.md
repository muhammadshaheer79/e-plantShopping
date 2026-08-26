# e-plantShopping

**Paradise Nursery** — the front end of a houseplant shopping application, built with React, Vite and Redux Toolkit.

## Overview

Paradise Nursery lets visitors browse a curated catalog of real houseplants and build a shopping cart before checkout. The app has three surfaces:

- **Landing page** — background greenhouse image, the company name, a paragraph about the company (About Us) and a **Get Started** button that opens the product listing.
- **Product listing page** — nine houseplants grouped into four categories (Air Purifying, Aromatic Fragrant, Medicinal and Low Maintenance), each with a real plant photo, name, description, price and an **Add to Cart** button that disables itself once the plant is added.
- **Shopping cart page** — every plant in the cart with its thumbnail, name, unit price, quantity controls, per-item subtotal and a delete button, plus the total number of plants, the total cart amount, **Continue Shopping** and **Checkout**.

A header on the listing and cart pages provides Home / Plants / Cart navigation and a shopping cart icon whose badge updates dynamically with the total number of items.

## State management

Cart state lives in a Redux store (`src/store.js`) built from `CartSlice.jsx`, which exposes the `addItem`, `removeItem` and `updateQuantity` reducers. The app is wrapped in `<Provider store={store}>` so every component can read and update the cart.

## Run locally

```bash
npm install
npm run dev
```
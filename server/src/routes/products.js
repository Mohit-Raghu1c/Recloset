import express from "express";
import mongoose from "mongoose";
import { randomUUID } from "crypto";
import Product from "../models/Product.js";
import { buildSeedProducts } from "../data/products.js";

const router = express.Router();
const fallbackProducts = buildSeedProducts();

function hasDatabase() {
  return mongoose.connection.readyState === 1;
}

function normalizeQuery(query) {
  const filter = { status: "approved" };
  ["gender", "category", "subcategory", "condition", "size", "listingType"].forEach((field) => {
    if (query[field] && query[field] !== "All") filter[field] = query[field];
  });
  if (query.search) {
    filter.$or = [
      { title: new RegExp(query.search, "i") },
      { brand: new RegExp(query.search, "i") },
      { category: new RegExp(query.search, "i") }
    ];
  }
  return filter;
}

router.get("/", async (req, res, next) => {
  try {
    const filter = normalizeQuery(req.query);
    const sort = req.query.sort === "price-low" ? { price: 1 } : req.query.sort === "price-high" ? { price: -1 } : { createdAt: -1 };

    if (!hasDatabase()) {
      let products = fallbackProducts.filter((product) =>
        Object.entries(filter).every(([key, value]) => {
          if (key === "$or") return value.some((rule) => Object.entries(rule)[0][1].test(product[Object.entries(rule)[0][0]]));
          return product[key] === value;
        })
      );
      if (req.query.sort === "price-low") products = products.sort((a, b) => a.price - b.price);
      if (req.query.sort === "price-high") products = products.sort((a, b) => b.price - a.price);
      return res.json(products);
    }

    const products = await Product.find(filter).sort(sort).limit(240);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/featured", async (_req, res, next) => {
  try {
    if (!hasDatabase()) return res.json(fallbackProducts.slice(0, 24));
    const products = await Product.find({ status: "approved" }).sort({ createdAt: -1 }).limit(24);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const payload = { ...req.body, status: "pending", listingType: req.body.isDonation ? "donation" : "seller" };
    const hashes = payload.imageHashes || [];

    if (hasDatabase() && hashes.length) {
      const duplicate = await Product.findOne({ imageHashes: { $in: hashes } });
      if (duplicate) return res.status(409).json({ message: "This image already exists in another listing." });
    }

    if (!hasDatabase()) {
      const product = { ...payload, _id: randomUUID(), createdAt: new Date().toISOString() };
      fallbackProducts.unshift(product);
      return res.status(201).json(product);
    }

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

export default router;

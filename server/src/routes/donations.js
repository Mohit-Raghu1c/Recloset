import express from "express";
import { randomUUID } from "crypto";
import Donation from "../models/Donation.js";

const router = express.Router();
const fallbackDonations = [];

router.get("/", async (_req, res, next) => {
  try {
    if (Donation.db.readyState !== 1) return res.json(fallbackDonations);
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(100);
    res.json(donations);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (Donation.db.readyState !== 1) {
      const donation = { ...req.body, _id: randomUUID(), createdAt: new Date().toISOString() };
      fallbackDonations.unshift(donation);
      return res.status(201).json(donation);
    }
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
});

export default router;

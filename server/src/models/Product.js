import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, required: true, index: true },
    gender: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    size: { type: String, required: true, index: true },
    color: { type: String, required: true },
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Used"],
      default: "Good",
      index: true
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    imageHashes: [{ type: String, required: true, unique: true, sparse: true }],
    sellerName: { type: String, default: "ReCloset Curated" },
    listingType: {
      type: String,
      enum: ["seed", "seller", "donation"],
      default: "seed",
      index: true
    },
    location: { type: String, default: "India" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "sold"],
      default: "approved",
      index: true
    },
    isDonation: { type: Boolean, default: false, index: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const donationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    ngoName: { type: String, default: "Awaiting NGO match" },
    title: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    condition: {
      type: String,
      enum: ["New", "Like New", "Good", "Used"],
      default: "Good"
    },
    pickupAddress: { type: String, required: true },
    pickupStatus: {
      type: String,
      enum: ["requested", "scheduled", "picked", "received"],
      default: "requested"
    },
    donationStatus: {
      type: String,
      enum: ["open", "accepted", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);

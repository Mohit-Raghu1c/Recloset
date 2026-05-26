import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import productsRouter from "./routes/products.js";
import donationsRouter from "./routes/donations.js";

const app = express();
const port = process.env.PORT || 5000;

await connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "ReCloset API" });
});

app.use("/api/products", productsRouter);
app.use("/api/donations", donationsRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Something went wrong" });
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

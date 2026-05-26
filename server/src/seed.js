import "dotenv/config";
import { connectDB } from "./db.js";
import Product from "./models/Product.js";
import { buildSeedProducts } from "./data/products.js";

const connected = await connectDB();

if (!connected) {
  console.error("Cannot seed without MongoDB. Set MONGO_URI and start MongoDB first.");
  process.exit(1);
}

const products = buildSeedProducts(144);
await Product.deleteMany({ listingType: "seed" });
await Product.insertMany(products, { ordered: false });

console.log(`Seeded ${products.length} unique clothing listings.`);
process.exit(0);

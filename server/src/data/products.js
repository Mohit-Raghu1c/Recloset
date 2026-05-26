const categories = [
  { gender: "Women", category: "Ethnic Wear", subcategories: ["Kurtas", "Sarees", "Lehengas", "Dupattas"] },
  { gender: "Women", category: "Western Wear", subcategories: ["Dresses", "Tops", "Jeans", "Skirts"] },
  { gender: "Men", category: "Casual Wear", subcategories: ["Shirts", "T-shirts", "Jeans", "Hoodies"] },
  { gender: "Men", category: "Formal Wear", subcategories: ["Blazers", "Trousers", "Formal Shirts", "Waistcoats"] },
  { gender: "Kids", category: "Kids Wear", subcategories: ["Party Wear", "School Wear", "Winter Wear", "Festive Wear"] },
  { gender: "Unisex", category: "Accessories", subcategories: ["Bags", "Scarves", "Caps", "Belts"] },
  { gender: "Unisex", category: "Footwear", subcategories: ["Sneakers", "Sandals", "Heels", "Loafers"] },
  { gender: "Unisex", category: "Donation", subcategories: ["Daily Wear", "Winter Kits", "School Kits", "Baby Clothes"] }
];

const brands = ["H&M", "Zara", "Roadster", "Biba", "Levis", "Mast & Harbour", "Nike", "Adidas", "FabIndia", "Max"];
const colors = ["Black", "White", "Blue", "Pink", "Green", "Maroon", "Beige", "Yellow", "Navy", "Lavender"];
const conditions = ["New", "Like New", "Good", "Used"];
const cities = ["Delhi", "Mumbai", "Bengaluru", "Pune", "Jaipur", "Indore", "Hyderabad", "Chennai"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

function imageUrl(index, gender, category, subcategory) {
  const query = encodeURIComponent(`${gender} ${subcategory} ${category} fashion clothing`);
  return `https://source.unsplash.com/720x960/?${query}&sig=recloset-${index}`;
}

function imageHash(url) {
  return Buffer.from(url).toString("base64url").slice(0, 36);
}

export function buildSeedProducts(count = 144) {
  return Array.from({ length: count }, (_, index) => {
    const group = categories[index % categories.length];
    const subcategory = group.subcategories[index % group.subcategories.length];
    const isDonation = group.category === "Donation" || index % 11 === 0;
    const price = isDonation ? 0 : 199 + ((index * 83) % 1800);
    const originalPrice = isDonation ? 0 : Math.round(price * (1.8 + (index % 4) * 0.2));
    const image = imageUrl(index + 1, group.gender, group.category, subcategory);

    return {
      title: `${brands[index % brands.length]} ${colors[index % colors.length]} ${subcategory}`,
      description: `Pre-loved ${subcategory.toLowerCase()} in ${conditions[index % conditions.length].toLowerCase()} condition, quality checked for ReCloset buyers.`,
      category: group.category,
      subcategory,
      gender: group.gender,
      brand: brands[index % brands.length],
      size: sizes[index % sizes.length],
      color: colors[index % colors.length],
      condition: conditions[index % conditions.length],
      price,
      originalPrice,
      discountPercent: isDonation ? 100 : Math.round(((originalPrice - price) / originalPrice) * 100),
      images: [image],
      imageHashes: [imageHash(image)],
      sellerName: isDonation ? "Community Donation Drive" : "ReCloset Curated",
      listingType: isDonation ? "donation" : index % 5 === 0 ? "seller" : "seed",
      location: cities[index % cities.length],
      status: "approved",
      isDonation
    };
  });
}

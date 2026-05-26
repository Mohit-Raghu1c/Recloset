import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const filters = {
  gender: ["All", "Women", "Men", "Kids", "Unisex"],
  category: ["All", "Ethnic Wear", "Western Wear", "Casual Wear", "Formal Wear", "Kids Wear", "Accessories", "Footwear", "Donation"],
  condition: ["All", "New", "Like New", "Good", "Used"],
  size: ["All", "XS", "S", "M", "L", "XL", "XXL", "Free Size"]
};

const imagePool = [
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1506629905607-d9c297d8f5f0?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=700&q=85"
];

const imageBySubcategory = {
  Kurtas: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85",
  Sarees: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=85",
  Dresses: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85",
  Jackets: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=85",
  Jeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
  Shirts: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85",
  Hoodies: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85",
  Blazers: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=85",
  "Party Wear": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=85",
  "School Kits": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=700&q=85",
  "Winter Kits": "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=700&q=85",
  Sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  Bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  Dupattas: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85",
  "T-shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  "Baby Clothes": "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=700&q=85",
  Lehengas: "https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&fit=crop&w=700&q=85",
  Trousers: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85",
  "Winter Wear": "https://images.unsplash.com/photo-1542319630-55fb7f7c944a?auto=format&fit=crop&w=700&q=85",
  Heels: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
  Skirts: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?auto=format&fit=crop&w=700&q=85",
  Loafers: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=700&q=85",
  Scarves: "https://images.unsplash.com/photo-1601762603339-fd61e28b698a?auto=format&fit=crop&w=700&q=85"
};

const ngoPartners = [
  { name: "Udaan Foundation", city: "Delhi", need: "School uniforms and kids winter wear", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80" },
  { name: "Sewa Closet", city: "Mumbai", need: "Sarees, kurtas, blankets and footwear", image: "https://images.unsplash.com/photo-1469571486292-b53601020a30?auto=format&fit=crop&w=700&q=80" },
  { name: "Care Thread Trust", city: "Bengaluru", need: "Baby clothes and daily wear bundles", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=700&q=80" },
  { name: "Warm Hands NGO", city: "Pune", need: "Jackets, hoodies, socks and shoes", image: "https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?auto=format&fit=crop&w=700&q=80" }
];

const productBlueprints = [
  ["Biba Rose Kurta", "Women", "Ethnic Wear", "Kurtas", "M", "Like New", 499],
  ["FabIndia Cotton Saree", "Women", "Ethnic Wear", "Sarees", "Free Size", "Good", 799],
  ["Zara Evening Dress", "Women", "Western Wear", "Dresses", "S", "Like New", 899],
  ["H&M Denim Jacket", "Women", "Western Wear", "Jackets", "M", "Good", 699],
  ["Levis Slim Jeans", "Men", "Casual Wear", "Jeans", "L", "Good", 599],
  ["Roadster Checked Shirt", "Men", "Casual Wear", "Shirts", "M", "Like New", 349],
  ["Nike Training Hoodie", "Men", "Casual Wear", "Hoodies", "XL", "Good", 749],
  ["Mast Formal Blazer", "Men", "Formal Wear", "Blazers", "L", "Like New", 1199],
  ["Kids Party Frock", "Kids", "Kids Wear", "Party Wear", "S", "Good", 299],
  ["School Uniform Set", "Kids", "Donation", "School Kits", "M", "Good", 0],
  ["Winter Jacket Bundle", "Unisex", "Donation", "Winter Kits", "L", "Good", 0],
  ["Adidas White Sneakers", "Unisex", "Footwear", "Sneakers", "XL", "Like New", 999],
  ["Leather Office Bag", "Unisex", "Accessories", "Bags", "Free Size", "Good", 499],
  ["Silk Dupatta Set", "Women", "Ethnic Wear", "Dupattas", "Free Size", "New", 249],
  ["Cotton T-shirt Pack", "Men", "Casual Wear", "T-shirts", "M", "Good", 299],
  ["Baby Clothes Set", "Kids", "Donation", "Baby Clothes", "XS", "Like New", 0],
  ["Party Lehenga", "Women", "Ethnic Wear", "Lehengas", "S", "Like New", 1499],
  ["Formal Trouser", "Men", "Formal Wear", "Trousers", "M", "Good", 399],
  ["Girls Winter Coat", "Kids", "Kids Wear", "Winter Wear", "M", "Good", 449],
  ["Women Heels", "Unisex", "Footwear", "Heels", "M", "Good", 399],
  ["Streetwear Overshirt", "Men", "Casual Wear", "Shirts", "XL", "Used", 279],
  ["Pastel Skirt", "Women", "Western Wear", "Skirts", "S", "Like New", 329],
  ["Canvas Loafers", "Unisex", "Footwear", "Loafers", "L", "Good", 549],
  ["Warm Scarf Bundle", "Unisex", "Accessories", "Scarves", "Free Size", "Good", 199]
];

const categoryTiles = [
  { title: "Women Ethnic", category: "Ethnic Wear", gender: "Women", image: imagePool[1] },
  { title: "Men Casual", category: "Casual Wear", gender: "Men", image: imagePool[5] },
  { title: "Kids Closet", category: "Kids Wear", gender: "Kids", image: imagePool[10] },
  { title: "Donation Picks", category: "Donation", gender: "All", image: imagePool[6] },
  { title: "Footwear", category: "Footwear", gender: "All", image: imagePool[8] },
  { title: "Accessories", category: "Accessories", gender: "All", image: imagePool[12] }
];

const impactCards = [
  { value: "12K+", label: "clothes ready for reuse" },
  { value: "48", label: "verified NGO partners" },
  { value: "31", label: "cities with pickup support" }
];

const donationNeeds = ["School uniforms", "Winter jackets", "Baby clothes", "Sarees and kurtas", "Shoes", "Blankets"];

function realProductImage(product, index) {
  const baseUrl = imageBySubcategory[product.subcategory] || imagePool[index % imagePool.length];
  return `${baseUrl}&sig=recloset-real-${index}`;
}

function buildLocalProducts() {
  return Array.from({ length: 72 }, (_, index) => {
    const item = productBlueprints[index % productBlueprints.length];
    const price = item[6];
    const product = {
      _id: `local-${index}`,
      title: `${item[0]} ${index > 23 ? `Drop ${Math.floor(index / 24) + 1}` : ""}`.trim(),
      description: "Quality checked pre-loved clothing with clear condition details.",
      gender: item[1],
      category: item[2],
      subcategory: item[3],
      brand: item[0].split(" ")[0],
      size: item[4],
      condition: item[5],
      color: ["Pink", "Black", "Blue", "Cream", "Green", "Navy"][index % 6],
      price,
      originalPrice: price === 0 ? 0 : Math.round(price * 1.9),
      images: [],
      imageHashes: [`local-hash-${index}`],
      location: ["Delhi", "Mumbai", "Pune", "Jaipur", "Bengaluru", "Indore"][index % 6],
      status: index % 17 === 0 ? "pending" : "approved",
      sellerName: price === 0 ? "Community Donation Drive" : "ReCloset Curated",
      ngoName: price === 0 ? ngoPartners[index % ngoPartners.length].name : "",
      isDonation: price === 0 || item[2] === "Donation",
      listingType: price === 0 || item[2] === "Donation" ? "donation" : index % 4 === 0 ? "seller" : "seed"
    };
    return { ...product, images: [realProductImage(product, index)] };
  });
}

function currency(value) {
  return value === 0 ? "Donate" : `Rs. ${Number(value).toLocaleString("en-IN")}`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function App() {
  const [products, setProducts] = useState(buildLocalProducts);
  const [query, setQuery] = useState({ gender: "All", category: "All", condition: "All", size: "All", sort: "newest", search: "" });
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [formType, setFormType] = useState(window.location.pathname === "/donate" ? "donate" : "sell");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(ngoPartners[0].name);
  const [message, setMessage] = useState("Loaded demo catalog so the shop never appears empty.");

  useEffect(() => {
    const syncPath = () => {
      const path = window.location.pathname;
      setActivePath(path);
      if (path === "/donate") setFormType("donate");
      if (path === "/sell") setFormType("sell");
      if (path === "/cart") setCartOpen(true);
      if (path === "/login") {
        setAuthMode("login");
        setAuthOpen(true);
      }
      if (path === "/signup") {
        setAuthMode("signup");
        setAuthOpen(true);
      }
    };
    window.addEventListener("popstate", syncPath);
    syncPath();
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("API unavailable")))
      .then((apiProducts) => {
        if (Array.isArray(apiProducts) && apiProducts.length) {
          setProducts([...buildLocalProducts(), ...apiProducts]);
          setMessage("Live API catalog plus demo inventory loaded.");
        }
      })
      .catch(() => setMessage("Using built-in catalog. Start MongoDB/API later for saved data."));
  }, []);

  const visibleProducts = useMemo(() => {
    const search = query.search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      if (["rejected", "removed"].includes(product.status)) return false;
      if (query.gender !== "All" && product.gender !== query.gender) return false;
      if (query.category !== "All" && product.category !== query.category) return false;
      if (query.condition !== "All" && product.condition !== query.condition) return false;
      if (query.size !== "All" && product.size !== query.size) return false;
      if (!search) return true;
      return [product.title, product.brand, product.category, product.subcategory, product.location].join(" ").toLowerCase().includes(search);
    });
    if (query.sort === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (query.sort === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, query]);

  const donationProducts = useMemo(() => products.filter((product) => product.isDonation && product.status !== "rejected").slice(0, 8), [products]);
  const pendingProducts = products.filter((product) => product.status === "pending");
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const stats = useMemo(() => {
    const approved = products.filter((product) => product.status !== "rejected");
    return [
      { label: "Unique listings", value: approved.length },
      { label: "Donation picks", value: approved.filter((product) => product.isDonation).length },
      { label: "Cart items", value: cart.length }
    ];
  }, [products, cart.length]);

  function navigate(event, path) {
    event.preventDefault();
    window.history.pushState({}, "", path);
    setActivePath(path);
    if (path === "/donate") setFormType("donate");
    if (path === "/sell") setFormType("sell");
    if (path === "/cart") setCartOpen(true);
    if (path === "/login") {
      setAuthMode("login");
      setAuthOpen(true);
    }
    if (path === "/signup") {
      setAuthMode("signup");
      setAuthOpen(true);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeUtilityModal() {
    setCartOpen(false);
    setAuthOpen(false);
    setCheckoutOpen(false);
    if (["/cart", "/login", "/signup"].includes(window.location.pathname)) {
      window.history.pushState({}, "", "/shop");
      setActivePath("/shop");
    }
  }

  function requireAuth(action) {
    if (user) return true;
    setAuthMode("signup");
    setAuthOpen(true);
    setMessage(`Create an account to ${action}.`);
    return false;
  }

  function pickCategory(tile) {
    setQuery((current) => ({ ...current, category: tile.category, gender: tile.gender }));
    window.history.pushState({}, "", "/shop");
    setActivePath("/shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product) {
    if (product.isDonation) {
      setSelectedNgo(product.ngoName || ngoPartners[0].name);
      setMessage("Donation item selected. Choose an NGO and submit your donation details.");
      window.history.pushState({}, "", "/donate");
      setActivePath("/donate");
      setFormType("donate");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!requireAuth("shop")) return;
    setCart((current) => [...current, product]);
    setCartOpen(true);
    setMessage(`${product.title} added to cart.`);
  }

  function submitAuth(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setUser({ name: form.get("name") || form.get("email").split("@")[0], email: form.get("email") });
    setAuthOpen(false);
    setMessage("Account active. Shopping, selling and donating are unlocked.");
  }

  async function submitListing(event) {
    event.preventDefault();
    if (!requireAuth(formType === "donate" ? "donate clothes" : "sell clothes")) return;
    const form = new FormData(event.currentTarget);
    const imageUrl = form.get("imageUrl");
    const imageFile = form.get("imageFile");
    const uploadedImage = imageFile && imageFile.size ? await fileToDataUrl(imageFile) : "";
    const draft = {
      brand: form.get("brand") || "Community",
      category: form.get("category"),
      subcategory: form.get("subcategory")
    };
    const image = uploadedImage || imageUrl || realProductImage(draft, Date.now());
    const payload = {
      _id: `user-${Date.now()}`,
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      subcategory: form.get("subcategory"),
      gender: form.get("gender"),
      brand: draft.brand,
      size: form.get("size"),
      color: form.get("color"),
      condition: form.get("condition"),
      price: formType === "donate" ? 0 : Number(form.get("price")),
      originalPrice: formType === "donate" ? 0 : Number(form.get("originalPrice")),
      images: [image],
      imageHashes: [btoa(image).slice(0, 36)],
      sellerName: user.name,
      ngoName: form.get("ngoName") || selectedNgo,
      location: form.get("location"),
      isDonation: formType === "donate",
      listingType: formType === "donate" ? "donation" : "seller",
      status: "pending"
    };
    setProducts((current) => [payload, ...current]);
    fetch(`${API_URL}/products`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
    setMessage(formType === "donate" ? "Donation sent to admin for approval." : "Listing sent to admin for approval.");
    event.currentTarget.reset();
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!requireAuth("checkout")) return;
    setCart([]);
    setCartOpen(false);
    setCheckoutOpen(false);
    setMessage("Order placed. Checkout now clears the cart and confirms the order.");
  }

  function updateProductStatus(productId, status) {
    setProducts((items) => items.map((item) => item._id === productId ? { ...item, status } : item));
    setMessage(`Item marked as ${status}.`);
  }

  function removeProduct(productId) {
    setProducts((items) => items.map((item) => item._id === productId ? { ...item, status: "removed" } : item));
    setCart((items) => items.filter((item) => item._id !== productId));
    setMessage("Item removed from marketplace.");
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="/" onClick={(event) => navigate(event, "/")}>ReCloset</a>
        <nav>
          <a href="/shop" onClick={(event) => navigate(event, "/shop")}>Shop</a>
          <a href="/donate" onClick={(event) => navigate(event, "/donate")}>Donate</a>
          <a href="/sell" onClick={(event) => navigate(event, "/sell")}>Sell</a>
          <a href="/admin" onClick={(event) => navigate(event, "/admin")}>Admin</a>
        </nav>
        <div className="top-actions">
          <a href="/cart" onClick={(event) => navigate(event, "/cart")}>Cart {cart.length}</a>
          <a href="/login" onClick={(event) => navigate(event, "/login")}>{user ? user.name : "Login"}</a>
        </div>
      </header>

      {message && <button className="notice global-notice" onClick={() => setMessage("")}>{message}</button>}

      {activePath === "/" && (
        <>
          <section className="hero home-hero">
            <div className="hero-copy">
              <p className="eyebrow">Second-hand fashion marketplace</p>
              <h1>Buy, sell, and donate clothes in one full closet.</h1>
              <p>Browse a stocked catalog, add items to cart, login to sell, and donate clothes through verified NGO flows.</p>
              <div className="actions">
                <a className="primary" href="/shop" onClick={(event) => navigate(event, "/shop")}>Browse clothes</a>
                <a className="secondary" href="/sell" onClick={(event) => navigate(event, "/sell")}>List an item</a>
              </div>
            </div>
          </section>
          <Stats stats={stats} />
          <CategoryRail pickCategory={pickCategory} />
          <ProductSection title="Trending now" products={visibleProducts.slice(0, 12)} addToCart={addToCart} />
        </>
      )}

      {activePath === "/donate" && (
        <>
          <section className="donate-hero">
            <div className="donate-copy">
              <p className="eyebrow">Donation marketplace</p>
              <h1>Give clothes a second life with verified donation pickups.</h1>
              <p>Choose an NGO, submit clothes with a URL or device photo, and track approval through the admin panel.</p>
              <div className="actions">
                <a className="primary" href="#list">Start donation</a>
                <button className="secondary" onClick={() => requireAuth("donate clothes")}>Login to donate</button>
              </div>
            </div>
            <div className="impact-panel">{impactCards.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div>
          </section>
          <DonationStory />
          <ProductSection title="Donation items already listed" products={donationProducts} addToCart={addToCart} />
          <NgoSection selectedNgo={selectedNgo} setSelectedNgo={setSelectedNgo} />
          <ListingForm formType={formType} selectedNgo={selectedNgo} submitListing={submitListing} navigate={navigate} />
        </>
      )}

      {activePath === "/shop" && (
        <>
          <CategoryRail pickCategory={pickCategory} compact />
          <ShopLayout query={query} setQuery={setQuery} products={visibleProducts} addToCart={addToCart} />
        </>
      )}

      {activePath === "/sell" && <ListingForm formType={formType} selectedNgo={selectedNgo} submitListing={submitListing} navigate={navigate} />}

      {activePath === "/admin" && <AdminPage products={products} cart={cart} updateProductStatus={updateProductStatus} removeProduct={removeProduct} />}

      {cartOpen && <CartDrawer cart={cart} setCart={setCart} cartTotal={cartTotal} close={closeUtilityModal} checkout={() => setCheckoutOpen(true)} />}
      {checkoutOpen && <CheckoutModal cartTotal={cartTotal} close={closeUtilityModal} placeOrder={placeOrder} />}
      {authOpen && <AuthModal authMode={authMode} setAuthMode={setAuthMode} submitAuth={submitAuth} close={closeUtilityModal} />}
    </main>
  );
}

function Stats({ stats }) {
  return <section className="stats">{stats.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</section>;
}

function CategoryRail({ pickCategory, compact = false }) {
  return (
    <section className={compact ? "category-band compact" : "category-band"}>
      <div className="section-title"><div><p className="eyebrow">Shop sections</p><h2>Browse by category</h2></div></div>
      <div className="category-grid">{categoryTiles.map((tile) => <button className="category-tile" key={tile.title} onClick={() => pickCategory(tile)}><img src={tile.image} alt={tile.title} /><strong>{tile.title}</strong></button>)}</div>
    </section>
  );
}

function ProductSection({ title, products, addToCart }) {
  return <section className="product-band"><div className="section-title"><div><p className="eyebrow">Filled catalog</p><h2>{title}</h2></div><span>{products.length} items</span></div><ProductGrid products={products} addToCart={addToCart} /></section>;
}

function ShopLayout({ query, setQuery, products, addToCart }) {
  return (
    <section className="layout">
      <aside className="filters">
        <h2>Find clothes</h2>
        <input placeholder="Search brand, category..." value={query.search} onChange={(event) => setQuery({ ...query, search: event.target.value })} />
        {Object.entries(filters).map(([key, values]) => <label key={key}>{key}<select value={query[key]} onChange={(event) => setQuery({ ...query, [key]: event.target.value })}>{values.map((value) => <option key={value}>{value}</option>)}</select></label>)}
        <label>sort<select value={query.sort} onChange={(event) => setQuery({ ...query, sort: event.target.value })}><option value="newest">Newest</option><option value="price-low">Price low to high</option><option value="price-high">Price high to low</option></select></label>
      </aside>
      <section className="catalog"><div className="section-title"><div><p className="eyebrow">Different generated item images</p><h2>Large clothing collection</h2></div><span>{products.length} items</span></div><ProductGrid products={products} addToCart={addToCart} /></section>
    </section>
  );
}

function ProductGrid({ products, addToCart }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <article className="card" key={product._id || product.imageHashes?.[0]}>
          <div className="image-wrap"><img src={product.images?.[0]} alt={product.title} loading="lazy" /><span>{product.condition}</span></div>
          <div className="card-body">
            <p className="brand-name">{product.brand}</p>
            <h3>{product.title}</h3>
            <p>{product.gender} - {product.size} - {product.location}</p>
            {product.ngoName && <p>NGO: {product.ngoName}</p>}
            <div className="price-row"><strong>{currency(product.price)}</strong>{product.originalPrice > 0 && <del>{currency(product.originalPrice)}</del>}</div>
            <button className="card-action" onClick={() => addToCart(product)}>{product.isDonation ? "Donate similar item" : "Add to cart"}</button>
          </div>
        </article>
      ))}
    </div>
  );
}

function DonationStory() {
  return <section className="donation-story"><div className="section-title"><div><p className="eyebrow">What NGOs need now</p><h2>High-impact donation categories</h2></div></div><div className="need-grid">{donationNeeds.map((need) => <span key={need}>{need}</span>)}</div><div className="process-grid">{["Choose NGO", "Upload item", "Admin verifies", "Pickup scheduled"].map((step, index) => <article key={step}><b>{index + 1}</b><h3>{step}</h3><p>{index === 0 ? "Pick a verified partner based on current needs." : index === 1 ? "Paste an image URL or upload a device photo." : index === 2 ? "Duplicate and low-quality listings are filtered." : "The NGO receives your approved donation request."}</p></article>)}</div></section>;
}

function NgoSection({ selectedNgo, setSelectedNgo }) {
  return (
    <section className="ngo-section">
      <div className="section-title"><div><p className="eyebrow">Verified NGO partners</p><h2>Choose where your clothes go</h2></div><span>{selectedNgo} selected</span></div>
      <div className="ngo-grid">
        {ngoPartners.map((ngo) => (
          <button className={selectedNgo === ngo.name ? "ngo-card active" : "ngo-card"} key={ngo.name} onClick={() => setSelectedNgo(ngo.name)}>
            <img src={ngo.image} alt={ngo.name} />
            <b>{ngo.name}</b>
            <span>{ngo.city}</span>
            <p>{ngo.need}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function ListingForm({ formType, selectedNgo, submitListing, navigate }) {
  return (
    <section className="listing" id="list">
      <div className="section-title"><div><p className="eyebrow">Community closet</p><h2>{formType === "sell" ? "Sell a pre-loved item" : "Donate clothes"}</h2></div><div className="toggle"><button className={formType === "sell" ? "active" : ""} onClick={(event) => navigate(event, "/sell")}>Sell</button><button className={formType === "donate" ? "active" : ""} onClick={(event) => navigate(event, "/donate")}>Donate</button></div></div>
      <form className="listing-form" onSubmit={submitListing}>
        <input name="title" placeholder="Item title" required /><input name="brand" placeholder="Brand" /><input name="location" placeholder="City" required />
        <select name="gender" required><option>Women</option><option>Men</option><option>Kids</option><option>Unisex</option></select>
        <select name="category" required>{filters.category.slice(1).map((item) => <option key={item}>{item}</option>)}</select><input name="subcategory" placeholder="Subcategory, e.g. Kurtas" required />
        <select name="size" required>{filters.size.slice(1).map((item) => <option key={item}>{item}</option>)}</select><input name="color" placeholder="Color" required />
        <select name="condition" required>{filters.condition.slice(1).map((item) => <option key={item}>{item}</option>)}</select>
        {formType === "donate" && (
          <label className="wide-field">
            Select NGO to donate this item
            <select name="ngoName" defaultValue={selectedNgo} required>
              {ngoPartners.map((ngo) => <option key={ngo.name}>{ngo.name} - {ngo.city} - needs {ngo.need}</option>)}
            </select>
          </label>
        )}
        {formType === "sell" && <input name="price" type="number" min="1" placeholder="Selling price" required />}{formType === "sell" && <input name="originalPrice" type="number" min="1" placeholder="Original price" required />}
        <input name="imageUrl" type="url" placeholder="Paste item image URL, optional" />
        <input name="imageFile" type="file" accept="image/*" />
        <textarea name="description" placeholder="Describe condition, fit, fabric and pickup details" required />
        <button className="primary" type="submit">{formType === "sell" ? "Submit listing" : "Submit donation"}</button>
      </form>
    </section>
  );
}

function AdminPage({ products, cart, updateProductStatus, removeProduct }) {
  const [showManager, setShowManager] = useState(false);
  const activeItems = products.filter((product) => !["removed", "rejected"].includes(product.status));
  const pendingItems = products.filter((product) => product.status === "pending");
  const rejectedItems = products.filter((product) => product.status === "rejected");
  const removedItems = products.filter((product) => product.status === "removed");
  const soldItems = products.filter((product) => product.status === "sold");

  return (
    <section className="admin-page">
      <div className="section-title">
        <div><p className="eyebrow">Admin control</p><h2>Marketplace dashboard</h2></div>
        <span>{pendingItems.length} pending approvals</span>
      </div>
      <div className="admin-grid">
        <article><strong>{activeItems.length}</strong><span>Active marketplace items</span></article>
        <article><strong>{pendingItems.length}</strong><span>Pending approvals</span></article>
        <article><strong>{soldItems.length}</strong><span>Sold items</span></article>
        <article><strong>{removedItems.length}</strong><span>Removed items</span></article>
        <article><strong>{products.filter((item) => item.isDonation).length}</strong><span>Donation inventory</span></article>
        <article><strong>{rejectedItems.length}</strong><span>Rejected listings</span></article>
        <article><strong>{cart.length}</strong><span>Items currently in carts</span></article>
        <article><strong>{new Set(products.map((item) => item.sellerName)).size}</strong><span>Sellers and donors</span></article>
      </div>

      <div className="admin-tools">
        <button className="primary" onClick={() => setShowManager((current) => !current)}>
          {showManager ? "Hide item manager" : "Open item manager"}
        </button>
        <button onClick={() => setShowManager(true)}>Review pending items</button>
      </div>

      {showManager && (
        <>
          <div className="section-title admin-subtitle">
            <div><p className="eyebrow">Inventory power tools</p><h2>Manage every item</h2></div>
            <span>Approve, reject, sell, restore or remove</span>
          </div>

          <div className="admin-table">
            {products.map((product) => (
              <article className={product.status === "removed" ? "is-removed" : ""} key={product._id}>
                <img src={product.images[0]} alt={product.title} />
                <div>
                  <b>{product.title}</b>
                  <span>{product.category} - {product.subcategory} - {product.sellerName}{product.ngoName ? ` - ${product.ngoName}` : ""}</span>
                  <small>Status: {product.status}</small>
                </div>
                <div className="admin-actions">
                  <button onClick={() => updateProductStatus(product._id, "approved")}>Approve</button>
                  <button onClick={() => updateProductStatus(product._id, "rejected")}>Reject</button>
                  <button onClick={() => updateProductStatus(product._id, "sold")}>Sold</button>
                  <button onClick={() => removeProduct(product._id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function CartDrawer({ cart, setCart, cartTotal, close, checkout }) {
  return <div className="overlay"><aside className="drawer"><div className="section-title"><div><p className="eyebrow">Shopping bag</p><h2>Your cart</h2></div><button onClick={close}>Close</button></div>{cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((item, index) => <article className="cart-row" key={`${item._id}-${index}`}><img src={item.images[0]} alt={item.title} /><div><b>{item.title}</b><span>{currency(item.price)}</span></div><button onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))}>Remove</button></article>)}<div className="cart-total"><strong>Total</strong><strong>{currency(cartTotal)}</strong></div><button className="primary full" disabled={cart.length === 0} onClick={checkout}>Checkout</button></aside></div>;
}

function CheckoutModal({ cartTotal, close, placeOrder }) {
  return <div className="overlay"><section className="auth-modal"><div className="section-title"><div><p className="eyebrow">Checkout</p><h2>Delivery details</h2></div><button onClick={close}>Close</button></div><form className="auth-form" onSubmit={placeOrder}><input placeholder="Full name" required /><input placeholder="Phone number" required /><textarea placeholder="Delivery address" required /><select required><option>UPI on delivery</option><option>Card ending 4242</option><option>Cash on delivery</option></select><div className="cart-total"><strong>Payable</strong><strong>{currency(cartTotal)}</strong></div><button className="primary" type="submit">Place order</button></form></section></div>;
}

function AuthModal({ authMode, setAuthMode, submitAuth, close }) {
  return <div className="overlay"><section className="auth-modal"><div className="section-title"><div><p className="eyebrow">Account</p><h2>{authMode === "login" ? "Login" : "Create account"}</h2></div><button onClick={close}>Close</button></div><div className="toggle"><button className={authMode === "login" ? "active" : ""} onClick={() => setAuthMode("login")}>Login</button><button className={authMode === "signup" ? "active" : ""} onClick={() => setAuthMode("signup")}>Signup</button></div><form className="auth-form" onSubmit={submitAuth}>{authMode === "signup" && <input name="name" placeholder="Full name" required />}<input name="email" type="email" placeholder="Email address" required /><input name="password" type="password" placeholder="Password" required /><button className="primary" type="submit">{authMode === "login" ? "Login" : "Create account"}</button></form></section></div>;
}

createRoot(document.getElementById("root")).render(<App />);

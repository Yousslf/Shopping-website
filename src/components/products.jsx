import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfo, setShowInfo] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  if (loading) {
    return (
      <div className="products">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="products">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div className="product" key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="product-title-link"
              >
                <h2>{product.title}</h2>
              </Link>
              <p
                className={`product-desc${showInfo[product.id] ? " show" : ""}`}
              >
                {product.description}
              </p>
              <p className="product-price">Price: ${product.price}</p>
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
                width="150"
                height="150"
                style={{ objectFit: "contain" }}
              />
              <button onClick={() => addToCart(product)}>Add to Cart</button>
              <button
                onClick={() =>
                  setShowInfo((prev) => ({
                    ...prev,
                    [product.id]: !prev[product.id],
                  }))
                }
              >
                {showInfo[product.id] ? "Hide Info" : "Show Info"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;

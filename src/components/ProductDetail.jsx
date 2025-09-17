import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCart from "../context/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    // Show a brief success message
    const button = document.querySelector(".add-to-cart-btn");
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.style.backgroundColor = "#4CAF50";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1000);
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail">
        <div className="error">
          {error || "Product not found"}
          <button onClick={() => navigate("/")} className="back-btn">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-info-section">
          <h1>{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-price-section">
            <span className="product-price">${product.price}</span>
            <div className="product-rating">
              Rating: {product.rating?.rate || "N/A"} ⭐
              <span className="rating-count">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="back-btn" onClick={() => navigate("/")}>
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

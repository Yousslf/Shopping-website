import React from "react";
import Nav from "./components/nav";
import "./App.css";
import Products from "./components/products";
import Cart from "./components/cart";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CartProvider from "./context/CartContext";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};
export default App;

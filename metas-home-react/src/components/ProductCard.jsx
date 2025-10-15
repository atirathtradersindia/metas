import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ProductCard = ({ product, showBuyQuery }) => {
  const { currentLang } = useLanguage();

  // Price ranges for each product
  const priceRanges = {
    1: "₹7,250-8,600 per qtls", // 1121 Basmati
    2: "₹7,800-9,200 per qtls", // 1509 Basmati
    3: "₹7,100-8,400 per qtls", // 1401 Basmati
    4: "₹6,900-8,200 per qtls", // Pusa Basmati
    5: "₹6,700-7,900 per qtls", // Traditional Basmati
    6: "₹7,300-8,700 per qtls", // 1718 Basmati
    7: "₹6,800-8,100 per qtls", // 1885 Basmati
    8: "₹5,200-6,100 per qtls", // Sugandha
    9: "₹6,000-7,100 per qtls", // Sharbati
    10: "₹5,800-6,900 per qtls", // PR-11/14
    11: "₹5,500-6,500 per qtls", // PR-06/47
    12: "₹5,700-6,800 per qtls", // RH-10
    13: "₹4,900-5,800 per qtls", // Sona Masoori
    14: "₹5,100-6,000 per qtls", // Long Grain
    15: "₹5,400-6,400 per qtls", // IR-8
    16: "₹5,600-6,700 per qtls", // GR-11
    17: "₹5,200-6,100 per qtls", // Swarna
    18: "₹6,100-7,200 per qtls", // Kalizeera
    19: "₹5,300-6,300 per qtls", // Ponni Rice
    101: "₹5,500-6,200 per qtls", // Chickpeas
    102: "₹6,000-6,800 per qtls", // Red Lentils
    201: "₹14,000-16,000 per qtls", // Turmeric
    202: "₹48,000-52,000 per qtls", // Black Pepper
    301: "₹6,200-7,200 per qtls", // Organic Brown Rice
    302: "₹9,500-11,000 per qtls", // Organic Quinoa
    401: "₹4,000-5,000 per qtls", // Mango
    402: "₹2,500-3,200 per qtls", // Banana
    501: "₹1,800-2,400 per qtls", // Tomato
    502: "₹2,200-2,800 per qtls", // Onion
  };

  return (
    <div
      className="product-card"
      onClick={() => showBuyQuery(product.id)}
    >
      <img
        src={product.image}
        alt={product.name[currentLang]}
        className="product-img"
      />
      <div className="product-content">
        <h3 className="product-title">{product.name[currentLang]}</h3>
        <p className="product-desc">{product.desc[currentLang]}</p>
        <div className="product-footer">
          <p className="product-price">{priceRanges[product.id] || "Price on Request"}</p>
          <div className="footer-actions">
            <span className="product-category">{product.category}</span>
            <button className="gold-btn">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

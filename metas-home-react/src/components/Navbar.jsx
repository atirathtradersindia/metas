// Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar({ isLoggedIn, onShowProfile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const { t, setLanguage, currentLang } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown((prev) => !prev);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
    setIsMenuOpen(false); // Close mobile menu when language is selected
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLanguageDropdown(false);
  }, [location]);

  // Get language display name
  const getLanguageName = (lang) => {
    const languages = {
      en: "English",
      te: "తెలుగు",
      hi: "हिन्दी",
      ur: "اردو",
      es: "Español",
      fr: "Français"
    };
    return languages[lang] || lang;
  };

  return (
    <header className="nav" id="nav" ref={navRef}>
      <div className="brand">
        <div className="logoMark"><img src="/icon.png" alt="" /></div>
        <div>
          <h1 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>{t('brand')}</h1>
          <div style={{ fontSize: "11px", opacity: 0.9 }}>Premium Rice Export</div>
        </div>
      </div>

      <div className="hamburger-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav className={`menu ${isMenuOpen ? "menu-open" : ""}`}>
        <Link to="/">{t('home')}</Link>
        <Link to="/about">{t('about')}</Link>
        <Link to="/products">{t('products')}</Link>
        <Link to="/pricing">{t('pricing')}</Link>
        <Link to="/contact">{t('contact')}</Link>
        <Link to="/blog">{t('blog')}</Link>
        <Link to="/services">{t('services')}</Link>

        {/* Language Dropdown */}
        <div className="language-dropdown-container">
          <button 
            className="language-btn-nav"
            onClick={toggleLanguageDropdown}
          >
            <span style={{ marginRight: "5px" }}>🌐</span>
            {getLanguageName(currentLang)}
          </button>
          
          {showLanguageDropdown && (
            <div className="language-dropdown-menu">
              {["en", "te", "hi", "ur", "es", "fr"].map((lang) => (
                <div
                  key={lang}
                  className={`language-dropdown-item ${currentLang === lang ? "active" : ""}`}
                  onClick={() => handleLanguageSelect(lang)}
                >
                  {getLanguageName(lang)}
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <>
            <Link to="/signup">
              <button className="btn-signup">{t('signup')}</button>
            </Link>
            <Link to="/signin">
              <button className="btn-signin">{t('signin')}</button>
            </Link>
          </>
        ) : (
          <button className="btn-profile" onClick={onShowProfile}>
            {t('profile')}
          </button>
        )}
      </nav>
    </header>
  );
}

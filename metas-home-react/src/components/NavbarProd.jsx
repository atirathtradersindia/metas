import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarProd = ({
  searchProducts,
  showProductsPage,
  showProfilePanel,
  goHome,
  toggleSidebar,
  isSidebarOpen,
  isLoggedIn,
}) => {
  const { t, setLanguage } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown((prev) => !prev);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const handleGoHome = () => {
    goHome(); // reset filters inside ProductApp
    navigate("/"); // navigate back to homepage
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      showProfilePanel();
    } else {
      navigate("/signin"); // Redirect to signin if not logged in
    }
  };

  const handleTransportClick = () => {
    navigate("/transport"); // Navigate to transport page
  };

  const handleOceanFreightClick = () => {
    navigate("/oceanfreight"); // Navigate to oceanfreight page
  };

  return (
    <>
      <nav className="navbar-prod bg-white shadow-lg border-b border-gray-200">
        {/* Left section: Logo + Brand */}
        <div className="navbar-left">
          {/* Hamburger only on mobile */}
          <button className="hamburger-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          <img className="logo-img" src="/icon.png" alt="Logo" />
          <span className="brand-text">METAS</span>
        </div>

        {/* Middle: Search (hidden on small screens) */}
        <div className="navbar-search">
          <input
            id="searchInput"
            type="text"
            placeholder={`${t("products")}...`}
            className="search-input"
            onChange={(e) => searchProducts(e.target.value)}
          />
        </div>

        {/* Right: Nav actions */}
        <div className="navbar-right">
          {/* Home */}
          <button className="nav-btn" onClick={handleGoHome}>
            <span className="mr-1">&#8962;</span>
            <span className="hidden sm:inline">{t("home")}</span>
          </button>

          {/* Products */}
          <button
            className="nav-btn hidden sm:inline"
            onClick={showProductsPage}
          >
            {t("products")}
          </button>

          {/* Transport */}
          <button
            className="nav-btn hidden sm:inline"
            onClick={handleTransportClick}
          >
            {t("Transport")}
          </button>

          {/* OceanFreight */}
          <button
            className="nav-btn hidden sm:inline"
            onClick={handleOceanFreightClick}
          >
            OceanFreight
          </button>

          {/* Profile - Show different text based on login status */}
          <button
            className="profile-btn"
            onClick={handleProfileClick}
          >
            <span className="mr-1">&#128100;</span>
            <span className="hidden sm:inline">
              {isLoggedIn ? t("profile") : t("login")}
            </span>
          </button>

          {/* Language Dropdown */}
          <div className="language-dropdown">
            <button
              id="languageBtn"
              className="language-btn"
              onClick={toggleLanguageDropdown}
            >
              <span className="mr-1">&#127760;</span>
              <span className="hidden sm:inline">{t("language")}</span>
            </button>

            {showLanguageDropdown && (
              <div className="language-menu">
                {["en", "te", "hi", "ur", "es", "fr"].map((lang) => (
                  <div
                    key={lang}
                    className="language-item"
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    {lang === "en" && "English"}
                    {lang === "te" && "తెలుగు"}
                    {lang === "hi" && "हिन्दी"}
                    {lang === "ur" && "اردو"}
                    {lang === "es" && "Español"}
                    {lang === "fr" && "Français"}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarProd;
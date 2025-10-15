import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { products } from "../data/products";
import Sidebar from "../components/Sidebar";
import NavbarProd from "../components/NavbarProd";
import ProductsGrid from "../components/ProductsGrid";
import ProfilePanel from "../components/ProfilePanel";
import BuyModal from "../components/BuyModal";
import ThankYouPopup from "../components/ThankYouPopup";
import BasmatiRSSFeed from "../components/BasmatiRSSFeed";

const LoginAlertModal = ({ isOpen, onClose, onSignIn }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 glass-effect"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Authentication Required
          </h2>
          <p className="text-white/80 text-sm">
            Please login to access product details and get quotes
          </p>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gradient-to-r from-gray-600/50 to-gray-700/50 hover:from-gray-700 hover:to-gray-800 text-white py-3 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm glass-effect hover:scale-105 transform border border-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onSignIn}
            className="flex-1 bg-gradient-to-r from-violet-600/80 to-purple-600/80 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-200 font-medium backdrop-blur-sm glass-effect hover:scale-105 transform border border-white/20 shadow-lg hover:shadow-violet-500/20"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            Don't have an account?{" "}
            <button
              onClick={() => {
                onClose();
                window.location.href = "/signup";
              }}
              className="text-violet-300 hover:text-violet-200 underline transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const AppContent = ({ isLoggedIn: parentIsLoggedIn }) => {
  const { t } = useLanguage();
  const [filteredCategory, setFilteredCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [profile, setProfile] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(parentIsLoggedIn);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const [showRssFeed, setShowRssFeed] = useState(true);

  useEffect(() => {
    setIsLoggedIn(parentIsLoggedIn);
  }, [parentIsLoggedIn]);

  useEffect(() => {
    filterProducts();
  }, [filteredCategory, searchQuery]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setProfile({
          name: firebaseUser.displayName || "Not set",
          email: firebaseUser.email || "Not provided",
          phone: firebaseUser.phoneNumber || "Not provided",
          address: "N/A",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          uid: firebaseUser.uid || "N/A",
        });
      } else {
        setIsLoggedIn(false);
        setProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const filterProducts = () => {
    let filtered = products;
    if (filteredCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === filteredCategory
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.en.toLowerCase().includes(query) ||
          (product.desc.en && product.desc.en.toLowerCase().includes(query))
      );
    }
    setFilteredProducts(filtered);
  };

  const showBuyQuery = (productId) => {
    if (!isLoggedIn) {
      setIsLoginAlertOpen(true);
      return;
    }
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setIsBuyModalOpen(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setProfile(null);
    setIsProfileOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🌾 Sticky RSS Feed Ticker */}
      {showRssFeed && (
        <div className="sticky top-0 left-0 w-full bg-black/40 backdrop-blur-lg border-b border-white/10 z-40 overflow-hidden">
          <BasmatiRSSFeed />
        </div>
      )}

      {/* Navbar */}
      <NavbarProd
        searchProducts={(q) => setSearchQuery(q)}
        showProductsPage={() => setFilteredCategory("Basmati Rice")}
        showProfilePanel={() => setIsProfileOpen(true)}
        goHome={() => {
          setFilteredCategory("All");
          setSearchQuery("");
        }}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        isLoggedIn={isLoggedIn}
      />

      {/* Sidebar + Products */}
      <div className="flex flex-1 mt-2">
        <Sidebar
          filteredCategory={filteredCategory}
          setFilteredCategory={setFilteredCategory}
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-hidden px-4 relative">
          <ProductsGrid
            products={filteredProducts}
            showBuyQuery={showBuyQuery}
          />
        </main>
      </div>

      {/* Other Modals */}
      <ProfilePanel
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
      />
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        product={selectedProduct}
        products={products}
        onSubmitted={() => setIsThankYouOpen(true)}
      />
      <ThankYouPopup
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onClose={() => setIsLoginAlertOpen(false)}
        onSignIn={() => (window.location.href = "/signin")}
      />
    </div>
  );
};

const ProductApp = ({ isLoggedIn }) => (
  <LanguageProvider>
    <AppContent isLoggedIn={isLoggedIn} />
  </LanguageProvider>
);

export default ProductApp;

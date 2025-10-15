import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Animation from "./components/Animation";
import ProductApp from "./components/ProductApp";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ProfilePanel from "./components/ProfilePanel";
import Blog from "./components/Blog";
import ForgotPassword from "./components/ForgotPassword";
import Services from "./components/Services";
import OceanFreight from "./components/OceanFreight";
import Transport from "./components/Transport";
import { LanguageProvider } from "./contexts/LanguageContext";
import HomeTranslationPage from "./HomeTranslationPage";
import IndianAgriRSSFeed from "./components/IndianAgriRSSFeed";

import "./metas.css";

function Home() {
  return (
    <div className="homepage" style={{ paddingTop: "32px" }}>
      {/* RSS Feeds positioned below navbar but visible */}
      <div className="relative" style={{ marginTop: "32px" }}>
        <IndianAgriRSSFeed />
        
      </div>
      <section id="home"><Hero /></section>
      <section id="about"><About /></section><br />
      <section id="products"><Products /></section>
      <section id="pricing"><Pricing /></section>
      <section id="contact"><Contact /></section>
      <section id="blog"><Blog /></section>
      <section id="services"><Services /></section>
      <Footer />
    </div>
  );
}

function LayoutRoutes({ isLoggedIn, user, onShowProfile }) {
  const location = useLocation();

  const hideDefaultNavbar =
    location.pathname === "/products-all" ||
    location.pathname.startsWith("/products-all/");

  return (
    <>
      {!hideDefaultNavbar && (
        <div className="sticky top-0 z-50 bg-transparent">
          <Navbar
            isLoggedIn={isLoggedIn}
            user={user}
            onShowProfile={onShowProfile}
          />
        </div>
      )}

      <Routes>
        {/* 🌐 Default Home */}
        <Route path="/" element={<Home />} />

        {/* 🈯 Translated Home */}
        <Route path="/home-translated" element={<HomeTranslationPage />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products-all/*" element={<ProductApp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/services" element={<Services />} />
        <Route path="/oceanfreight" element={<OceanFreight />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          phoneNumber: firebaseUser.phoneNumber,
        });
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    setUser(null);
    setIsProfileOpen(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="relative">
          {/* Background animation always visible */}
          <div className="absolute inset-0 -z-10">
            <Animation />
          </div>

          {/* Routes & Navbar */}
          <LayoutRoutes
            isLoggedIn={isLoggedIn}
            user={user}
            onShowProfile={() => setIsProfileOpen(true)}
          />

          {/* Profile Panel */}
          <ProfilePanel
            profile={{
              name: user?.displayName || "Not set",
              email: user?.email || "Not provided",
              phone: user?.phoneNumber || "Not provided",
              address: "N/A",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              uid: user?.uid || "N/A"
            }}
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}
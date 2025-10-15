import React, { useEffect } from "react";
import { useLanguage } from "./contexts/LanguageContext";

// 🌍 Translations for Home, About, and Footer
const translations = {
  en: {
    langName: "English",
    heroTitle: "Welcome to Our Store",
    heroSubtitle: "Quality products — fast delivery — local support.",
    cta: "Shop Now",
    featuresTitle: "Why choose us",
    features: ["Verified suppliers", "Secure payments", "Worldwide shipping"],
    contact: "Contact Us",

    // About Section
    aboutTitle: "About Metas Agro",
    whoWeAre: "Who We Are",
    whoWeAreText:
      "Metas Agro is a leading supplier and exporter of premium quality rice. We ensure the highest standards in quality, packaging, and global delivery.",
    ourStandards: "Our Standards",
    ourStandardsText:
      "We maintain strict quality control and sustainable sourcing practices to meet international benchmarks.",
    globalReach: "Global Reach",
    globalReachText:
      "We export to over 25+ countries worldwide, ensuring trust and reliability in every shipment.",

    // Footer
    brand: "Metas",
    copyright: "© 2025 Metas Agro. All rights reserved.",
  },

  te: {
    langName: "తెలుగు",
    heroTitle: "మా దుకాణానికి స్వాగతం",
    heroSubtitle: "నాణ్యమైన ఉత్పత్తులు — వేగవంతమైన డెలివరీ — స్థానిక మద్దతు.",
    cta: "ఇప్పుడే షాపింగ్ చేయండి",
    featuresTitle: "ఎందుకు మమ్మల్ని ఎంచుకోవాలి",
    features: ["సమర్థిత సరఫరాదారులు", "సురక్షిత చెల్లింపులు", "ప్రపంచవ్యాప్తంగా షిప్పింగ్"],
    contact: "మమ్మల్ని సంప్రదించండి",

    // About Section
    aboutTitle: "మెటాస్ అగ్రో గురించి",
    whoWeAre: "మేమెవరం",
    whoWeAreText:
      "మెటాస్ అగ్రో ప్రీమియం నాణ్యత గల బియ్యాన్ని సరఫరా చేసే మరియు ఎగుమతి చేసే ప్రముఖ సంస్థ.",
    ourStandards: "మా ప్రమాణాలు",
    ourStandardsText:
      "అంతర్జాతీయ ప్రమాణాలకు అనుగుణంగా నాణ్యత నియంత్రణ మరియు స్థిరమైన సరఫరా విధానాలను పాటిస్తాము.",
    globalReach: "ప్రపంచవ్యాప్త సేవలు",
    globalReachText:
      "మేము 25కి పైగా దేశాలకు ఎగుమతి చేస్తాము, ప్రతి షిప్‌మెంట్‌లో విశ్వసనీయతను నిర్ధారిస్తాము.",

    // Footer
    brand: "మెటాస్",
    copyright: "© 2025 మెటాస్ అగ్రో. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
  },

  hi: {
    langName: "हिन्दी",
    heroTitle: "हमारी दुकान में आपका स्वागत है",
    heroSubtitle: "उत्तम उत्पाद — तेज़ डिलीवरी — स्थानीय सहायता।",
    cta: "अभी खरीदें",
    featuresTitle: "हमें क्यों चुनें",
    features: ["प्रमाणित आपूर्तिकर्ता", "सुरक्षित भुगतान", "विश्वव्यापी शिपिंग"],
    contact: "संपर्क करें",

    // About Section
    aboutTitle: "मेटास एग्रो के बारे में",
    whoWeAre: "हम कौन हैं",
    whoWeAreText:
      "मेटास एग्रो एक अग्रणी प्रीमियम गुणवत्ता वाले चावल का आपूर्तिकर्ता और निर्यातक है।",
    ourStandards: "हमारे मानक",
    ourStandardsText:
      "हम अंतरराष्ट्रीय मानकों के अनुसार सख्त गुणवत्ता नियंत्रण और टिकाऊ सोर्सिंग सुनिश्चित करते हैं।",
    globalReach: "वैश्विक पहुंच",
    globalReachText:
      "हम 25+ देशों में निर्यात करते हैं, हर डिलीवरी में भरोसा और गुणवत्ता सुनिश्चित करते हैं।",

    // Footer
    brand: "मेटास",
    copyright: "© 2025 मेटास एग्रो। सर्वाधिकार सुरक्षित।",
  },

  fr: {
    langName: "Français",
    heroTitle: "Bienvenue dans notre boutique",
    heroSubtitle: "Produits de qualité — livraison rapide — support local.",
    cta: "Acheter maintenant",
    featuresTitle: "Pourquoi nous choisir",
    features: ["Fournisseurs vérifiés", "Paiements sécurisés", "Livraison internationale"],
    contact: "Contactez-nous",

    // About Section
    aboutTitle: "À propos de Metas Agro",
    whoWeAre: "Qui nous sommes",
    whoWeAreText:
      "Metas Agro est un fournisseur et exportateur de riz de haute qualité, respectant des normes rigoureuses.",
    ourStandards: "Nos standards",
    ourStandardsText:
      "Nous garantissons un contrôle qualité strict et des pratiques durables de production.",
    globalReach: "Portée mondiale",
    globalReachText:
      "Nous exportons vers plus de 25 pays à travers le monde avec fiabilité et excellence.",

    // Footer
    brand: "Metas",
    copyright: "© 2025 Metas Agro. Tous droits réservés.",
  },

  es: {
    langName: "Español",
    heroTitle: "Bienvenido a nuestra tienda",
    heroSubtitle: "Productos de calidad — entrega rápida — soporte local.",
    cta: "Comprar ahora",
    featuresTitle: "Por qué elegirnos",
    features: ["Proveedores verificados", "Pagos seguros", "Envío mundial"],
    contact: "Contáctanos",

    // About Section
    aboutTitle: "Sobre Metas Agro",
    whoWeAre: "Quiénes somos",
    whoWeAreText:
      "Metas Agro es un proveedor y exportador líder de arroz de alta calidad.",
    ourStandards: "Nuestros estándares",
    ourStandardsText:
      "Mantenemos un control de calidad estricto y prácticas sostenibles.",
    globalReach: "Alcance global",
    globalReachText:
      "Exportamos a más de 25 países con confianza y excelencia.",

    // Footer
    brand: "Metas",
    copyright: "© 2025 Metas Agro. Todos los derechos reservados.",
  },

  ar: {
    langName: "العربية",
    heroTitle: "مرحبًا بكم في متجرنا",
    heroSubtitle: "منتجات عالية الجودة — توصيل سريع — دعم محلي.",
    cta: "تسوق الآن",
    featuresTitle: "لماذا تختارنا",
    features: ["موردون موثوقون", "مدفوعات آمنة", "شحن عالمي"],
    contact: "اتصل بنا",

    // About Section
    aboutTitle: "حول ميتاس أغرو",
    whoWeAre: "من نحن",
    whoWeAreText:
      "ميتاس أغرو هي شركة رائدة في تصدير وتوريد الأرز عالي الجودة.",
    ourStandards: "معاييرنا",
    ourStandardsText:
      "نحافظ على أعلى معايير الجودة والممارسات المستدامة في كل عملية إنتاج.",
    globalReach: "الانتشار العالمي",
    globalReachText:
      "نصدر إلى أكثر من 25 دولة بثقة وموثوقية.",

    // Footer
    brand: "ميتاس",
    copyright: "© 2025 ميتاس أغرو. جميع الحقوق محفوظة.",
  },
};

const LANG_ORDER = ["en", "te", "hi", "fr", "es", "ar"];

function getDir(lang) {
  return lang === "ar" ? "rtl" : "ltr";
}

export default function HomeTranslationPage() {
  const { language = "en", setLanguage } = useLanguage() || {};
  const lang = language || "en";
  const t = translations[lang] || translations.en;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = getDir(lang);
  }, [lang]);

  return (
    <main className="min-h-screen bg-gray-50" dir={getDir(lang)}>
      {/* Header */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-6">
        <div className="text-2xl font-bold">{t.brand}</div>

        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLanguage && setLanguage(e.target.value)}
            className="border rounded-md p-2"
          >
            {LANG_ORDER.map((code) => (
              <option key={code} value={code}>
                {translations[code].langName}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 py-12 px-6">
        <div>
          <h1 className="text-4xl font-extrabold">{t.heroTitle}</h1>
          <p className="mt-4 text-lg">{t.heroSubtitle}</p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 border rounded-md">{t.cta}</button>
            <button className="px-6 py-3 border rounded-md">{t.contact}</button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full h-64 bg-white rounded-lg shadow flex items-center justify-center">
            <span className="opacity-40">Hero image</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">{t.aboutTitle}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-yellow-500">{t.whoWeAre}</h3>
            <p className="mt-2">{t.whoWeAreText}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-500">{t.ourStandards}</h3>
            <p className="mt-2">{t.ourStandardsText}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-600">{t.globalReach}</h3>
            <p className="mt-2">{t.globalReachText}</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto py-8 px-6">
        <h2 className="text-2xl font-semibold mb-4">{t.featuresTitle}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.features.map((f, i) => (
            <li key={i} className="bg-white p-4 rounded-lg shadow">
              {f}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 mt-12 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-2">
            <img src="icon.png" alt="logo" className="w-8 h-8" />
            <span className="font-bold text-lg">{t.brand}</span>
          </div>
          <p className="text-gray-600 text-sm text-center md:text-left">{t.copyright}</p>
        </div>
      </footer>
    </main>
  );
}


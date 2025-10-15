import Carousel from "./Carousel";
import { useLanguage } from "../contexts/LanguageContext";


export default function Hero() {
  const { t } = useLanguage();
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      
      
      <section id="hero" className="hero relative z-20">
        <div className="hero-left">
          <div className="eyebrow">{t('heroEyebrow')}</div>
          <h2 className="title">{t('heroTitle')}</h2>
          <p className="lead">{t('heroLead')}</p>
          <div className="ctaRow">
            <button className="btn btn-primary" onClick={() => scrollToSection("products")}>
              {t('exploreProducts')}
            </button>
            <button className="btn btn-ghost" onClick={() => scrollToSection("pricing")}>
              {t('viewPricing')}
            </button>
          </div>
        </div>
        <Carousel />
      </section>
    </>
  );
}
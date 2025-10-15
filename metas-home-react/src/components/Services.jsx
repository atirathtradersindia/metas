import React from 'react';
import MapImage from "../assets/Map.png";
import Branding from "../assets/Branding-Services.png";
import Profitable from "../assets/Profitable-Purchase.jpg";
import Personalization from "../assets/Personalization.jpg";
import Guidance from "../assets/Guidance.jpg";
import Quality from "../assets/Quality.jpg";

const Service = () => {
  const services = [
    {
      image: MapImage,
      title: "Trusted PAN India Network",
    },
    {
      image: Branding,
      title: "Branding & Packaging Services",
    },
    {
      image: Profitable,
      title: "Profitable Purchase",
    },
    {
      image: Personalization,
      title: "Personalization Available",
    },
    {
      image: Guidance,
      title: "Professional Guidance",
    },
    {
      image: Quality,
      title: "Quality Assured",
    },
  ];

  return (
    <section className="service-section">
      <div className="container">
        <h1 className="tw-text-3xl tw-font-bold tw-text-yellow-400 tw-mb-8 tw-text-center tw-block tw-w-full tw-clear-both tw-static service-heading">Our Services</h1>
        <div className="service-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <p
                className="service-title"
                dangerouslySetInnerHTML={{
                  __html: service.title.replace("&", "&amp;"),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
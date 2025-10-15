import { useEffect, useRef } from "react";

export default function Carousel() {
  const trackRef = useRef(null);
  const imagesRef = useRef([]);
  const totalImagesRef = useRef(0);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const originalImages = Array.from(track.children);
    totalImagesRef.current = originalImages.length;

    // Clone images for seamless looping
    originalImages.forEach(img => {
      const clone = img.cloneNode(true);
      track.appendChild(clone);
    });

    imagesRef.current = Array.from(track.children);

    const updateCarousel = (transition = true, isMobile = window.innerWidth < 768) => {
      const smallWidth = isMobile ? 100 : 140;
      const gap = isMobile ? 10 : 30;
      const activeWidth = isMobile ? window.innerWidth * 0.9 : 320; // full width for mobile
      const containerWidth = isMobile ? window.innerWidth : 700;

      let offset = 0;
      for (let i = 0; i < currentIndexRef.current; i++) {
        offset += smallWidth + gap;
      }
      offset -= (containerWidth / 2 - activeWidth / 2);

      if (!transition) {
        track.style.transition = "none";
      } else {
        track.style.transition = "transform 0.8s ease-in-out";
      }

      // Only shift on desktop
      if (!isMobile) {
        track.style.transform = `translateX(${-offset}px)`;
      } else {
        track.style.transform = "translateX(0px)";
      }

      imagesRef.current.forEach((img) => {
        img.classList.remove("active");
        img.style.transition = "all 0.6s ease-in-out";

        if (isMobile) {
          // 📱 Mobile → hide all except active
          img.style.display = "none";
        } else {
          // 💻 Desktop → reset small blurred style
          img.style.display = "block";
          img.style.filter = "blur(4px) brightness(0.7)";
          img.style.opacity = "0.6";
          img.style.transform = "scale(0.8)";
          img.style.width = `${smallWidth}px`;
          img.style.height = "200px";
          img.style.zIndex = "1";
        }
      });

      const activeIndex = currentIndexRef.current % totalImagesRef.current;
      const activeImage = imagesRef.current[activeIndex];
      if (activeImage) {
        activeImage.classList.add("active");
        activeImage.style.display = "block";
        activeImage.style.filter = "none";
        activeImage.style.opacity = "1";
        activeImage.style.transform = "scale(1)";
        activeImage.style.width = `${activeWidth}px`;
        activeImage.style.height = isMobile ? "250px" : "300px";
        activeImage.style.zIndex = "10";
        activeImage.style.margin = isMobile ? "0 auto" : "0"; // center in mobile
      }

      // Only apply prev/next styles on desktop
      if (!isMobile) {
        const prevIndex = (activeIndex - 1 + imagesRef.current.length) % imagesRef.current.length;
        const prevImage = imagesRef.current[prevIndex];
        if (prevImage) prevImage.style.zIndex = "5";

        const nextIndex = (activeIndex + 1) % imagesRef.current.length;
        const nextImage = imagesRef.current[nextIndex];
        if (nextImage) nextImage.style.zIndex = "5";
      }
    };

    updateCarousel(false);

    const handleResize = () => {
      updateCarousel(false);
    };

    window.addEventListener("resize", handleResize);

    const intervalId = setInterval(() => {
      currentIndexRef.current++;
      if (currentIndexRef.current >= totalImagesRef.current) {
        currentIndexRef.current = 0;
        updateCarousel(false);
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = "transform 0.8s ease-in-out";
          }
        }, 50);
      } else {
        updateCarousel(true);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="hero-right w-full flex justify-center items-center">
      <div className="carousel overflow-hidden w-full max-w-4xl">
        <div className="carousel-track flex items-center gap-4" ref={trackRef}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <img
              key={n}
              src={`../images/metas_${n}.jpg`}
              alt={`Rice ${n}`}
              className="rounded-xl shadow-lg object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

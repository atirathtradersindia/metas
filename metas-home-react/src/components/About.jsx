import React from 'react';

export default function About() {
  return (
    <section id="about" className="px-0 mx-0 w-full max-w-none"> {/* Remove padding/margins, ensure full width */}
      <h2 className="section-title text-center">About Metas Agro</h2> {/* Added text-center for consistency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-0 mx-0 w-full"> {/* Explicit grid columns, full width */}
        <div className="card w-full max-w-none"> {/* Full width card */}
          <h3 style={{ color: '#FFD600' }}>Who We Are</h3>
          <p>
            Leading exporters of Indian Basmati and Non-Basmati rice, delivering
            premium quality to global markets with strict FSSAI and APEDA
            compliance.
          </p>
        </div>
        <div className="card w-full max-w-none">
          <h3 style={{ color: '#00ff0dff' }}>Our Standards</h3>
          <p>
            ISO certified processes, state-of-the-art packaging, and reliable
            logistics ensuring on-time delivery worldwide.
          </p>
        </div>
        <div className="card w-full max-w-none">
          <h3 style={{ color: '#1976D2' }}>Global Reach</h3>
          <p>
            Exporting to 30+ countries with customized packaging solutions and
            documentation support for seamless international trade.
          </p>
        </div>
      </div>
    </section>
  );
}
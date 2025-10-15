import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="px-0 mx-0 w-full max-w-none"> {/* Remove padding/margins, ensure full width */}
      <h2 className="section-title text-center">Contact Us</h2> {/* Added text-center for consistency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-0 mx-0 w-full"> {/* Explicit grid columns, full width */}
        <div className="card w-full max-w-none"> {/* Full width card */}
          <h3 style={{ color: '#FFD600' }}>Get In Touch</h3>
          <p>
            Reach out to us for quotes, product information, or partnership
            opportunities.
          </p>
          <div style={{ marginTop: '20px' }}>
            <p><strong>Email:</strong> info@metasagro.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> Rice Export Zone, Mumbai, India</p>
          </div>
        </div>
        <div className="card w-full max-w-none">
          <h3 style={{ color: '#00f30cff' }}>Send Enquiry</h3>
          <form
            id="contactForm"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for your message! We will contact you soon.");
              e.target.reset();
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                className="w-full" // Added for consistency
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <input
                type="email"
                placeholder="Your Email"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                className="w-full"
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <textarea
                placeholder="Your Message"
                rows="4"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                className="w-full"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full" // Added w-full for full-width button
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import PropTypes from "prop-types";

const Sidebar = ({ filteredCategory, setFilteredCategory, isSidebarOpen, setSidebarOpen }) => {
  const [showRiceSubmenu, setShowRiceSubmenu] = useState(false);

  // Debugging: Log props to verify setSidebarOpen
  console.log("Sidebar props:", { isSidebarOpen, setSidebarOpen, filteredCategory, setFilteredCategory });

  const handleCategoryClick = (category) => {
    if (typeof setFilteredCategory === "function") {
      setFilteredCategory(category);
    } else {
      console.warn("setFilteredCategory is not a function");
    }
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen(false); // Close sidebar only if setSidebarOpen is a function
    } else {
      console.warn("setSidebarOpen is not a function");
    }
  };

  return (
    <>
      {/* Overlay for mobile view */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => {
            console.log("Overlay clicked, closing sidebar");
            if (typeof setSidebarOpen === "function") {
              setSidebarOpen(false);
            } else {
              console.warn("setSidebarOpen is not a function");
            }
          }}
        />
      )}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-56 bg-gradient-to-b from-[#2C002C] to-[#1a001d] text-gold flex-shrink-0 flex flex-col transform transition-transform duration-300 z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close button for mobile view */}
        <button
          className="close-btn md:hidden absolute top-4 right-4 text-gold text-2xl focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            console.log("Close button clicked, isSidebarOpen:", isSidebarOpen);
            if (typeof setSidebarOpen === "function") {
              setSidebarOpen(false);
            } else {
              console.warn("setSidebarOpen is not a function");
            }
          }}
          aria-label="Close sidebar"
        >
          &times;
        </button>

        <h2 className="px-6 mt-10 md:mt-6 mb-4 text-lg font-semibold text-gold">Categories</h2>
        <nav className="px-6">
          <button
            className={`block w-full mb-2 py-2 px-3 rounded text-left border border-gold/40 hover:bg-gold/10 ${
              showRiceSubmenu ? "bg-gold/10" : ""
            }`}
            onClick={() => setShowRiceSubmenu(!showRiceSubmenu)}
          >
            Rice {showRiceSubmenu ? "▲" : "▼"}
          </button>
          {showRiceSubmenu && (
            <div className="ml-2">
              {["Basmati Rice", "Non Basmati Rice"].map((cat) => (
                <button
                  key={cat}
                  className={`block w-full mb-2 py-2 px-3 rounded text-left border border-gold/40 hover:bg-gold/10 ${
                    filteredCategory === cat ? "bg-gold/10" : ""
                  }`}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          {["Pulses", "Spices", "Organic Foods", "Fruits", "Vegetables"].map(
            (cat) => (
              <button
                key={cat}
                className={`block w-full mb-2 py-2 px-3 rounded text-left border border-gold/40 hover:bg-gold/10 ${
                  filteredCategory === cat ? "bg-gold/10" : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            )
          )}
        </nav>
      </aside>

      {/* Inline styles for close button and overlay */}
      <style jsx>{`
        .close-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .close-btn:hover {
          color: #fff;
        }
        .overlay {
          background: rgba(0, 0, 0, 0.5);
          z-index: 30;
        }
      `}</style>
    </>
  );
};

Sidebar.propTypes = {
  filteredCategory: PropTypes.string,
  setFilteredCategory: PropTypes.func,
  isSidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
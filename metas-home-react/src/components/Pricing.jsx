import React, { useState, useEffect } from 'react';

export default function Pricing() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Function to fetch live prices from your FastAPI backend
  const fetchLivePrices = async () => {
    try {
      setLoading(true);
      
      // Fetch from your FastAPI backend
      const response = await fetch('http://localhost:8000/live-basmati-prices');
      
      if (!response.ok) {
        throw new Error('Failed to fetch live prices');
      }
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setPrices(data.prices);
        setLastUpdated(data.last_updated);
        setError(null);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching live prices:', err);
      setError('Live prices temporarily unavailable - showing standard prices');
      
      // Fallback to static prices
      setPrices([
        {
          product: "Traditional Basmati",
          specification: "8.10mm max",
          packing: "50 KG PP",
          port: "Mundra",
          price: "$1,450",
          trend: "stable"
        },
        {
          product: "Pusa White Sella", 
          specification: "Premium Grade",
          packing: "50 KG PP",
          port: "Nhava Sheva",
          price: "$1,380",
          trend: "stable"
        },
        {
          product: "Steam Basmati",
          specification: "8.00mm max", 
          packing: "50 KG PP",
          port: "Mundra",
          price: "$1,420",
          trend: "stable"
        },
        {
          product: "Organic Brown",
          specification: "Certified",
          packing: "25 KG Jute", 
          port: "Any Port",
          price: "$1,580",
          trend: "stable"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch prices on component mount and set interval for updates
  useEffect(() => {
    fetchLivePrices();
    
    // Update prices every 2 minutes
    const interval = setInterval(fetchLivePrices, 120000);
    
    return () => clearInterval(interval);
  }, []);

  // Function to get trend indicator
  const getTrendIndicator = (trend) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500 ml-1 text-sm">↗</span>;
      case 'down':
        return <span className="text-red-500 ml-1 text-sm">↘</span>;
      case 'stable':
        return <span className="text-blue-500 ml-1 text-sm">→</span>;
      default:
        return null;
    }
  };

  return (
    <section id="pricing" className="px-0 mx-0 w-full max-w-none">
      <h2 className="section-title text-center">
        Live Basmati Rice Prices
        {!loading && lastUpdated && (
          <span className="text-sm ml-2 text-green-600">● Live</span>
        )}
      </h2>
      
      {loading && (
        <div className="text-center text-blue-600 py-4">
          🔄 Loading live prices...
        </div>
      )}
      
      {error && (
        <div className="text-center text-yellow-600 py-4 bg-yellow-50 mx-4 rounded">
          ⚠️ {error}
        </div>
      )}

      <div className="tableWrap w-full max-w-none">
        <table className="w-full">
          <thead>
            <tr className="bg--50">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Specification</th>
              <th className="px-4 py-3 text-left">Packing</th>
              <th className="px-4 py-3 text-left">Port</th>
              <th className="px-4 py-3 text-left">Price (USD/MT)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, index) => (
              <tr key={index} className="border-b hover:bg-white-50">
                <td className="px-4 py-3 font-medium">{item.product}</td>
                <td className="px-4 py-3 text-white-600">{item.specification}</td>
                <td className="px-4 py-3 text-white-600">{item.packing}</td>
                <td className="px-4 py-3 text-white-600">{item.port}</td>
                <td className="px-4 py-3">
                  <strong className="text-lg">{item.price}</strong>
                  {getTrendIndicator(item.trend)}
                  {item.change && (
                    <span className={`text-xs ml-1 ${
                      item.change.includes('+') ? 'text-green-500' : 
                      item.change.includes('-') ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {item.change}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-4 text-center">
            📊 Last updated: {new Date(lastUpdated).toLocaleTimeString()} | 
            Prices update every 2 minutes | 
            Source: Market Intelligence
          </div>
        )}
        
        <div className="text-xs text-gray-400 mt-2 text-center">
          💡 Prices are indicative and may vary based on quantity, quality, and market conditions
        </div>
      </div>
    </section>
  );
}
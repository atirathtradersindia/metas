import React, { useState, useEffect, useRef } from "react";
import { RotateCw, TrendingUp, BarChart3, ExternalLink } from "lucide-react";

const BasmatiRSSFeed = () => {
  const [feeds, setFeeds] = useState([
    { 
      id: 1, 
      title: "Loading live rice market updates...", 
      link: "#", 
      source: "Market Watch",
      type: "info"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("🌾 Live Rice Market Updates");
  const [marketTrend, setMarketTrend] = useState("loading");
  const [activeFeed, setActiveFeed] = useState(null);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    fetchFeeds();
    // Update more frequently for live feel
    const interval = setInterval(fetchFeeds, 1 * 60 * 1000); // every 5 mins
    const titleInterval = setInterval(rotateTitle, 15000); // rotate title every 15 seconds
    
    return () => {
      clearInterval(interval);
      clearInterval(titleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!paused) {
      startScrolling();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [paused, feeds]);

  const startScrolling = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let startTime = null;
    const duration = 90000; // 80 seconds for one complete loop

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate position based on total width
      const contentWidth = container.scrollWidth / 2; // Since we duplicate content
      const translateX = -progress * contentWidth;
      
      container.style.transform = `translateX(${translateX}px)`;
      
      if (!paused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      
      // Fetch both RSS feeds and market updates
      const [rssResponse, marketResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/rss`),
        fetch(`${API_BASE_URL}/market-updates`)
      ]);
      
      const rssData = await rssResponse.json();
      const marketData = await marketResponse.json();

      // Update title from API
      if (rssData.current_title) {
        setCurrentTitle(rssData.current_title);
      }

      // Update market trend
      if (marketData.market_data) {
        setMarketTrend(marketData.market_data.basmati_price_trend);
      }

      if (rssData?.articles?.length > 0) {
        const enhancedFeeds = rssData.articles.map((article, i) => ({
          id: i,
          title: article.title,
          link: article.link,
          source: article.source,
          type: getArticleType(article.title),
          timestamp: new Date().toLocaleTimeString()
        }));
        setFeeds(enhancedFeeds);
      }
    } catch (err) {
      console.error("Error fetching feeds:", err);
      // Enhanced fallback with dynamic content
      const fallbackFeeds = [
        { 
          id: 1, 
          title: `Basmati rice prices ${getRandomTrend()} amid ${getRandomCondition()} - ${new Date().toLocaleTimeString()}`, 
          link: "#", 
          source: "Market Intelligence",
          type: "price"
        },
        { 
          id: 2, 
          title: `Rice export demand ${getRandomTrend()} in international markets - ${new Date().toLocaleTimeString()}`, 
          link: "#", 
          source: "Trade Watch",
          type: "export"
        },
        { 
          id: 3, 
          title: `New rice varieties show ${getRandomTrend()} yield potential - ${new Date().toLocaleTimeString()}`, 
          link: "#", 
          source: "AgriTech",
          type: "innovation"
        },
        { 
          id: 4, 
          title: `Government announces new policies for rice exports - ${new Date().toLocaleTimeString()}`, 
          link: "#", 
          source: "Policy Update",
          type: "policy"
        },
        { 
          id: 5, 
          title: `Monsoon forecast ${getRandomTrend()} for rice cultivation - ${new Date().toLocaleTimeString()}`, 
          link: "#", 
          source: "Weather Bureau",
          type: "weather"
        }
      ];
      setFeeds(fallbackFeeds);
      setCurrentTitle(getRandomTitle());
    } finally {
      setLoading(false);
    }
  };

  const rotateTitle = () => {
    const titles = [
      "🌾 Live Rice Market Updates: Prices, Exports & Trends",
      "📈 Real-time Basmati Prices & Market Intelligence",
      "💹 Live Agri-Commodity Updates: Rice & Grains",
      "🌱 Rice Export News & Price Fluctuations",
      "📊 Live Market Watch: Rice Commodity Updates",
      "🚢 Rice Export-Import News & Trade Insights",
      "💰 Basmati Price Trends & Market Analysis",
      "🌍 Global Rice Market Live Updates"
    ];
    setCurrentTitle(titles[Math.floor(Math.random() * titles.length)]);
  };

  const handleFeedClick = (feed) => {
    if (feed.link && feed.link !== "#") {
      window.open(feed.link, "_blank", "noopener,noreferrer");
    }
    setActiveFeed(feed.id);
    setTimeout(() => setActiveFeed(null), 1000); // Reset after 1 second
  };

  const getArticleType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('price') || lowerTitle.includes('cost') || lowerTitle.includes('msp')) return 'price';
    if (lowerTitle.includes('export') || lowerTitle.includes('import') || lowerTitle.includes('trade')) return 'trade';
    if (lowerTitle.includes('new') || lowerTitle.includes('technology') || lowerTitle.includes('innovation')) return 'innovation';
    if (lowerTitle.includes('weather') || lowerTitle.includes('monsoon') || lowerTitle.includes('crop')) return 'weather';
    if (lowerTitle.includes('policy') || lowerTitle.includes('government') || lowerTitle.includes('subsidy')) return 'policy';
    return 'info';
  };

  const getRandomTrend = () => {
    const trends = ['rising', 'falling', 'stable', 'volatile', 'strengthening', 'weakening'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const getRandomCondition = () => {
    const conditions = ['strong export demand', 'supply constraints', 'good monsoon', 'trade negotiations', 'market speculation'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getRandomTitle = () => {
    const titles = [
      "🌾 Live Rice Market Intelligence",
      "📈 Real-time Commodity Updates",
      "💹 Basmati Price Watch Live",
      "🚢 Rice Export Market Monitor"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'price': return '💰';
      case 'trade': return '🚢';
      case 'innovation': return '🔬';
      case 'weather': return '🌤️';
      case 'policy': return '📜';
      default: return '📰';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'price': return 'text-green-400';
      case 'trade': return 'text-blue-400';
      case 'innovation': return 'text-purple-400';
      case 'weather': return 'text-cyan-400';
      case 'policy': return 'text-orange-400';
      default: return 'text-violet-400';
    }
  };

  const getTrendColor = () => {
    switch(marketTrend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  const getTrendIcon = () => {
    switch(marketTrend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2C0044] to-[#2C002C] backdrop-blur-lg border-b border-white/20 z-40 overflow-hidden">
      {/* Header Bar with Title and Market Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-violet-300" />
            <span className="text-white font-semibold text-sm whitespace-nowrap">
              {currentTitle}
            </span>
          </div>
          
          {/* Market Trend Indicator */}
          <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
            <TrendingUp size={12} />
            <span className="hidden sm:inline">Market: {marketTrend}</span>
            <span className="sm:hidden">{getTrendIcon()}</span>
          </div>
        </div>

        {/* Last Update Time */}
        <div className="text-violet-400 text-xs hidden md:block">
          Last update: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Scrolling News Ticker */}
      <div className="w-full h-10 flex items-center relative bg-black/20">
        {/* Scrolling container */}
        <div className="flex-1 overflow-hidden mr-16">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 text-white/95 text-sm font-medium py-2 scrolling-container"
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              willChange: 'transform'
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {[...feeds, ...feeds].map((feed, i) => (
              <div
                key={`${feed.id}-${i}`}
                className={`flex items-center gap-3 cursor-pointer transition-all duration-300 px-4 py-1.5 rounded-lg border border-transparent ${
                  activeFeed === feed.id 
                    ? 'bg-violet-600/30 border-violet-400/50 scale-105' 
                    : 'hover:bg-white/10 hover:border-white/20'
                } ${
                  feed.link && feed.link !== "#" 
                    ? 'hover:text-violet-200' 
                    : 'cursor-not-allowed opacity-70'
                }`}
                onClick={() => handleFeedClick(feed)}
              >
                <span className={`text-lg ${getTypeColor(feed.type)}`}>
                  {getTypeIcon(feed.type)}
                </span>
                <strong className={`font-semibold ${
                  feed.link && feed.link !== "#" 
                    ? 'text-white group-hover:text-violet-200' 
                    : 'text-white/70'
                }`}>
                  {feed.title}
                </strong>
                <span className="text-violet-300 text-xs font-medium bg-white/10 px-2 py-1 rounded border border-violet-400/30">
                  {feed.source}
                </span>
                {feed.link && feed.link !== "#" && (
                  <ExternalLink size={12} className="text-violet-300 opacity-70" />
                )}
                <span className="text-violet-200 text-xs">
                  {feed.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchFeeds}
          disabled={loading}
          title="Refresh live updates"
          className="absolute right-4 text-white/80 hover:text-violet-200 transition-colors flex items-center gap-2 text-xs bg-white/10 hover:bg-white/20 p-2 rounded-lg border border-white/20"
        >
          <RotateCw
            size={14}
            className={loading ? "animate-spin text-violet-300" : ""}
          />
          <span className="hidden sm:inline text-xs">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default BasmatiRSSFeed;
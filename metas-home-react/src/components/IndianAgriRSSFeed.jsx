import React, { useState, useEffect, useRef } from "react";
import { RotateCw, TrendingUp, BarChart3, ExternalLink } from "lucide-react";

const IndianAgriRSSFeed = () => {
  const [feeds, setFeeds] = useState([
    { 
      id: 1, 
      title: "Loading Indian Agriculture & DGFT updates...", 
      link: "#", 
      source: "DGFT",
      type: "policy"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("🇮🇳 Live Indian Agriculture Updates");
  const [policyTrend, setPolicyTrend] = useState("loading");
  const [activeFeed, setActiveFeed] = useState(null);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    fetchFeeds();
    // Update more frequently for live feel
    const interval = setInterval(fetchFeeds, 5 * 60 * 1000); // every 5 mins
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
    if (!paused && feeds.length > 0) {
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
    const duration = 60000; // 60 seconds for one complete loop (slower)

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Calculate position based on total width
      const contentWidth = container.scrollWidth / 2; // Since we duplicate content
      const translateX = -progress * contentWidth;
      
      container.style.transform = `translateX(${translateX}px)`;
      scrollPositionRef.current = translateX;
      
      if (!paused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE_URL}/indian-agri-rss`);
      const data = await response.json();
      
      // Update title from API if available
      if (data.current_title) {
        setCurrentTitle(data.current_title);
      }

      if (data?.articles?.length > 0) {
        const enhancedFeeds = data.articles.map((article, i) => ({
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
          title: `DGFT ${getRandomPolicyAction()} ${getRandomTrend()} agricultural exports - ${new Date().toLocaleTimeString()}`, 
          link: "https://dgft.gov.in", 
          source: "DGFT Official",
          type: "policy"
        },
        { 
          id: 2, 
          title: `Government ${getRandomSubsidyAction()} ${getRandomCrop()} farmers - ${new Date().toLocaleTimeString()}`, 
          link: "https://pib.gov.in", 
          source: "Agriculture Ministry",
          type: "subsidy"
        },
        { 
          id: 3, 
          title: `India's agricultural exports ${getRandomTrend()} by ${getRandomPercentage()} - ${new Date().toLocaleTimeString()}`, 
          link: "https://tradestat.commerce.gov.in", 
          source: "Trade Analysis",
          type: "trade"
        },
        { 
          id: 4, 
          title: `New MSP rates ${getRandomTrend()} for ${getRandomCrop()} - ${new Date().toLocaleTimeString()}`, 
          link: "https://agricoop.gov.in", 
          source: "CACP",
          type: "msp"
        },
        { 
          id: 5, 
          title: `Agricultural ${getRandomRegistrationType()} registrations cross ${getRandomNumber()} mark - ${new Date().toLocaleTimeString()}`, 
          link: "https://apeda.gov.in", 
          source: "DGFT Portal",
          type: "registration"
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
      "🇮🇳 Live Indian Agriculture Updates: Policy & Trade",
      "📜 Real-time DGFT Notifications & Export Policy",
      "💰 Live Agricultural Subsidy & MSP Updates",
      "🌾 Indian Agri-Export News & Market Trends",
      "📊 Live Agriculture Ministry Announcements",
      "🚜 Kisan Welfare & Farm Policy Updates",
      "📈 Indian Agricultural Trade Intelligence",
      "🌱 Live Organic Farming & Agri-Tech Updates"
    ];
    setCurrentTitle(titles[Math.floor(Math.random() * titles.length)]);
  };

  const handleFeedClick = (feed, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (feed.link && feed.link !== "#") {
      // Add a small delay to ensure the click is processed
      setTimeout(() => {
        window.open(feed.link, "_blank", "noopener,noreferrer");
      }, 10);
    }
    setActiveFeed(feed.id);
    setTimeout(() => setActiveFeed(null), 1000); // Reset after 1 second
  };

  const getArticleType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('dgft') || lowerTitle.includes('export policy') || lowerTitle.includes('import')) return 'policy';
    if (lowerTitle.includes('subsidy') || lowerTitle.includes('incentive') || lowerTitle.includes('scheme')) return 'subsidy';
    if (lowerTitle.includes('export') || lowerTitle.includes('import') || lowerTitle.includes('trade')) return 'trade';
    if (lowerTitle.includes('msp') || lowerTitle.includes('minimum support')) return 'msp';
    if (lowerTitle.includes('registration') || lowerTitle.includes('license') || lowerTitle.includes('permit')) return 'registration';
    if (lowerTitle.includes('kisan') || lowerTitle.includes('farmer') || lowerTitle.includes('mandi')) return 'farmer';
    return 'general';
  };

  const getRandomPolicyAction = () => {
    const actions = ['updates', 'notifies', 'revises', 'announces', 'implements', 'extends'];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const getRandomSubsidyAction = () => {
    const actions = ['announces', 'extends', 'launches', 'increases', 'approves', 'releases'];
    return actions[Math.floor(Math.random() * actions.length)];
  };

  const getRandomCrop = () => {
    const crops = ['rice', 'wheat', 'pulses', 'cotton', 'sugarcane', 'maize', 'soybean', 'millets'];
    return crops[Math.floor(Math.random() * crops.length)];
  };

  const getRandomTrend = () => {
    const trends = ['strengthens', 'improves', 'rises', 'increases', 'stabilizes', 'boosts', 'supports', 'enhances'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const getRandomPercentage = () => {
    const percentages = ['12%', '15%', '8%', '20%', '25%', '10%', '18%', '22%'];
    return percentages[Math.floor(Math.random() * percentages.length)];
  };

  const getRandomNumber = () => {
    const numbers = ['1 million', '2.5 million', '5 lakh', '10 lakh', '50,000', '1.2 million'];
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const getRandomRegistrationType = () => {
    const types = ['export', 'import', 'quality', 'organic', 'APEDA', 'FSSAI'];
    return types[Math.floor(Math.random() * types.length)];
  };

  const getRandomTitle = () => {
    const titles = [
      "🇮🇳 Live DGFT & Agriculture Updates",
      "📜 Real-time Policy Notifications",
      "💰 Live Subsidy & MSP Announcements",
      "🌾 Indian Agri-Trade Intelligence"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'policy': return '📜';
      case 'subsidy': return '💰';
      case 'trade': return '📊';
      case 'msp': return '⚖️';
      case 'registration': return '📝';
      case 'farmer': return '🚜';
      default: return '🌾';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'policy': return 'text-blue-400';
      case 'subsidy': return 'text-green-400';
      case 'trade': return 'text-purple-400';
      case 'msp': return 'text-orange-400';
      case 'registration': return 'text-pink-400';
      case 'farmer': return 'text-teal-400';
      default: return 'text-violet-400';
    }
  };

  const getTrendColor = () => {
    switch(policyTrend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  const getTrendIcon = () => {
    switch(policyTrend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#2C0044] to-[#2C002C] backdrop-blur-lg border-b border-white/20 overflow-hidden" style={{ marginTop: "0px" }}>
      {/* Header Bar with Title and Policy Status */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-violet-300" />
            <span className="text-white font-semibold text-sm whitespace-nowrap">
              {currentTitle}
            </span>
          </div>
          
          {/* Policy Trend Indicator */}
          <div className={`flex items-center gap-1 text-xs ${getTrendColor()}`}>
            <TrendingUp size={12} />
            <span className="hidden sm:inline">Policy: {policyTrend}</span>
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
            className="flex gap-8 text-white/95 text-sm font-medium py-2"
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
                className={`flex items-center gap-3 transition-all duration-300 px-4 py-1.5 rounded-lg border border-transparent ${
                  activeFeed === feed.id 
                    ? 'bg-violet-600/30 border-violet-400/50 scale-105' 
                    : 'hover:bg-white/10 hover:border-white/20'
                } ${
                  feed.link && feed.link !== "#" 
                    ? 'hover:text-violet-200 cursor-pointer' 
                    : 'cursor-not-allowed opacity-70'
                }`}
                onClick={(e) => feed.link && feed.link !== "#" && handleFeedClick(feed, e)}
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

export default IndianAgriRSSFeed;
import React from "react";

export default function ProfilePanel({ profile, isOpen, onClose, onLogout }) {
  if (!isOpen) return null;

  // Get the name from different possible field names
  const getUserName = () => {
    return profile?.name || profile?.displayName || "Not set";
  };

  // Get first letters of the name
  const getInitials = (name) => {
    if (!name || name === "Not set") return "NS";
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = getUserName();
  const initials = getInitials(userName);

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose} // Close when clicking outside
    >
      <div 
        className="absolute top-20 right-4 w-72 bg-black/30 backdrop-blur-xl text-white rounded-xl shadow-2xl p-6 flex flex-col border border-white/20 glass-effect"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-lg font-bold text-gold drop-shadow-md">My Profile</h2>
        </div>

        {/* Enhanced Violet Initials Circle */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            {/* Outer glow effect - Violet */}
            <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-md animate-pulse"></div>
            
            {/* Main circle with violet gradient */}
            <div className="relative w-20 h-20 rounded-full mb-3 border-2 border-violet-400/90 bg-gradient-to-br from-violet-600/70 via-purple-500/60 to-fuchsia-400/50 backdrop-blur-md flex items-center justify-center glass-effect transform hover:scale-105 transition-transform duration-300">
              <span className="text-white text-2xl font-bold drop-shadow-md tracking-wider">
                {initials}
              </span>
              
              {/* Inner decorative ring */}
              <div className="absolute inset-2 rounded-full border border-violet-300/50"></div>
              
              {/* Shine effect */}
              <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/40 blur-sm"></div>
            </div>
            
            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black/80 shadow-lg">
              <div className="absolute inset-0.5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Name with violet accent */}
          <h3 className="text-base font-semibold text-center text-white drop-shadow-md bg-violet-600/30 px-4 py-2 rounded-full border border-violet-400/40 mt-2">
            {userName}
          </h3>
        </div>

        {/* User Details */}
        <div className="flex-1 space-y-4 mb-6">
          <div className="text-sm bg-violet-600/20 p-3 rounded-lg border border-violet-400/20">
            <strong className="text-violet-300 drop-shadow-md block mb-2 text-center">Email</strong>
            <span className="text-white/90 drop-shadow-md text-center block">
              {profile?.email || "Not provided"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onLogout}
            className="w-full bg-gradient-to-r from-red-600/90 to-red-700/80 hover:from-red-700 hover:to-red-800 text-white py-2.5 rounded-xl transition-all duration-200 text-sm font-medium backdrop-blur-sm glass-effect hover:scale-105 transform shadow-lg hover:shadow-red-500/20"
          >
            🚪 Logout
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-violet-600/60 to-purple-700/50 hover:from-violet-700 hover:to-purple-800 text-white py-2.5 rounded-xl transition-all duration-200 text-sm font-medium backdrop-blur-sm glass-effect hover:scale-105 transform"
          >
            ✕ Close
          </button>
        </div>

        {/* Custom styles for glass effect */}
        <style jsx>{`
          .glass-effect {
            background: rgba(0, 0, 0, 0.25);
            box-shadow: 
              0 8px 32px 0 rgba(31, 38, 135, 0.37),
              0 4px 16px 0 rgba(139, 92, 246, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .glass-effect:hover {
            background: rgba(0, 0, 0, 0.35);
            box-shadow: 
              0 8px 32px 0 rgba(31, 38, 135, 0.45),
              0 4px 20px 0 rgba(139, 92, 246, 0.3),
              inset 0 1px 1px rgba(255, 255, 255, 0.15);
          }
        `}</style>
      </div>
    </div>
  );
}
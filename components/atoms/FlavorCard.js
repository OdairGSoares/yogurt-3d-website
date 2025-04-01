"use client"

export default function FlavorCard({ 
  flavor, 
  isSelected = false,
  onClick,
  disabled = false,
  className = "",
  ...props 
}) {
  return (
    <button
      className={`
        relative p-3 rounded-xl transition-all duration-300 h-20 group overflow-hidden
        ${isSelected ? "shadow-lg scale-105" : "hover:shadow-lg hover:scale-[1.03]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      style={{
        backgroundColor: flavor.uiColor || flavor.color,
        color: flavor.textColor || "#fff",
        boxShadow: isSelected ? `0 8px 16px ${flavor.color}60` : '0 4px 8px rgba(0,0,0,0.1)',
        border: isSelected ? `2px solid ${flavor.color}` : '2px solid transparent'
      }}
      onClick={onClick}
      disabled={disabled || isSelected}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div 
          className={`font-bold text-base ${flavor.textColor === "#ffffff" ? "drop-shadow-md" : "drop-shadow-sm"}`}
        >
          {flavor.name}
        </div>
        
        {flavor.zeroLactose && (
          <div 
            className="mt-1 text-xs px-2 py-0.5 backdrop-blur-sm rounded-full inline-block self-start bg-white/40 shadow-sm"
          >
            Zero Lactose
          </div>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full bg-white flex items-center justify-center shadow-md">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-3 h-3"
            style={{ color: flavor.color }}
          >
            <path 
              fillRule="evenodd" 
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}
    </button>
  );
} 
"use client"

export default function CategoryPill({ 
  children, 
  isSelected = false,
  onClick,
  color = "#7E22CE",
  disabled = false,
  className = "",
  isMobile = false,
  ...props 
}) {
  return (
    <button
      className={`
        rounded-full font-medium transition-all duration-300
        ${isSelected ? "text-white shadow-md" : "bg-white/90 border shadow-sm"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${isMobile ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}
        ${className}
      `}
      style={{
        backgroundColor: isSelected ? color : undefined,
        color: isSelected ? '#fff' : color,
        borderColor: isSelected ? 'transparent' : `${color}40`,
        boxShadow: isSelected ? `0 4px 8px ${color}40` : undefined
      }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
} 
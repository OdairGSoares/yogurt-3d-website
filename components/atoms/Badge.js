"use client"

export default function Badge({ 
  children, 
  className = "", 
  color = "#10B981", 
  variant = "default",
  ...props 
}) {
  const variants = {
    default: "bg-white/40 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full inline-block shadow-sm",
    dot: "flex items-center gap-2"
  };

  // Renderização baseada na variante
  if (variant === "dot") {
    return (
      <div className={`${variants.dot} ${className}`} {...props}>
        <div 
          className="h-6 w-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-4 h-4"
            style={{ color }}
          >
            <path 
              fillRule="evenodd" 
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <span className="text-sm font-medium" style={{ color }}>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`${variants.default} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
} 
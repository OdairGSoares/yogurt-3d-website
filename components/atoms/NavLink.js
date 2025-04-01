"use client"

export default function NavLink({ 
  href = "#", 
  children, 
  isActive = false, 
  color = "#7E22CE",
  className = "" 
}) {
  return (
    <a 
      href={href}
      className={`
        text-sm font-medium transition-colors duration-300
        ${isActive ? "font-semibold opacity-100" : "font-normal opacity-80 hover:opacity-100"}
        ${className}
      `}
      style={{ color }}
    >
      {children}
    </a>
  );
} 
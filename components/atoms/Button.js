"use client"

export default function Button({ 
  children, 
  onClick, 
  className = "", 
  color = "#7E22CE", 
  variant = "primary", 
  disabled = false,
  fullWidth = false,
  ...props 
}) {
  const baseClasses = `
    py-3 px-8 rounded-full font-medium transition-colors duration-300 
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  // Variantes de estilo usando Tailwind
  const variants = {
    primary: `
      text-white shadow-md hover:opacity-90
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    secondary: `
      bg-white/90 hover:bg-white shadow-sm border
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `,
    link: `
      bg-transparent hover:underline
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
      style={variant === 'primary' ? { backgroundColor: color } : 
             variant === 'secondary' ? { color, borderColor: `${color}40` } : 
             { color }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
} 
"use client"

export default function Toggle({ 
  isOpen = false, 
  onClick, 
  color = "#7E22CE",
  className = "",
  style = {},
  ...props
}) {
  // Cria uma versão mais escura da cor para hover
  const darkerColor = () => {
    // Converte cor hex para RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Escurece 15%
    const darkerR = Math.max(0, Math.floor(r * 0.85));
    const darkerG = Math.max(0, Math.floor(g * 0.85));
    const darkerB = Math.max(0, Math.floor(b * 0.85));
    
    // Converte de volta para hex
    return `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
  };
  
  return (
    <button 
      onClick={onClick}
      className={`
        h-12 w-8 rounded-r-lg shadow-md transition-all duration-500 
        flex items-center justify-center pointer-events-auto
        hover:scale-105 active:scale-95 cursor-pointer
        ${className}
      `}
      style={{ 
        backgroundColor: color,
        ...style
      }}
      {...props}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2.5} 
        stroke="white" 
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
} 
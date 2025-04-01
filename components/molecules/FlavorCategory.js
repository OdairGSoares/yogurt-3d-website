"use client"

export default function FlavorCategory({ 
  category, 
  color = "#7E22CE",
  categoryLabels = {
    tradicionais: "Tradicionais",
    frutas: "Frutas",
    especiais: "Especiais"
  }
}) {
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div 
      className="inline-block px-4 py-1.5 rounded-full transition-all duration-1000 border"
      style={{ 
        backgroundColor: `${color}20`,
        borderColor: `${color}40`
      }}
    >
      <span 
        className="text-sm font-semibold"
        style={{ color }}
      >
        {categoryLabels[category] || categoryName}
      </span>
    </div>
  );
} 
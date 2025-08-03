"use client"

export default function NutritionItem({ label, value, color = "#374151" }) {
  // Usar uma cor mais escura para melhor contraste na sidebar
  const textColor = color === "#374151" ? "#1f2937" : color;
  
  return (
    <div className="flex justify-between">
      <span className="text-sm font-medium" style={{ color: textColor }}>
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: textColor }}>
        {value}
      </span>
    </div>
  );
} 
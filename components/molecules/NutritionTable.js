"use client"

import NutritionItem from "../atoms/NutritionItem"

export default function NutritionTable({ nutritionData = null, color = "#7E22CE" }) {
  // Dados padrão se não forem fornecidos
  const defaultData = [
    { label: "Calorias", value: "120 kcal" },
    { label: "Proteínas", value: "4g" },
    { label: "Carboidratos", value: "18g" },
    { label: "Gorduras", value: "3.5g" }
  ]

  const data = nutritionData || defaultData

  return (
    <div className="pt-6">
      <h3 className="text-lg font-semibold mb-2" style={{ color }}>
        Informações Nutricionais
      </h3>
      <div className="space-y-2">
        {data.map((item, index) => (
          <NutritionItem 
            key={index} 
            label={item.label} 
            value={item.value} 
          />
        ))}
      </div>
    </div>
  )
} 
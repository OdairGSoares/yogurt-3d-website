"use client"

import FlavorCategory from "../molecules/FlavorCategory"
import FeatureBadges from "../molecules/FeatureBadges"
import ActionButtons from "../molecules/ActionButtons"
import NutritionTable from "../molecules/NutritionTable"

export default function FlavorInfo({ 
  flavor, 
  category,
  categoryLabels,
  onClose,
  isMobile = false
}) {
  if (!flavor) return null;

  // Converter dados nutricionais do formato flavors.js para o formato esperado pelo NutritionTable
  const nutritionData = flavor.nutritionData ? flavor.nutritionData.map(item => ({
    label: item.name,
    value: item.value
  })) : null;

  return (
    <div className="space-y-6 relative">
      {/* Botão de fechar para mobile */}
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ color: flavor.color }}
          aria-label="Fechar sidebar"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <FlavorCategory 
        category={category} 
        color={flavor.color}
        categoryLabels={categoryLabels}
      />
      
      <h2 
        className="text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-1000 drop-shadow-sm"
        style={{ color: flavor.color }}
      >
        {flavor.name}
      </h2>
      
      <p className="text-base max-w-xl font-medium" style={{ color: "#374151" }}>
        {flavor.description}
      </p>

      <FeatureBadges 
        isZeroLactose={flavor.isZeroLactose} 
        features={flavor.features}
        color={flavor.color}
      />

      <ActionButtons color={flavor.color} />
      
      <NutritionTable 
        nutritionData={nutritionData} 
        color={flavor.color} 
      />
    </div>
  )
} 
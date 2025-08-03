"use client"

import CategorySelector from "../molecules/CategorySelector"
import FlavorGrid from "../molecules/FlavorGrid"

export default function FlavorSelector({
  categories = [],
  flavors = [],
  selectedCategory,
  selectedFlavor,
  onCategoryChange,
  onFlavorChange,
  isTransitioning = false,
  isMobile = false
}) {
  const categoryLabels = {
    tradicionais: "Tradicionais",
    frutas: "Frutas",
    especiais: "Especiais",
  }

  return (
    <div 
      className={`backdrop-blur-md rounded-3xl shadow-xl border transition-all duration-1000 relative z-10 pointer-events-auto bg-white/90 ${
        isMobile ? 'p-3' : 'p-6'
      }`}
      style={{ 
        borderColor: `${selectedFlavor.color}60`,
      }}
    >
      <div className="flex items-center mb-4">
        <div 
          className="w-1.5 h-6 rounded-full mr-2"
          style={{ backgroundColor: selectedFlavor.color }}
        ></div>
        <h3 
          className={`font-bold transition-colors duration-1000 ${
            isMobile ? 'text-base' : 'text-lg'
          }`}
          style={{ color: selectedFlavor.color }}
        >
          Escolha seu sabor
        </h3>
      </div>
      
      <CategorySelector 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categoryLabels={categoryLabels}
        color={selectedFlavor.color}
        isTransitioning={isTransitioning}
        isMobile={isMobile}
      />

      <FlavorGrid 
        flavors={flavors}
        selectedFlavor={selectedFlavor}
        onFlavorChange={onFlavorChange}
        isTransitioning={isTransitioning}
        isMobile={isMobile}
      />
    </div>
  )
} 
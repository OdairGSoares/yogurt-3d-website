"use client"

import FlavorCategory from "../molecules/FlavorCategory"
import FeatureBadges from "../molecules/FeatureBadges"
import ActionButtons from "../molecules/ActionButtons"
import NutritionTable from "../molecules/NutritionTable"

export default function FlavorInfo({ 
  flavor, 
  category,
  categoryLabels
}) {
  if (!flavor) return null;

  return (
    <div className="space-y-6">
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
      
      <p className="text-base max-w-xl text-gray-700">
        {flavor.description}
      </p>

      <FeatureBadges 
        isZeroLactose={flavor.zeroLactose} 
        color={flavor.color}
      />

      <ActionButtons color={flavor.color} />
      
      <NutritionTable color={flavor.color} />
    </div>
  )
} 
"use client"

import FlavorCard from "../atoms/FlavorCard"

export default function FlavorGrid({
  flavors = [],
  selectedFlavor,
  onFlavorChange,
  isTransitioning = false
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {flavors.map((flavor) => (
        <FlavorCard
          key={flavor.id}
          flavor={flavor}
          isSelected={selectedFlavor.id === flavor.id}
          onClick={() => onFlavorChange(flavor)}
          disabled={isTransitioning}
        />
      ))}
    </div>
  )
} 
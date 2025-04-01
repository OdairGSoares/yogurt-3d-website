"use client"

import CategoryPill from "../atoms/CategoryPill"

export default function CategorySelector({
  categories = [],
  selectedCategory,
  onCategoryChange,
  categoryLabels = {},
  color = "#7E22CE",
  isTransitioning = false
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <CategoryPill
          key={category}
          isSelected={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
          color={color}
          disabled={isTransitioning}
        >
          {categoryLabels[category] || category}
        </CategoryPill>
      ))}
    </div>
  )
} 
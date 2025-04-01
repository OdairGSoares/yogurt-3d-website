"use client"

import Badge from "../atoms/Badge"

export default function FeatureBadges({ isZeroLactose = false, color = "#7E22CE" }) {
  return (
    <div className="pt-2 space-y-4">
      {isZeroLactose && (
        <Badge 
          variant="dot" 
          color="#10B981"
        >
          Zero Lactose
        </Badge>
      )}
      
      <Badge 
        variant="dot" 
        color={color}
      >
        100% Natural
      </Badge>
    </div>
  )
} 
"use client"

import Badge from "../atoms/Badge"

export default function FeatureBadges({ 
  isZeroLactose = false, 
  features = [],
  color = "#7E22CE" 
}) {
  return (
    <div className="pt-2 space-y-2">
      {/* Badge de Zero Lactose */}
      {isZeroLactose && (
        <Badge 
          variant="dot" 
          color="#10B981"
        >
          Zero Lactose
        </Badge>
      )}
      
      {/* Features específicas do flavor */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge 
              key={index}
              variant="dot" 
              color={color}
            >
              {feature}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Badge padrão */}
      <Badge 
        variant="dot" 
        color={color}
      >
        100% Natural
      </Badge>
    </div>
  )
} 
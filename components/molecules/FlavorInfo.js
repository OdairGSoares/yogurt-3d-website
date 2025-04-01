"use client"

import { useState } from "react"
import Button from "@/components/atoms/Button"
import NutritionTable from "@/components/molecules/NutritionTable"
import FeatureBadges from "@/components/molecules/FeatureBadges"
import CategorySelector from "@/components/molecules/CategorySelector"

export default function FlavorInfo({ flavor, flavorsData, onChangeFlavorClick }) {
  const [activeTab, setActiveTab] = useState("description")

  // Encontrar sabores da mesma categoria
  const relatedFlavors = flavorsData.filter(f => 
    f.category === flavor.category && f.id !== flavor.id
  ).slice(0, 3) // Limitar a 3 sabores relacionados

  return (
    <div 
      className={`w-full h-full p-6 overflow-y-auto bg-opacity-60`}
      style={{ 
        backgroundColor: flavor.bgColor,
        color: flavor.textColor || "#000"
      }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{flavor.name}</h1>
        <p className="text-sm uppercase tracking-wider mb-4">
          {flavor.category} {flavor.isZeroLactose && "• Zero Lactose"}
        </p>
      </div>

      {/* Navegação entre abas */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`px-4 py-2 ${activeTab === "description" ? "border-b-2 border-current font-bold" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Descrição
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "nutrition" ? "border-b-2 border-current font-bold" : ""}`}
          onClick={() => setActiveTab("nutrition")}
        >
          Nutrição
        </button>
      </div>

      {/* Conteúdo da aba */}
      <div className="mb-8">
        {activeTab === "description" ? (
          <div>
            <p className="mb-4">{flavor.description}</p>
            <FeatureBadges features={flavor.features} color={flavor.color} />
          </div>
        ) : (
          <NutritionTable nutritionData={flavor.nutritionData} />
        )}
      </div>

      {/* Sabores relacionados */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sabores Relacionados</h2>
        <div className="grid grid-cols-3 gap-4">
          {relatedFlavors.map((relatedFlavor) => (
            <div 
              key={relatedFlavor.id}
              className="p-3 rounded-lg cursor-pointer transition-all hover:scale-105"
              style={{ 
                backgroundColor: relatedFlavor.bgColor,
                color: relatedFlavor.textColor 
              }}
              onClick={() => onChangeFlavorClick(relatedFlavor)}
            >
              <p className="font-medium text-center">{relatedFlavor.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navegação entre todos os sabores */}
      <div className="mt-auto">
        <h2 className="text-xl font-semibold mb-4">Explore Todos os Sabores</h2>
        <CategorySelector 
          flavorsData={flavorsData} 
          selectedFlavor={flavor} 
          onFlavorSelect={onChangeFlavorClick}
        />
      </div>
    </div>
  )
} 
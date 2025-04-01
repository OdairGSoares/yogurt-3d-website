"use client"

export default function NutritionItem({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
} 
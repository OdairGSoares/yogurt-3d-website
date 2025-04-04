export const flavorsData = [
  // TRADICIONAIS
  {
    id: "desnatado",
    name: "Desnatado",
    color: "#6b7280",
    bgColor: "#f0f0f0",
    secondaryColor: "#9ca3af",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Iogurte desnatado com baixo teor de gordura. Leve e nutritivo, ideal para dietas equilibradas e para quem busca uma opção mais saudável.",
    isZeroLactose: false,
    modelPath: "/Mel.glb",
    features: ["Baixa Gordura", "Rico em Proteínas", "Sem Açúcar Adicionado"],
    nutritionData: [
      { name: "Calorias", value: "80kcal" },
      { name: "Proteínas", value: "5g" },
      { name: "Carboidratos", value: "12g" },
      { name: "Gorduras", value: "0.5g" }
    ]
  },
  {
    id: "coalhada",
    name: "Coalhada",
    color: "#4b5563",
    bgColor: "#f9fafb",
    secondaryColor: "#e5e7eb",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Coalhada tradicional com textura firme e sabor autêntico. Rica em proteínas e probióticos, perfeita para o café da manhã ou lanche da tarde.",
    isZeroLactose: false,
    modelPath: "/Ameixa.glb",
    features: ["Probióticos", "Textura Firme", "Versátil"],
    nutritionData: [
      { name: "Calorias", value: "110kcal" },
      { name: "Proteínas", value: "6g" },
      { name: "Carboidratos", value: "9g" },
      { name: "Gorduras", value: "5g" }
    ]
  },
  {
    id: "natural",
    name: "Natural",
    color: "#6b7280",
    bgColor: "#f0f0f0",
    secondaryColor: "#d1d5db",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Iogurte natural puro sem adição de açúcares. Versátil e saudável, pode ser consumido puro ou como base para receitas doces e salgadas.",
    isZeroLactose: false,
    modelPath: "/Ameixa.glb",
    features: ["Sem Açúcar", "Versátil", "Sem Conservantes"],
    nutritionData: [
      { name: "Calorias", value: "95kcal" },
      { name: "Proteínas", value: "5.5g" },
      { name: "Carboidratos", value: "7g" },
      { name: "Gorduras", value: "4g" }
    ]
  },
  
  // FRUTAS
  {
    id: "ameixa",
    name: "Ameixa",
    color: "#7e22ce",
    bgColor: "#f3e8ff",
    secondaryColor: "#c084fc",
    textColor: "#ffffff",
    category: "Frutas",
    description:
      "Iogurte com pedaços de ameixa suculenta. Combina a doçura natural da fruta com a cremosidade do iogurte, trazendo um sabor único e nutritivo.",
    isZeroLactose: false,
    modelPath: "/Ameixa.glb",
    features: ["Pedaços de Fruta", "Rica em Fibras", "Sabor Intenso"],
    nutritionData: [
      { name: "Calorias", value: "120kcal" },
      { name: "Proteínas", value: "4g" },
      { name: "Carboidratos", value: "18g" },
      { name: "Gorduras", value: "3g" }
    ]
  },
  {
    id: "cenouraLaranja",
    name: "Cenoura & Laranja",
    color: "#ea580c",
    bgColor: "#ffedd5",
    secondaryColor: "#fb923c",
    textColor: "#ffffff",
    category: "Frutas",
    description:
      "Mistura inovadora de cenoura e laranja que combina vitaminas e sabor cítrico refrescante. Uma experiência surpreendente para o paladar.",
    isZeroLactose: false,
    modelPath: "/Ameixa.glb",
    features: ["Rico em Betacaroteno", "Cítrico", "Refrescante"],
    nutritionData: [
      { name: "Calorias", value: "105kcal" },
      { name: "Proteínas", value: "4g" },
      { name: "Carboidratos", value: "15g" },
      { name: "Gorduras", value: "3g" }
    ]
  },
  
  // ESPECIAIS
  {
    id: "mel",
    name: "Mel",
    color: "#ca8a04",
    bgColor: "#fef9c3",
    secondaryColor: "#facc15",
    textColor: "#ffffff",
    category: "Especial",
    description: 
      "Iogurte adoçado com mel puro. A combinação perfeita da doçura natural do mel com a cremosidade do iogurte para um sabor reconfortante.",
    isZeroLactose: false,
    modelPath: "/Mel.glb",
    features: ["Mel 100% Natural", "Propriedades Antibacterianas", "Energético"],
    nutritionData: [
      { name: "Calorias", value: "130kcal" },
      { name: "Proteínas", value: "4.5g" },
      { name: "Carboidratos", value: "22g" },
      { name: "Gorduras", value: "3g" }
    ]
  }
]

// Caminhos de fallback para modelos 3D
export const DEFAULT_MODEL_PATHS = {
  default: "/Ameixa.glb"
}


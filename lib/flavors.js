export const flavorsData = [
  // TRADICIONAIS
  {
    id: "desnatado",
    name: "Desnatado",
    color: "#007A3B",
    bgColor: "#e6f7ed",
    secondaryColor: "#00a050",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Iogurte desnatado com baixo teor de gordura. Leve e nutritivo, ideal para dietas equilibradas e para quem busca uma opção mais saudável.",
    isZeroLactose: false,
    texturePath: "/Texturas/Desnatado.jpg",
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
    color: "#C10F71",
    bgColor: "#fce7f3",
    secondaryColor: "#e91e63",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Coalhada tradicional com textura firme e sabor autêntico. Rica em proteínas e probióticos, perfeita para o café da manhã ou lanche da tarde.",
    isZeroLactose: false,
    texturePath: "/Texturas/Coalhada.jpg",
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
    color: "#0070B2",
    bgColor: "#e6f3ff",
    secondaryColor: "#2196f3",
    textColor: "#ffffff",
    category: "Tradicional",
    description:
      "Iogurte natural puro sem adição de açúcares. Versátil e saudável, pode ser consumido puro ou como base para receitas doces e salgadas.",
    isZeroLactose: false,
    texturePath: "/Texturas/Natural.jpg",
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
    texturePath: "/Texturas/Ameixa.jpg",
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
    texturePath: "/Texturas/Cenoura Laranja e Mel.jpg",
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
    texturePath: "/Texturas/Mel.jpg",
    features: ["Mel 100% Natural", "Propriedades Antibacterianas", "Energético"],
    nutritionData: [
      { name: "Calorias", value: "130kcal" },
      { name: "Proteínas", value: "4.5g" },
      { name: "Carboidratos", value: "22g" },
      { name: "Gorduras", value: "3g" }
    ]
  }
]

// Caminhos de fallback para modelos 3D e texturas
export const DEFAULT_MODEL_PATHS = {
  default: "/Vigor.gltf"
}

export const DEFAULT_TEXTURE_PATHS = {
  default: "/Texturas/Natural.jpg"
}


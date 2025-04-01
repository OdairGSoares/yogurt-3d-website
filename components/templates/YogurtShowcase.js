"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from 'next/dynamic'
import Header from "../organisms/Header"
import Sidebar from "../organisms/Sidebar"
import FlavorSelector from "../organisms/FlavorSelector"
import ModelViewer from "../organisms/ModelViewer"

// Loading placeholder while the model viewer loads
function LoadingPlaceholder({ flavor }) {
  const bgColor = flavor?.bgColor || "#f0f0f0";
  
  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{ 
        background: `linear-gradient(to bottom, ${bgColor}, ${bgColor}40)`,
        borderRadius: '8px',
      }}
    >
      <div className="text-center p-6">
        <h3 className="text-xl font-bold mb-2">{flavor?.name || "Yogurt"}</h3>
        <p className="text-slate-600">Carregando modelo...</p>
      </div>
    </div>
  )
}

export default function YogurtShowcase({ flavorsData }) {
  // Validação de dados básicos
  const isValidData = Array.isArray(flavorsData) && flavorsData.length > 0;
  
  // Converter array plano para estrutura organizada por categorias
  const organizeFlavorsByCategory = (flavors) => {
    if (!Array.isArray(flavors) || flavors.length === 0) {
      return {
        tradicionais: [],
        frutas: [],
        especiais: []
      };
    }
    
    const categorized = {
      tradicionais: [],
      frutas: [],
      especiais: []
    };
    
    flavors.forEach(flavor => {
      const category = flavor.category?.toLowerCase() || "";
      
      if (category.includes("tradicional")) {
        categorized.tradicionais.push(flavor);
      } else if (category.includes("fruta")) {
        categorized.frutas.push(flavor);
      } else if (category.includes("especial")) {
        categorized.especiais.push(flavor);
      } else {
        // Caso não tenha uma categoria correspondente, colocar em tradicionais
        categorized.tradicionais.push(flavor);
      }
    });
    
    return categorized;
  };
  
  // Fallback para caso não haja dados
  const flavorsFallback = {
    tradicionais: [{
      id: "default",
      name: "Yogurt",
      color: "#6b7280",
      bgColor: "#f0f0f0",
      secondaryColor: "#9ca3af",
      textColor: "#ffffff",
      category: "Tradicional",
      description: "Carregando informações do yogurt...",
      isZeroLactose: false,
    }],
    frutas: [],
    especiais: []
  };
  
  // Organizar sabores por categoria ou usar fallback
  const organizedFlavors = isValidData 
    ? organizeFlavorsByCategory(flavorsData) 
    : flavorsFallback;
  
  // Verificar categoria com maior prioridade que tenha dados
  const getInitialCategory = () => {
    if (organizedFlavors.tradicionais.length > 0) return "tradicionais";
    if (organizedFlavors.frutas.length > 0) return "frutas";
    if (organizedFlavors.especiais.length > 0) return "especiais";
    return "tradicionais";
  };
  
  // Calcular categoria inicial
  const initialCategory = getInitialCategory();
  
  // Inicializar estados
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFlavor, setSelectedFlavor] = useState(
    organizedFlavors[initialCategory][0] || flavorsFallback.tradicionais[0]
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Confirmar que estamos no cliente
  useEffect(() => {
    setIsClient(true);
    
    // Verificar novamente os dados no cliente
    if (isValidData) {
      const category = getInitialCategory();
      setSelectedCategory(category);
      setSelectedFlavor(organizedFlavors[category][0]);
    }
  }, []);

  // Duração da transição em milissegundos
  const transitionDuration = 800;

  const categoryLabels = {
    tradicionais: "Tradicionais",
    frutas: "Frutas",
    especiais: "Especiais",
  }

  // Filtrar categorias vazias
  const availableCategories = Object.keys(organizedFlavors).filter(
    category => organizedFlavors[category].length > 0
  );

  const handleCategoryChange = (category) => {
    if (!organizedFlavors[category] || organizedFlavors[category].length === 0) {
      console.error(`Categoria ${category} não encontrada ou vazia`);
      return;
    }
    
    setSelectedCategory(category)
    const newFlavor = organizedFlavors[category][0];
    
    // Começar a transição
    setIsTransitioning(true)
    
    // Atualizar o flavor após o término da animação
    setTimeout(() => {
      setSelectedFlavor(newFlavor)
      setIsTransitioning(false)
      // Abrir a sidebar automaticamente quando muda de categoria
      setSidebarOpen(true)
    }, transitionDuration)
  }

  const handleFlavorChange = (flavor) => {
    if (isTransitioning) return

    setIsTransitioning(true)
    
    setTimeout(() => {
      setSelectedFlavor(flavor)
      setIsTransitioning(false)
      // Abrir a sidebar automaticamente quando seleciona um novo sabor
      setSidebarOpen(true)
    }, transitionDuration)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Se não tivermos dados válidos, mostrar somente um placeholder
  if (!isValidData && !isClient) {
    return (
      <main className="min-h-screen w-full overflow-hidden">
        <LoadingPlaceholder />
      </main>
    );
  }

  // Pega o caminho do modelo a ser mostrado
  const modelPath = selectedFlavor.modelPath || "/Ameixa.glb";

  return (
    <main className="min-h-screen w-full overflow-hidden">
      {/* Fade-in/Fade-out overlay durante a transição */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-50 pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 0.5,
                transition: { 
                  duration: transitionDuration / 2000,
                  ease: "easeInOut" 
                }
              },
              exit: { 
                opacity: 0,
                transition: { 
                  duration: transitionDuration / 2000,
                  ease: "easeInOut",
                  delay: transitionDuration / 2000
                }
              }
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Conteúdo principal */}
      <div className="fixed inset-0 pointer-events-none"
           style={{ backgroundColor: selectedFlavor.bgColor }}>
        
        {/* Background com cor do flavor */}
        <div className="absolute inset-0" 
             style={{ 
               background: `linear-gradient(to bottom, ${selectedFlavor.bgColor}, ${selectedFlavor.bgColor}40)`,
               opacity: 0.8
             }}>
        </div>
        
        {/* Modelo 3D */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full">
             <ModelViewer 
               key={selectedFlavor.id} 
               modelPath={selectedFlavor.modelPath || '/Ameixa.glb'}
               bgColor={selectedFlavor.bgColor}
             />
          </div>
        </div>

        {/* Elementos interativos */}
        <div className="absolute inset-0 pointer-events-none">
          {/* O resto da UI com AnimatePresence para garantir transições suaves */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFlavor.id} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Header 
                flavorColor={selectedFlavor.color}
                sidebarOpen={sidebarOpen}
              />

              <Sidebar 
                isOpen={sidebarOpen}
                onToggle={toggleSidebar}
                flavor={selectedFlavor}
                category={selectedFlavor.category}
                categoryLabels={categoryLabels}
              />
            </motion.div>
          </AnimatePresence>

          {/* Flavor Selection Section */}
          <div className="fixed bottom-0 left-0 w-full px-4 md:px-8 pb-8 pt-4 pointer-events-auto" style={{ zIndex: 30 }}>
            <div className="max-w-4xl mx-auto">
              <FlavorSelector
                categories={availableCategories}
                flavors={organizedFlavors[selectedCategory] || []}
                selectedCategory={selectedCategory}
                selectedFlavor={selectedFlavor}
                onCategoryChange={handleCategoryChange}
                onFlavorChange={handleFlavorChange}
                isTransitioning={isTransitioning}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 
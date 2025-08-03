"use client"

import Toggle from "../atoms/Toggle"
import FlavorInfo from "./FlavorInfo"

export default function Sidebar({ 
  isOpen = false, 
  onToggle,
  flavor,
  category,
  categoryLabels,
  isMobile = false
}) {
  const sidebarWidth = 350;
  
  return (
    <>
      {/* Sidebar Panel */}
      <div 
        className={`
          fixed left-0 top-[96px] h-[calc(100vh-96px)] 
          transition-all duration-500 ease-in-out pointer-events-auto z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          width: `${sidebarWidth}px`
        }}
      >
        <div 
          className="h-full backdrop-blur-sm p-8 space-y-6 overflow-y-auto transition-all duration-1000 shadow-xl relative bg-white/95 border-r-4"
          style={{ 
            borderColor: flavor.color
          }}
        >
          {/* Gradient shadow para conectar com o header */}
          <div 
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none opacity-70"
            style={{ 
              background: `linear-gradient(to bottom, ${flavor.color}20, transparent)`
            }}
          ></div>
          
          <div 
            className="h-1 w-20 -mt-2 mb-8 rounded-full relative z-10"
            style={{ backgroundColor: flavor.color }}
          ></div>
          
          <FlavorInfo 
            flavor={flavor}
            category={category} 
            categoryLabels={categoryLabels}
            onClose={onToggle}
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Toggle button for sidebar - positioned outside of sidebar */}
      <div 
        className="fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-500 pointer-events-auto"
        style={{ 
          left: isOpen ? `${sidebarWidth}px` : '0px',
        }}
      >
        <Toggle 
          isOpen={isOpen}
          onClick={onToggle}
          color={flavor.color}
        />
      </div>
    </>
  )
} 
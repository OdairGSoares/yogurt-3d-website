"use client"

import Logo from '../atoms/Logo'
import Navigation from '../molecules/Navigation'
import Button from '../atoms/Button'

export default function Header({ 
  flavorColor = "#7E22CE",
  sidebarOpen = false 
}) {
  return (
    <header 
      className={`
        w-full px-4 py-4 md:px-8 md:py-6 fixed top-0 left-0 right-0 
        backdrop-blur-sm transition-all duration-1000 pointer-events-auto z-50 h-24
        ${sidebarOpen ? 'shadow-none' : 'shadow-sm'}
        border-b
      `}
      style={{ 
        backgroundColor: `${flavorColor}20`,
        borderColor: sidebarOpen ? `${flavorColor}60` : `${flavorColor}30`
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo flavorColor={flavorColor} />
        <Navigation color={flavorColor} />
        <Button 
          className="hidden md:block"
          color={flavorColor}
        >
          Comprar
        </Button>
      </div>
    </header>
  )
} 
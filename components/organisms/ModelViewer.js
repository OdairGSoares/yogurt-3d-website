"use client"

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'
import React from 'react'

// Loading component otimizado
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-4 text-gray-600">Carregando modelo 3D...</p>
    </div>
  </div>
)

// Error component
const ErrorFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center">
      <p className="text-red-600">Erro ao carregar o modelo 3D</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tentar novamente
      </button>
    </div>
  </div>
)

// Dynamic import otimizado do componente 3D
const ThreeCanvas = dynamic(
  () => import('./ThreeCanvas').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoadingFallback />,
    // Adicionar timeout para evitar carregamento infinito
    timeout: 10000
  }
)

const ModelViewer = ({ modelPath = '/Vigor.gltf', texturePath = '/Texturas/Natural.jpg', bgColor = '#f0f0f0' }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Gerenciar estado de carregamento
  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    
    // Simular tempo mínimo de carregamento para evitar flash
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [modelPath, texturePath])

  // Tratamento de erro
  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return <ErrorFallback />
  }

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          {isLoading ? (
            <LoadingFallback />
          ) : (
            <ThreeCanvas 
              modelPath={modelPath} 
              texturePath={texturePath} 
              bgColor={bgColor}
              onError={handleError}
            />
          )}
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

// Error boundary otimizado
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in 3D viewer:', error, errorInfo)
    
    // Log adicional para debugging
    if (process.env.NODE_ENV === 'development') {
      console.group('3D Viewer Error Details')
      console.error('Error:', error)
      console.error('Error Info:', errorInfo)
      console.error('Component Stack:', errorInfo.componentStack)
      console.groupEnd()
    }
  }

  componentDidUpdate(prevProps) {
    // Reset error state when props change
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false, error: null })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ModelViewer
"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import React from 'react'

// Loading component
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

// Dynamic import of the 3D viewer component
const ThreeCanvas = dynamic(
  () => import('./ThreeCanvas').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <LoadingFallback />
  }
)

const ModelViewer = ({ modelPath = '/Ameixa.glb', bgColor = '#f0f0f0' }) => {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ThreeCanvas modelPath={modelPath} bgColor={bgColor} />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in 3D viewer:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

export default ModelViewer
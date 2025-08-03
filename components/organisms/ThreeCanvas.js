"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import * as THREE from 'three'
import { useMobile } from '../../lib/hooks/useMobile'

// Cache global para texturas
const textureCache = new Map()

function Model({ modelPath, texturePath, bgColor, isTransitioning, isMobile }) {
  const [texture, setTexture] = useState(null)
  const [opacity, setOpacity] = useState(0)
  const [textureError, setTextureError] = useState(false)
  const [isTextureLoaded, setIsTextureLoaded] = useState(false)
  
  const meshRef = useRef()
  const textureLoader = useMemo(() => new THREE.TextureLoader(), [])

  // Carregar modelo GLTF usando o hook useGLTF
  const { scene } = useGLTF(modelPath)

  // Carregar textura com cache e otimizações
  const loadTexture = useCallback(async () => {
    setTextureError(false)
    setIsTextureLoaded(false)
    
    console.log('Carregando textura:', texturePath)
    
    // Verificar cache primeiro
    if (textureCache.has(texturePath)) {
      const cachedTexture = textureCache.get(texturePath)
      console.log('Textura encontrada no cache:', texturePath)
      setTexture(cachedTexture)
      setIsTextureLoaded(true)
      return
    }
    
    try {
      const loadedTexture = await new Promise((resolve, reject) => {
        textureLoader.load(
          texturePath,
          (texture) => {
            console.log('Textura carregada com sucesso:', texturePath)
            // Configurar propriedades da textura otimizadas
            texture.wrapS = THREE.ClampToEdgeWrapping
            texture.wrapT = THREE.ClampToEdgeWrapping
            texture.encoding = THREE.sRGBEncoding
            texture.flipY = false
            texture.generateMipmaps = true
            texture.minFilter = THREE.LinearMipmapLinearFilter
            texture.magFilter = THREE.LinearFilter
            
            // Adicionar ao cache
            textureCache.set(texturePath, texture)
            resolve(texture)
          },
          undefined,
          (error) => {
            console.error('Erro no carregamento da textura:', texturePath, error)
            reject(error)
          }
        )
      })
      
      setTexture(loadedTexture)
      setTextureError(false)
      setIsTextureLoaded(true)
    } catch (error) {
      console.error('Erro ao carregar textura:', texturePath, error)
      setTextureError(true)
      setTexture(null)
      setIsTextureLoaded(false)
    }
  }, [texturePath, textureLoader])

  useEffect(() => {
    loadTexture()
  }, [loadTexture])

  // Controlar opacidade durante transições
  useEffect(() => {
    if (isTransitioning) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  }, [isTransitioning])

  // Aplicar textura ao modelo quando disponível - otimizado
  useEffect(() => {
    if (!scene) return
    
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Aplicar a textura ao material se disponível
        if (texture && !textureError && isTextureLoaded) {
          child.material.map = texture
          child.material.needsUpdate = true
        } else {
          // Fallback: usar cor baseada no bgColor se textura falhar
          const color = new THREE.Color(bgColor)
          child.material.color = color
          child.material.map = null
          child.material.needsUpdate = true
        }
        
        // Configurar transparência e outras propriedades otimizadas
        child.material.transparent = true
        child.material.opacity = opacity
        child.material.roughness = 0.3
        child.material.metalness = 0.1
        
        // Configurar sombras apenas se necessário
        child.castShadow = true
        child.receiveShadow = true
        
        // Otimizações adicionais
        child.frustumCulled = true
      }
    })
  }, [scene, opacity, texture, textureError, bgColor, isTextureLoaded])

  // Aplicar textura imediatamente quando carregada
  useEffect(() => {
    if (!scene || !texture || textureError || !isTextureLoaded) return
    
    console.log('Aplicando textura ao modelo:', texturePath)
    
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.map = texture
        child.material.needsUpdate = true
        console.log('Textura aplicada ao mesh:', child.name || 'unnamed')
      }
    })
  }, [texture, isTextureLoaded, scene, textureError, texturePath])

  if (!scene) {
    return <FallbackModel bgColor={bgColor} opacity={opacity} isMobile={isMobile} />
  }

  // Posição responsiva baseada no dispositivo
  const modelPosition = isMobile ? [0, -0.2, 0] : [0, -0.1, 0]

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={modelPosition}
    />
  )
}

// Componente de fallback para quando o modelo não carrega
function FallbackModel({ bgColor, opacity, isMobile }) {
  const meshRef = useRef()
  
  useEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.opacity = opacity
    }
  }, [opacity])

  // Posição responsiva baseada no dispositivo
  const modelPosition = isMobile ? [0, -0.2, 0] : [0, -0.1, 0]

  return (
    <mesh ref={meshRef} position={modelPosition} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 2, 32]} />
      <meshStandardMaterial 
        color={bgColor}
        transparent={true}
        opacity={opacity}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

const ThreeCanvas = ({ modelPath = '/Vigor.gltf', texturePath = '/Texturas/Natural.jpg', bgColor = '#f0f0f0', onError }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentModelPath, setCurrentModelPath] = useState(modelPath)
  const [currentTexturePath, setCurrentTexturePath] = useState(texturePath)
  const { isMobile } = useMobile()

  useEffect(() => {
    if (modelPath !== currentModelPath || texturePath !== currentTexturePath) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setCurrentModelPath(modelPath)
        setCurrentTexturePath(texturePath)
        setIsTransitioning(false)
      }, 300) // Duração da transição reduzida

      return () => clearTimeout(timer)
    }
  }, [modelPath, currentModelPath, texturePath, currentTexturePath])

  // Configurações responsivas da câmera otimizadas
  const cameraConfig = isMobile 
    ? { position: [1.5, 1.5, 4], fov: 50 }
    : { position: [0, 2, 5], fov: 45 }

  // Configurações responsivas dos controles otimizadas
  const controlsConfig = isMobile
    ? {
        minDistance: 2.5,
        maxDistance: 8,
        minPolarAngle: Math.PI / 8,
        maxPolarAngle: Math.PI / 2,
        target: [0, 0.2, 0],
        dampingFactor: 0.05,
        enableDamping: true
      }
    : {
        minDistance: 3,
        maxDistance: 10,
        minPolarAngle: Math.PI / 6,
        maxPolarAngle: Math.PI / 2,
        target: [0, 0.3, 0],
        dampingFactor: 0.05,
        enableDamping: true
      }

  // Configurações de renderização otimizadas para desktop
  const rendererConfig = isMobile 
    ? {
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        alpha: true,
        stencil: false,
        depth: true
      }
    : {
        antialias: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        preserveDrawingBuffer: false,
        alpha: true,
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false
      }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={cameraConfig}
        gl={rendererConfig}
        dpr={isMobile ? [1, 1.5] : [1, 1.5]} // Reduzido para desktop
        shadows={!isMobile} // Sombras apenas em desktop
        frameloop="demand" // Renderização sob demanda
        performance={{ min: 0.5 }} // Performance mínima
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 5, 25]} />
        
        <Suspense fallback={<FallbackModel bgColor={bgColor} opacity={1} isMobile={isMobile} />}>
          <Model 
            modelPath={currentModelPath} 
            texturePath={currentTexturePath}
            bgColor={bgColor} 
            isTransitioning={isTransitioning}
            isMobile={isMobile}
          />
          
          {/* Iluminação ambiente */}
          <ambientLight intensity={0.6} />
          
          {/* Luz direcional principal */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.2}
            castShadow={!isMobile}
            shadow-mapSize-width={isMobile ? 1024 : 2048}
            shadow-mapSize-height={isMobile ? 1024 : 2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Luzes de preenchimento */}
          <directionalLight
            position={[-5, -5, -5]}
            intensity={0.4}
          />

          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            {...controlsConfig}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeCanvas 
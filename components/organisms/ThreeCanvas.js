"use client"

import { Canvas, useFrame } from '@react-three/fiber'
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
  const [forceUpdate, setForceUpdate] = useState(0)
  
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
        
        // Configurar transparência e outras propriedades otimizadas para sombras
        child.material.transparent = true
        child.material.opacity = opacity
        child.material.roughness = 0.3
        child.material.metalness = 0.1
        
        // Configurar sombras para iluminação realista
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
    
    // Forçar atualização do renderer na primeira vez e quando trocar texturas
    setForceUpdate(prev => prev + 1)
  }, [texture, isTextureLoaded, scene, textureError, texturePath])

  // Forçar atualização do renderer quando necessário usando useFrame
  useFrame(() => {
    if (forceUpdate > 0) {
      // Forçar o renderer a atualizar por alguns frames
      setForceUpdate(0) // Reset após forçar a atualização
      console.log('Renderer forçado a atualizar - textura aplicada')
    }
  })

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

  // Configurações responsivas dos controles otimizadas - apenas rotação
  const controlsConfig = isMobile
    ? {
        minDistance: 4, // Distância fixa para manter âncora
        maxDistance: 4, // Distância fixa para manter âncora
        minPolarAngle: Math.PI / 8,
        maxPolarAngle: Math.PI / 2,
        target: [0, 0.2, 0], // Ponto âncora fixo
        dampingFactor: 0.05,
        enableDamping: true,
        enableZoom: false, // Desabilitar zoom
        enablePan: false,  // Desabilitar pan
        enableRotate: true // Apenas rotação
      }
    : {
        minDistance: 5, // Distância fixa para manter âncora
        maxDistance: 5, // Distância fixa para manter âncora
        minPolarAngle: Math.PI / 6,
        maxPolarAngle: Math.PI / 2,
        target: [0, 0.3, 0], // Ponto âncora fixo
        dampingFactor: 0.05,
        enableDamping: true,
        enableZoom: false, // Desabilitar zoom
        enablePan: false,  // Desabilitar pan
        enableRotate: true // Apenas rotação
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
        dpr={isMobile ? [1, 1.5] : [1, 1.5]}
        shadows={true} // Sempre habilitar sombras para iluminação realista
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 8, 30]} />
        
        {/* Plano infinito como chão com material otimizado para sombras */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial 
            color={bgColor} 
            transparent={true}
            opacity={0.4}
            roughness={0.9}
            metalness={0.05}
            envMapIntensity={0.2}
          />
        </mesh>
        
        <Suspense fallback={<FallbackModel bgColor={bgColor} opacity={1} isMobile={isMobile} />}>
          <Model 
            modelPath={currentModelPath} 
            texturePath={currentTexturePath}
            bgColor={bgColor} 
            isTransitioning={isTransitioning}
            isMobile={isMobile}
          />
          
          {/* Sistema de iluminação realista */}
          
          {/* Luz ambiente suave para iluminação base */}
          <ambientLight intensity={0.3} color="#ffffff" />
          
          {/* Luz direcional principal (sol) - posicionada para criar sombras realistas */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.8}
            color="#ffffff"
            castShadow={true}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={25}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
            shadow-bias={-0.0001}
            shadow-normalBias={0.02}
          />
          
          {/* Luz de preenchimento frontal para suavizar sombras duras */}
          <directionalLight
            position={[-3, 8, 4]}
            intensity={0.6}
            color="#ffffff"
            castShadow={false}
          />
          
          {/* Luz de preenchimento traseira para separar o modelo do fundo */}
          <directionalLight
            position={[0, 5, -8]}
            intensity={0.4}
            color="#ffffff"
            castShadow={false}
          />
          
          {/* Luz de preenchimento inferior para iluminar sombras */}
          <directionalLight
            position={[0, -3, 0]}
            intensity={0.2}
            color="#ffffff"
            castShadow={false}
          />
          
          {/* Luz de destaque para realçar detalhes */}
          <spotLight
            position={[4, 6, 2]}
            intensity={0.8}
            color="#ffffff"
            angle={Math.PI / 6}
            penumbra={0.3}
            distance={15}
            castShadow={false}
          />

          <OrbitControls 
            {...controlsConfig}
          />
          
          {/* Ambiente com iluminação global */}
          <Environment 
            preset="warehouse" 
            background={false}
            blur={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeCanvas 
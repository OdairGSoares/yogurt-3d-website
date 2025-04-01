"use client"

import { Canvas, useTransition } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'

function Model({ modelPath, bgColor, isTransitioning }) {
  const { scene } = useGLTF(modelPath)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    if (isTransitioning) {
      setOpacity(0)
    } else {
      setOpacity(1)
    }
  }, [isTransitioning])

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true
        child.material.opacity = opacity
      }
    })
  }, [scene, opacity])

  return (
    <primitive 
      object={scene} 
      position={[0, -0.5, 0]}
    />
  )
}

const ThreeCanvas = ({ modelPath = '/Ameixa.glb', bgColor = '#f0f0f0' }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentModelPath, setCurrentModelPath] = useState(modelPath)

  useEffect(() => {
    if (modelPath !== currentModelPath) {
      setIsTransitioning(true)
      const timer = setTimeout(() => {
        setCurrentModelPath(modelPath)
        setIsTransitioning(false)
      }, 500) // Duração da transição

      return () => clearTimeout(timer)
    }
  }, [modelPath, currentModelPath])

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [1, 2, 7], fov: 45 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: true,
          alpha: true,
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 5, 25]} />
        
        <Suspense fallback={null}>
          <Model 
            modelPath={currentModelPath} 
            bgColor={bgColor} 
            isTransitioning={isTransitioning}
          />
          
          {/* Iluminação ambiente */}
          <ambientLight intensity={0.5} />
          
          {/* Luz direcional principal */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
          />
          
          {/* Luzes de preenchimento */}
          <directionalLight
            position={[-5, -5, -5]}
            intensity={0.3}
          />

          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0.3, 0]}
          />
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeCanvas 
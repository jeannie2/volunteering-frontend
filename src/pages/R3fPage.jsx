import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Text, Float, Plane, Lightformer, Environment } from '@react-three/drei'
import { MathUtils } from 'three'
import * as THREE from 'three'

import Loader from '../../src/components/Loader'

const R3fPage  = () => {
  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      // const response = await fetch('http://localhost:8080/proxy-endpoint')

      // const response = await fetch('https://web-scraped-volunteering-backend-production.up.railway.app/proxy-endpoint')
      // const response = await fetch('https://volunteering-backend.up.railway.app/proxy-endpoint')
      const response = await fetch('https://web-scraped-volunteering-backend.vercel.app/proxy-endpoint')
      // const response = await fetch('https://web-scraped-volunteering-backend-production.up.railway.app')
      const jsonData = await response.json()
      setData(jsonData)
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLoading(false)
  }

const MyComponent = ({ title, description, opportunityLink, source }) => {
  const handleClick = () => {
      window.open(opportunityLink,"_blank" )
  };

  return (
    <Plane args={[4, 4]} onClick={handleClick}>
      <meshPhysicalMaterial color="red" roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
      <Text position={[0, 0, 0.001]} fontSize={0.18} color="white" maxWidth={3} maxHeight={3} wrap="WordWrap" frustumCulled={false}>
        Task: {title} {'\n'}
        Organization: {description} {'\n'}
        Platform: {source} {'\n'}{'\n'}
        Click for details!
      </Text>
    </Plane>
  )
}

const MyDivs = () => {
  const groupRef = useRef()

  useEffect(() => {
    const group = groupRef.current

    const divs = group.children
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i]
      const x = MathUtils.randFloat(-20, 20)
      const y = MathUtils.randFloat(-20, 20)
      const z = MathUtils.randFloat(-10, 10)
      div.position.set(x, y, z)
    }
  }, [])

  return (
    <group ref={groupRef}>
      {data?.map((item, index) => (
        <MyComponent key={index} title={item.title} description={item.description} source={item.source} opportunityLink={item.opportunityLink} />
      ))}
    </group>
  )
}
// MyComponent oonClick={(item)=>window.location.href=item.opportunityLink}

  return (
    <>
    <Canvas camera={{ position: [-35, 5, 20], fov: 25 }} style={{ background: 'grey' }}
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      shadows
    >
      <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <ambientLight />
      <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Float>
        {loading ? <Loader /> : <MyDivs />}
        </Float>
      <Environment resolution={512}>
        <Lightformer
          form="ring" // circle | ring | rect (optional, default = rect)
          intensity={2} // power level (optional = 1)
          color="red" // (optional = white)
          scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
          target={[0, 0, 0]} // Target position (optional = undefined)
        />
        <Lightformer form="circle" color="pink" intensity={1} rotation-y={Math.PI / 2} position={[20, 2, 0]} scale={[100, 2, 1]} />
        <Lightformer form="circle" color="white" intensity={1} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
        <Lightformer form="ring" color="blue" intensity={1} scale={2} position={[10, 5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        <Lightformer form="ring" color="aqua" intensity={1} scale={2} position={[-10, -5, 10]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment>
    <OrbitControls />
  </Canvas>
    </>
  )
}

export default R3fPage

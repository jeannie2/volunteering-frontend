import { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Plane, Lightformer, Environment } from '@react-three/drei'
import { MathUtils } from 'three'
import * as THREE from 'three'

import Loader from '../src/components/Loader'

const ScrapeData  = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/proxy-endpoint');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      // scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const MyComponent = ({ title, description, opportunityLink, source }) => {
   const handleClick = () => {
    // Handle click event here
    // window.location.href=opportunityLink;
      window.open(opportunityLink,"_blank" )
  };

  // <a href={opportunityLink} target="_blank" rel="noopener noreferrer"></a>
  return (
    <Plane args={[5, 5]}>
      <meshPhysicalMaterial color="red" roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
      <Text position={[0, 0, 0.001]} fontSize={0.15} color="red" maxWidth={1.8} maxHeight={0.8} wrap="WordWrap" frustumCulled={false}>
        title: {title} {'\n'}
        description: {description} {'\n'}
        source: {source} {'\n'}
        Click here for more details
        {/* <a href={opportunityLink} target="_blank" rel="noopener noreferrer">
          Click here for more details
        </a> */}
      </Text>
    </Plane>
  )
}


const MyDivs = () => {
  const groupRef = useRef()

  useEffect(() => {
    const group = groupRef.current

    // Generate random positions for each div
    const divs = group.children
    for (let i = 0; i < divs.length; i++) {
      const div = divs[i]
      const x = MathUtils.randFloat(-20, 20)
      const y = MathUtils.randFloat(-20, 20)
      const z = MathUtils.randFloat(-10, 10)
      div.position.set(x, y, z)
    }
  }, [])

  const divData = [
    {
      title:
        "I would like an expert to advise me on how I can enhance the organization's website to attract clients, donors, and...e an expert to advise me on how I can enhance the organization's website to attrac",
      description: 'ClassyLinks Creative Consultants, Inc. dba E. H. Mott Learning Center'
    },
    { title: 'web developer for a small agency', description: 'dentist central clinics' },
    { title: 'web developer for a small agency', description: 'dentist central clinics' }
  ]

  return (
    <group ref={groupRef}>
      {data.map((item, index) => (
        <MyComponent key={index} title={item.title} description={item.description} source={item.source} onClick={(item)=>window.location.href=item.opportunityLink} />
      ))}
    </group>
  )
}

  return (
<>
 <Canvas camera={{ position: [-35, 5, 20], fov: 25 }} style={{ background: 'grey' }}  gl={{ logarithmicDepthBuffer: true, antialias: false }}
        dpr={[1, 1.5]}
        shadows>
        <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} /> */}
      <Float>

        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
        <ambientLight />
        {/* <MyComponent /> */}
          <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
        <spotLight angle={1} color="white" penumbra={1} position={[0, 25, 5]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />

        <Suspense fallback={<Loader />}>
          <MyDivs />
        </Suspense>
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

      </Float>

      <OrbitControls />

    </Canvas>
    </>
    // <div>
    // <h1>Volunteering opportunities</h1>
    //   {data.map((item, index) => (
    //     <div key={index}>
    //       <h3>{item.title}</h3>
    //       <p>{item.description}</p>
    //       <a href={item.opportunityLink}>LINK</a>
    //       <p>{item.source}</p>
    //     </div>
    //   ))}
    // </div>
  )
};

export default ScrapeData;

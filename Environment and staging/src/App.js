import { useRef } from "react";
import "./style.css";
import {
  PivotControls,
  TransformControls,
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  MeshDistortMaterial,
  useHelper,
  meshStandardMaterial,
  softShadows,
  BakeShadows,
  Accumulativeshadows,
  ContactShadows
} from "@react-three/drei";

import {useFrame} from "@react-three/fiber"

import * as THREE from 'three';
import {Perf} from 'r3f-perf';
import { useControls, button } from "leva";

// softShadows({
//   frustum:3.75,
//   size:0.005,
//   near:9.5,
//   samples:17,
//   rings:11
// })

function App() {
  const cube = useRef();
  const cube1 = useRef();
  const directionalLight = useRef()

  useFrame((_,delta)=>{
   cube.current.rotation.y +=delta*0.2
  })

  const {color1,opacity,blur} = useControls('contact shadows',{
    color1:'#000000',
    opacity:{value:0.5,min:0,max:1},
    blur:{value:1,min:0,max:10}
  })

  // useHelper(directionalLight,THREE.DirectionalLightHelper,1)
  
  const { position, positionxyz, color, visible } = useControls("Box", {
    position: { value: -2, min: -3, max: 3, step: 0.01 },
    positionxyz: {
      value: { x: -2, y: 0 },
      min: -3,
      max: 3,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#000000",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 9],
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: { options: ["a", "b", "c"] },
  });
  return (
    <>
    <BakeShadows/>
    <Perf position="top-left" />
      <OrbitControls makeDefault />

      <ContactShadows 
      position={[0,-0.99,0]} 
      scale={10}
      resolution={512} far={5} 
      color={color1}
      opacity={opacity}
      blur={blur}
      />

      <directionalLight ref={directionalLight} 
        position={[1, 2, 3]} 
        intensity={1.5} 
        castShadow
        shadow-mapSize={[1024,1024]}
        // shadow-camera-near={1}
        shadow-camera-far={10}
        // shadow-camera-top = {2}
        // shadow-camera-right ={2}
        // shadow-camera-bottom={-2}
        // shadow-camera-left={-2}
      />
      <ambientLight intensity={0.5} />

     

      <group>
        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
          <mesh
            position={[positionxyz.x, positionxyz.y, 0]}
            ref={cube1}
            visible={visible}
            castShadow
          >
            <boxGeometry />
            <MeshDistortMaterial color={color} />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label"
              center
              distanceFactor={6}
              occlude={[cube, cube1]}
              castShadow
            >
              cube
            </Html>
          </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={2}  >
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} />
      </group>
      <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5} receiveShadow >
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" />
         */}
        <Html>
          <div>Hello World</div>
        </Html>
        <meshStandardMaterial
          color={"limegreen"}
          resolution={512}
         receiveShadow
        />
      </mesh>
      {/* <Html>
        umer
        <div
          style={{ height: "50px", width: "100px", backgroundColor: "white" }}
        ></div>
      </Html> */}
      <Float speed={5}>
        <Text scale-z={10} color={"salmon"}>
          Am i even a Text?
        </Text>
      </Float>
    </>
  );
}

export default App;

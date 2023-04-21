import { Perf } from "r3f-perf";
import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { useEffect, useRef } from "react";
// import { useState } from "react";
import * as THREE from "three";
import "./style.css";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

function App() {
  const matcapTexture = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  // const tempArray = [...Array(100)];
  // const [torusGeometry, setTorusGeometry] = useState();
  // const [material, setMaterial] = useState();
  // const donutsGroup = useRef();

  const donuts = useRef([]);

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture[0];
    material.needsUpdate = true;
  });

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture[0]} /> */}

      {/* 
      <mesh position-x={2}>
        <boxGeometry />
        <meshNormalMaterial color="mediumpurple" />
      </mesh> */}
      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={0.7}
          height={0.2}
          curveSegments={12}
          bevelThickness={0.02}
          bevelEnabled
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Mohammed Umer
          <meshMatcapMaterial matcap={matcapTexture[0]} />
        </Text3D>
      </Center>

      {/* <group ref={donutsGroup}> */}
      {[...Array(100)].map((item, index) => (
        <mesh
          ref={(ele) => {
            donuts.current[index] = ele;
          }}
          key={index}
          material={material}
          geometry={torusGeometry}
          position={[
            (Math.random(index) - 0.5) * 15,
            (Math.random(index) - 0.5) * 15,
            (Math.random(index) - 0.5) * 10,
          ]}
          scale={0.2 * Math.random(index) + 0.2}
          rotation={[
            (Math.random(index) - 0.5) * Math.PI,
            (Math.random(index) - 0.5) * Math.PI,
            0,
          ]}
        />
      ))}
      {/* </group> */}
    </>
  );
}

export default App;

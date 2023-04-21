import { Perf } from "r3f-perf";
import {
  Center,
  Text3D,
  OrbitControls,
  useMatcapTexture,
} from "@react-three/drei";

import "./style.css";

function App() {
  const matcapTexture = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  // const tempArray = [...Array(100)];

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
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

      {[...Array(100)].map((item, index) => (
        <mesh
          key={index}
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
        >
          <torusGeometry args={[1, 0.6, 16, 32]} />
          <meshMatcapMaterial matcap={matcapTexture[0]} />
        </mesh>
      ))}
    </>
  );
}

export default App;

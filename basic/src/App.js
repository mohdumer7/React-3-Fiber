import { useRef } from "react";
import "./style.css";
import { useFrame } from "@react-three/fiber";

function App() {
  const cube = useRef();
  useFrame((state, delta) => {
    cube.current.rotation.y += delta;
  });
  return (
    <>
      <group ref={cube}>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
        <mesh position-x={2}>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
      </group>
      <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshBasicMaterial color="greenyellow" />
      </mesh>
    </>
  );
}

export default App;

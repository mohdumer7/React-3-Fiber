import { useRef } from "react";
import "./style.css";
import { TransformControls, OrbitControls } from "@react-three/drei";

function App() {
  const cube = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh ref={cube} position-x={2}>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} />
      </group>
      <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}

export default App;

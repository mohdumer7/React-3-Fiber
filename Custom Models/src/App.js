import "./style.css";
import { OrbitControls, meshStandardMaterial } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import { Suspense } from "react";
import Fox from "./Fox";

function Placeholder(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  );
}

function App() {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* <mesh position-x={2}>
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh> */}
      <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <Suspense fallback={<Placeholder position={0.5} scale={0.3} />}>
        <Model />
      </Suspense>
      <Suspense fallback={<Placeholder position={0.5} scale={0.3} />}>
        <Fox />
      </Suspense>
    </>
  );
}

export default App;

import "./style.css";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Model from "./Model";
import { Suspense } from "react";

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
      <Suspense
        fallback={
          <mesh position={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial color="red" wireframe />
          </mesh>
        }
      >
        <Model />
      </Suspense>
    </>
  );
}

export default App;

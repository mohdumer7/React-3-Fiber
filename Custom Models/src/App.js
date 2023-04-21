import "./style.css";
import { OrbitControls } from "@react-three/drei";

import { Perf } from "r3f-perf";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function App() {
  const model = useLoader(GLTFLoader, "./FlightHelmet/glTF/FlightHelmet.gltf");
  console.log(model);
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={2}>
        <boxGeometry />
        <meshBasicMaterial color="mediumpurple" />
      </mesh>
      <primitive object={model.scene} scale={1.5} />
    </>
  );
}

export default App;

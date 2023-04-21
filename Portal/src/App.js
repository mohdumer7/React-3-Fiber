import "./style.css";
import { useTexture, OrbitControls, useGLTF } from "@react-three/drei";

function App() {
  const { nodes } = useGLTF("./portal.glb");
  console.log(nodes);

  const bakedtexture = useTexture("./baked.jpg");
  bakedtexture.flipY = false;
  return (
    <>
      <color args={["#201919"]} attach="background" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial color="greenyellow" />
      </mesh> */}

      <mesh geometry={nodes.baked.geometry}>
        <meshBasicMaterial map={bakedtexture} />
      </mesh>
    </>
  );
}

export default App;

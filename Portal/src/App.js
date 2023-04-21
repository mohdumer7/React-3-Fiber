import "./style.css";
import { useTexture, OrbitControls, useGLTF, Center } from "@react-three/drei";
import { Perf } from "r3f-perf";
function App() {
  const { nodes } = useGLTF("./portal.glb");
  console.log(nodes);

  const bakedtexture = useTexture("./baked.jpg");
  bakedtexture.flipY = false;
  return (
    <>
      <color args={["#201919"]} attach="background" />
      <OrbitControls makeDefault />
      <Perf position="top-left" />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* <mesh scale={1.5}>
        <boxGeometry />
        <meshNormalMaterial color="greenyellow" />
      </mesh> */}
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedtexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        ></mesh>
      </Center>
    </>
  );
}

export default App;

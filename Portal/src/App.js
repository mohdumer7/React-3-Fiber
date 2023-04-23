import "./style.css";
import * as THREE from "three";
import {
  useTexture,
  OrbitControls,
  useGLTF,
  Center,
  Sparkles,
  shaderMaterial,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { extend } from "@react-three/fiber";

import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";

// const PortalMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     uColorStart: new THREE.Color("#000"),
//     uColorEnd: new THREE.Color(1, 1, 1),
//   },
//   portalVertexShader,
//   portalFragmentShader
// );

// extend({ PortalMaterial });

function App() {
  const { nodes } = useGLTF("./portal.glb");

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
        >
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uiniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ffffff") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}
          {/* <PortalMaterial /> */}
          {/* <PortalMaterial /> */}
          <meshBasicMaterial />
        </mesh>

        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}

export default App;

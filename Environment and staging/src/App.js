import { useRef } from "react";
import "./style.css";
import {
  PivotControls,
  TransformControls,
  OrbitControls,
  Html,
  Lightformer,
  Text,
  Environment,
  Sky,
  Float,
  MeshReflectorMaterial,
  MeshDistortMaterial,
  useHelper,
  meshStandardMaterial,
  softShadows,
  BakeShadows,
  Accumulativeshadows,
  ContactShadows,
} from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useControls, button } from "leva";

// softShadows({
//   frustum:3.75,
//   size:0.005,
//   near:9.5,
//   samples:17,
//   rings:11
// })

function App() {
  const cube = useRef();
  const cube1 = useRef();
  const directionalLight = useRef();

  useFrame((_, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapheight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 3.5, min: 0, max: 12 },
      envMapheight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 20, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  const { color1, opacity, blur } = useControls("contact shadows", {
    color1: "#000000",
    opacity: { value: 0.5, min: 0, max: 1 },
    blur: { value: 1, min: 0, max: 10 },
  });

  // useHelper(directionalLight,THREE.DirectionalLightHelper,1)

  const { position, positionxyz, color, visible } = useControls("Box", {
    position: { value: -2, min: -3, max: 3, step: 0.01 },
    positionxyz: {
      value: { x: -2, y: 0 },
      min: -3,
      max: 3,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#000000",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 9],
    },
    clickMe: button(() => {
      console.log("ok");
    }),
    choice: { options: ["a", "b", "c"] },
  });

  return (
    <>
      <Environment
        files={[
          "./environmentMaps/2/px.jpg",
          "./environmentMaps/2/nx.jpg",
          "./environmentMaps/2/py.jpg",
          "./environmentMaps/2/ny.jpg",
          "./environmentMaps/2/pz.jpg",
          "./environmentMaps/2/nz.jpg",
        ]}
        ground={{
          height: envMapheight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      >
        {/* <mesh position-z={-5} scale={10} >
      <planeGeometry/>
      <meshStandardMaterial color="red"/>
      
    </mesh> */}
        <Lightformer
          position-z={-5}
          scale={10}
          color="red"
          form="ring"
          intensity={10}
        />
        <Lightformer position-z={5} scale={10} color="blue" />
      </Environment>

      {/* <BakeShadows/> */}
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <ContactShadows
        position={[0, -0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color1}
        opacity={opacity}
        blur={blur}
      />

      {/* <directionalLight ref={directionalLight} 
        position={sunPosition} 
        intensity={1.5} 
        castShadow
        shadow-mapSize={[1024,1024]}
        // shadow-camera-near={1}
        shadow-camera-far={10}
        // shadow-camera-top = {2}
        // shadow-camera-right ={2}
        // shadow-camera-bottom={-2}
        // shadow-camera-left={-2}
      /> */}
      {/* <ambientLight intensity={0.5} /> */}

      {/* <Sky sunPosition={sunPosition} /> */}

      <group>
        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
          <mesh
            position={[positionxyz.x, 1, 0]}
            ref={cube1}
            visible={visible}
            castShadow
            scale={1.5}
          >
            <boxGeometry />
            <MeshDistortMaterial
              color={color}
              envMapIntensity={envMapIntensity}
            />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label"
              center
              distanceFactor={6}
              occlude={[cube, cube1]}
              castShadow
            >
              cube
            </Html>
          </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={2} position-y={1} scale={1.5}>
          <boxGeometry />
          <MeshReflectorMaterial
            color="mediumpurple"
            envMapIntensity={envMapIntensity}
          />
        </mesh>
        <TransformControls object={cube} />
      </group>
      <mesh
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        receiveShadow
      >
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" />
         */}
        <Html>
          <div>Hello World</div>
        </Html>
        <meshStandardMaterial
          color={"limegreen"}
          resolution={512}
          receiveShadow
          envMapIntensity={envMapIntensity}
        />
      </mesh>
      {/* <Html>
        umer
        <div
          style={{ height: "50px", width: "100px", backgroundColor: "white" }}
        ></div>
      </Html> */}
      <Float speed={5}>
        <Text scale-z={10} color={"salmon"}>
          Am i even a Text?
        </Text>
      </Float>
    </>
  );
}

export default App;

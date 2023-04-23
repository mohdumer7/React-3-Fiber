import { useRef } from "react";
import "./style.css";
import {
  PivotControls,
  TransformControls,
  OrbitControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
  MeshDistortMaterial,
  meshBounds,
  useGLTF,
  Stage,
} from "@react-three/drei";

import {
  Bloom,
  EffectComposer,
  Glitch,
  Noise,
  Vignette,
  SSR,
  DepthOfField,
} from "@react-three/postprocessing";

import { GlitchMode, BlendFunction } from "postprocessing";

import { Perf } from "r3f-perf";
import { useControls, button } from "leva";

function App() {
  const cube = useRef();
  const cube1 = useRef();
  const loader = useGLTF("./hamburger.glb");

  const eventHandler = (event) => {
    event.stopPropagation();
    cube.current.material.color.set(`hsl(${Math.random() * 360},100%,75%)`);
  };

  const cube1Handler = (event) => {
    event.stopPropagation();
  };

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
    clickMe: button(() => {}),
    choice: { options: ["a", "b", "c"] },
  });

  const ssr_controls = useControls({
    temporalResolve: true,
    STRETCH_MISSED_RAYS: true,
    USE_MRT: true,
    USE_NORMALMAP: true,
    USE_ROUGHNESSMAP: true,
    ENABLE_JITTERING: true,
    ENABLE_BLUR: true,
    temporalResolveMix: { value: 0.9, min: 0, max: 1 },
    temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
    maxSamples: { value: 0, min: 0, max: 1 },
    resolutionScale: { value: 1, min: 0, max: 1 },
    blurMix: { value: 0.5, min: 0, max: 1 },
    blurKernelSize: { value: 8, min: 0, max: 8 },
    blurSharpness: { value: 0.5, min: 0, max: 1 },
    rayStep: { value: 0.3, min: 0, max: 1 },
    intensity: { value: 1, min: 0, max: 5 },
    maxRoughness: { value: 0.1, min: 0, max: 1 },
    jitter: { value: 0.7, min: 0, max: 5 },
    jitterSpread: { value: 0.45, min: 0, max: 1 },
    jitterRough: { value: 0.1, min: 0, max: 1 },
    roughnessFadeOut: { value: 1, min: 0, max: 1 },
    rayFadeOut: { value: 0, min: 0, max: 1 },
    MAX_STEPS: { value: 20, min: 0, max: 20 },
    NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
    maxDepthDifference: { value: 3, min: 0, max: 10 },
    maxDepth: { value: 1, min: 0, max: 1 },
    thickness: { value: 10, min: 0, max: 10 },
    ior: { value: 1.45, min: 0, max: 2 },
  });

  return (
    <>
      <color args={["#2a2a2a"]} attach="background" />
      <Perf position="top-left" />

      <EffectComposer>
        <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
          mode={GlitchMode.CONSTANT_MILD}
        />

        <Glitch delay={[8, 10]} duration={[0.1, 0.3]} strength={[0.2, 0.4]} />

        <Noise blendFunction={BlendFunction.SOFT_LIGHT} />

        <Bloom mipmapBlur />

        <DepthOfField
          focusDistance={0.025}
          focusLength={0.025}
          bokehScale={10}
        />
        {/* <SSR {...ssr_controls} /> */}
      </EffectComposer>

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <group>
        <PivotControls anchor={[0, 0, 0]} depthTest={false}>
          <mesh
            position={[positionxyz.x, positionxyz.y, 0]}
            ref={cube1}
            visible={visible}
            raycast={meshBounds}
          >
            <boxGeometry />
            <meshStandardMaterial color={color} onClick={cube1Handler} />
            <Html
              position={[1, 1, 0]}
              wrapperClass="label"
              center
              distanceFactor={6}
              occlude={[cube, cube1]}
            >
              cube
            </Html>
          </mesh>
        </PivotControls>

        <mesh
          ref={cube}
          position-x={2}
          // onClick={eventHandler}
          // onPointerEnter={() => (document.body.style.cursor = "pointer")}
          // onPointerLeave={() => (document.body.style.cursor = "default")}
        >
          <boxGeometry />
          <meshBasicMaterial color={[1.5, 1, 10]} toneMapped={false} />
        </mesh>

        <mesh
          ref={cube}
          position-z={-2}
          // onClick={eventHandler}
          // onPointerEnter={() => (document.body.style.cursor = "pointer")}
          // onPointerLeave={() => (document.body.style.cursor = "default")}
        >
          <boxGeometry />
          <meshStandardMaterial
            color="orange"
            emissive="orange"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        <mesh ref={cube} position-z={2} position-x={2}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </group>

      <mesh
        scale={10}
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        className="text"
      >
        <planeGeometry />
        {/* <meshStandardMaterial color="greenyellow" />
         */}

        <MeshReflectorMaterial
          color={"red"}
          resolution={512}
          blur={(1000, 1000)}
          mirror={0.5}
          roughness={0}
          metalness={0}
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

      <primitive
        object={loader.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </>
  );
}

export default App;

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

import { EffectComposer, Vignette } from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";

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

  return (
    <>
      <EffectComposer>
        <Vignette
          offset={3}
          darkness={5}
          BlendFunction={BlendFunction.COLOR_BURN}
        />
      </EffectComposer>
      <Perf position="top-left" />
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
          onClick={eventHandler}
          onPointerEnter={() => (document.body.style.cursor = "pointer")}
          onPointerLeave={() => (document.body.style.cursor = "default")}
        >
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
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
        <Html className="text">
          <div>Click on this Cube to Change Color ----</div>
        </Html>
        <MeshReflectorMaterial
          color={"red"}
          resolution={512}
          blur={(1000, 1000)}
          mirror={0.5}
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

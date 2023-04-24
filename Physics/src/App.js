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
} from "@react-three/drei";

import { Physics, RigidBody, Debug } from "@react-three/rapier";

import { Perf } from "r3f-perf";
import { useControls, button } from "leva";

function App() {
  const cube = useRef();
  const cube1 = useRef();
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
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />

      <Physics>
        {/* <Debug /> */}
        <RigidBody>
          <mesh
            position={[positionxyz.x, positionxyz.y, 0]}
            ref={cube1}
            position-y={2}
            castShadow
          >
            <boxGeometry />
            <meshStandardMaterial color={color} />
          </mesh>
        </RigidBody>

        <mesh ref={cube} position-x={2} position-y={3} castShadow>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>

        <RigidBody type="fixed">
          <mesh
            position-y={-1}
            rotation-x={-Math.PI * 0.5}
            scale={[15, 15, 0.5]}
            receiveShadow
          >
            <boxGeometry />
            <meshStandardMaterial
              color={"limegreen"}
              resolution={512}
              blur={(1000, 1000)}
              mirror={0.5}
            />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}

export default App;

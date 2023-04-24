import { useEffect, useMemo, useRef, useState } from "react";
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
  useGLTF,
} from "@react-three/drei";

import {
  CuboidCollider,
  Physics,
  RigidBody,
  Debug,
  CylinderCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";

import { Perf } from "r3f-perf";
import { useControls, button } from "leva";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";
import { Euler, Quaternion } from "three";

function App() {
  const cube = useRef();
  const cube1 = useRef();
  const twister = useRef();
  const burger = useGLTF("./hamburger.glb");
  const cubeCount = 300;
  const cubes = useRef();

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

  const cubeJump = () => {
    cube1.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube1.current.applyTorqueImpulse({ x: 0, y: 1, z: 0 });
  };

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // twister.current.setNextKinematicRotation(
    //   new Quaternion().setFromEuler(euler)
    // );
    const eulerRotation = new THREE.Euler(0, time * 10, 0);
    const quaternionRotation = new THREE.Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);
    twister.current.setNextKinematicRotation(quaternionRotation);

    const angle = time * 3;
    const x = Math.cos(angle) * 5;
    const z = Math.sin(angle) * 5;

    twister.current.setNextKinematicTranslation({ x: x, y: -0.55, z: z });
  });

  const collisionEnter = () => {
    // console.log("ouch");
  };

  const collisionExit = () => {
    // console.log("aah")
  };

  // useEffect(() => {
  //   for (let i = 0; i < cubeCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);

  const cubeTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];

    for (let i = 0; i < cubeCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([Math.random(), Math.random(), Math.random()]);
      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }
    return { positions, rotations, scales };
  }, []);

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />
      <ambientLight intensity={0.5} />

      <Physics gravity={[0, -9.8, 0]}>
        {/* //This is Performance Heavy */}
        <Debug />
        <RigidBody
          ref={cube1}
          gravityScale={1}
          restitution={0.5}
          friction={0}
          colliders={false}
          position={[-2, 2, 0]}
        >
          <mesh position-y={2} castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color={color} />
          </mesh>
          <CuboidCollider
            args={[0.5, 0.5, 0.5]}
            position={[0, 2, 0]}
            mass={2}
          />
        </RigidBody>

        <mesh ref={cube} position-x={2} position-y={3} castShadow>
          <boxGeometry />
          <meshBasicMaterial color="mediumpurple" />
        </mesh>

        <RigidBody
          colliders="ball"
          position={[0, 5, 0]}
          onCollisionEnter={collisionEnter}
          onCollisionExit={collisionExit}
          onSleep={() => {}}
        >
          <mesh castShadow>
            <sphereGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false}>
          <mesh
            castShadow
            position={[0, 1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <torusGeometry args={[1, 0.5, 16, 32]} />
            <meshStandardMaterial color={"grey"} />
          </mesh>
        </RigidBody>

        <RigidBody type="fixed" friction={0.7}>
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

        <RigidBody
          friction={0}
          type="kinematicPosition"
          ref={twister}
          position={[0, -0.55, 0]}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>

        <RigidBody colliders={false} position={[0, 4, 0]}>
          <primitive object={burger.scene} scale={0.25} />
          <CylinderCollider args={[0.5, 1.25]} position={[0, 0.7, 0]} />
        </RigidBody>

        <RigidBody type="fixed">
          <CuboidCollider args={[8, 3, 0.5]} position={[0, 1, 7]} />
          <CuboidCollider args={[8, 3, 0.5]} position={[0, 1, -7]} />
          <CuboidCollider args={[0.5, 3, 8]} position={[7, 1, 0]} />
          <CuboidCollider args={[0.5, 3, 8]} position={[-7, 1, 0]} />
        </RigidBody>

        <InstancedRigidBodies
          positions={cubeTransforms.positions}
          rotations={cubeTransforms.rotations}
          scales={cubeTransforms.scales}
        >
          <instancedMesh castShadow ref={cubes} args={[null, null, cubeCount]}>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
      </Physics>
    </>
  );
}

export default App;

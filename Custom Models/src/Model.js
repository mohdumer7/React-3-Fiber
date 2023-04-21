import { useGLTF, Clone } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Model() {
  const model = useGLTF("./hamburger.glb");
  const test = useRef();
  useFrame((_, delta) => {
    test.current.rotation.y += delta;
  });
  console.log(model);

  return (
    <>
      <Clone
        object={model.scene}
        ref={test}
        scale={0.35}
        position-z={-3}
        position-y={-1}
      />
    </>
  );
}

useGLTF.preload("./hamburger.glb");

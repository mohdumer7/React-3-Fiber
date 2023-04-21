import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useControls } from "leva";
export default function fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  const { animationName } = useControls({
    animationName: { options: animations.names },
  });

  useEffect(() => {
    const action = animations.actions[animationName];
    action.fadeIn(0.5).play();

    return () => {
      console.log("dispose");
      action.fadeOut(0.5).play();
    };
  }, [animationName]);
  return (
    <primitive object={fox.scene} scale={0.02} position={[-2.5, -1, 2.5]} />
  );
}

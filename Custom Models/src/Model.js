import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Model() {
  const model = useLoader(GLTFLoader, "./FlightHelmet/glTF/FlightHelmet.gltf");
  console.log(model);
  return <primitive object={model.scene} scale={5} position-y={-1} />;
}

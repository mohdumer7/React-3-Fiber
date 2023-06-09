import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import App from "./App";
import * as THREE from "three";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas flat camera={{}}>
      <App />
    </Canvas>
  </React.StrictMode>
);

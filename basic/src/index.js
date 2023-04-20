import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Canvas>
      <App />
    </Canvas>
  </React.StrictMode>
);

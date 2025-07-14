import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Three from "./three";

function App() {
  return (
    <>
      <Canvas className="!h-screen">
        <Suspense fallback={null}>
          <Three />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;

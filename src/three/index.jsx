import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Planet from "./Planet";
import { angleToRadians } from "../utilities/functions";
import { planets } from "../utilities/planets";
import { BackSide } from "three";

const SUN_MASS = 20;

export default function Three() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1, 45]} />
      <OrbitControls
        minPolarAngle={angleToRadians(60)}
        maxPolarAngle={angleToRadians(80)}
      />

      {/* The Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 40, 40]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* The planets */}
      {planets.map((planet) => {
        return (
          <Planet
            key={planet.name}
            distance={planet.distance * 3}
            position={[-5, 0, 0]}
            sunMass={SUN_MASS}
            radius={planet.radius}
            color={planet.color}
            name={planet.name}
          />
        );
      })}

      <directionalLight
        position={[50, 50, 50]} // adjust as needed
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Enviroment */}
      <Environment background>
        <mesh>
          <sphereGeometry args={[50, 100, 100]} />
          <meshBasicMaterial color={"#000"} side={BackSide} />
        </mesh>
      </Environment>
    </>
  );
}

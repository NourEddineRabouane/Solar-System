import { useEffect, useRef, useMemo } from "react";
import {
  angleToRadians,
  circularMovement,
  period,
} from "../utilities/functions";

const Planet = ({ name, distance, sunMass, position, radius, color }) => {
  const planetRef = useRef(null);
  const tethaRef = useRef(180); // Use ref instead of state to avoid re-renders
  const animationFrameRef = useRef(null);
  const lightRef = useRef(null);

  const T = useMemo(() => {
    return period(distance, sunMass);
  }, [distance, sunMass]);

  useEffect(() => {
    const angularVelocity = 3 / T; // degrees per ms

    const animate = (time) => {
      if (planetRef.current) {
        // Update angle
        tethaRef.current += angularVelocity * 16; 
        if (tethaRef.current >= 360) tethaRef.current -= 360;

        // Calculate new position
        const [x, y, z] = circularMovement(
          distance,
          angleToRadians(tethaRef.current)
        );
        planetRef.current.position.set(x, y, z);

        if (lightRef.current) {
          lightRef.current.position.set(x, y, z);
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameRef.current); 
  }, [T, distance]); 

  return (
    <group>
      <mesh ref={planetRef} position={position} castShadow receiveShadow >
        <sphereGeometry args={[radius, 40, 40]} />
        <meshStandardMaterial
          color={color}
          
        />
      </mesh>

      <pointLight
        ref={lightRef}
        color={"white"}
        intensity={1.5}
        distance={radius * 6}
        castShadow
      />
    </group>
  );
};

export default Planet;

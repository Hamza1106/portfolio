import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";
import { Group } from "three";
import planetAsset from "@/assets/stylized_planet.glb.asset.json";

function PlanetModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(planetAsset.url);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} scale={1.6}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload(planetAsset.url);

const Planet = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#8ecbff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#c58cff" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#5eead4" />
      <Suspense fallback={null}>
        <PlanetModel />
        <Environment preset="city" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
};

export default Planet;

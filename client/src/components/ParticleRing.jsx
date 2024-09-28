import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../utils";

const ParticleRing = () => {
  return (
    <div className="relative">
      {/* 3D Particle Ring with Zoom/Drag */}
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100vh" }}
        className="bg-slate-900"
      >
        {/* Allowing drag and zoom functionality */}
        <OrbitControls maxDistance={20} minDistance={10} enableZoom={true} enableRotate={true} />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>

      {/* Centered About content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="px-6 py-8 max-w-2xl w-full bg-gray-900 bg-opacity-80 rounded-lg shadow-lg text-center pointer-events-auto">
          <h1 className="text-3xl font-bold mb-6 text-blue-400">About</h1>
          <p className="mb-4 text-gray-300">
            This is a MERN (MongoDB, Express, React, Node.js) stack application with
            authentication. It allows users to sign up, log in, and log out, and
            provides access to protected routes only for authenticated users.
          </p>
          <p className="mb-4 text-gray-300">
            The front-end of the application is built with React and uses React
            Router for client-side routing. The back-end is built with Node.js and
            Express, and uses MongoDB as the database. Authentication is implemented
            using JSON Web Tokens (JWT).
          </p>
          <p className="mb-4 text-gray-300">
            This application is intended as a starting point for building full-stack
            web applications with authentication using the MERN stack. Feel free to
            use it as a template for your own projects!
          </p>
        </div>
      </div>
    </div>
  );
};

// Particle Ring logic
const PointCircle = () => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05; // Control the rotation speed
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

// A single point in the 3D space
const Point = ({ position, color }) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};

export default ParticleRing;

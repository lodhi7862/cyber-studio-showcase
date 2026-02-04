import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function OrbParticles() {
    const ref = useRef<THREE.Points>(null);
    const groupRef = useRef<THREE.Group>(null);

    // Generate particles in a sphere
    const positions = useMemo(() => {
        const count = 5000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2;
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (!ref.current || !groupRef.current) return;

        // Constant rotation
        ref.current.rotation.y += delta * 0.1;
        ref.current.rotation.x += delta * 0.05;

        // Pulse effect
        const time = state.clock.getElapsedTime();
        const scale = 1 + Math.sin(time) * 0.05;
        ref.current.scale.set(scale, scale, scale);

        // Subtle drift based on pointer (from state)
        // Check if state.pointer is available
        if (state.pointer) {
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, state.pointer.x * 0.5, 0.1);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, state.pointer.y * 0.5, 0.1);
        }
    });

    return (
        <group ref={groupRef}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#00ffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            <mesh>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial
                    color="#0088ff"
                    emissive="#00ffff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.1}
                />
            </mesh>
        </group>
    );
}

export const HeroOrb = () => {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OrbParticles />
            </Canvas>
        </div>
    );
};

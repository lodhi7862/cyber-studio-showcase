import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instance, Instances, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const COUNT = 600; // further reduced for maximum stability
const RADIUS = 15;
const LENGTH = 100;

function TunnelSegment({ zOffset = 0 }) {
    const shapes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < COUNT; i++) {
            const radius = Math.random() * 2 + RADIUS;
            const angle = (i / COUNT) * Math.PI * 2 * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = -Math.random() * LENGTH;
            const scale = Math.random() * 0.4 + 0.1;
            const rotation = Math.random() * Math.PI;

            temp.push({
                position: [x, y, z] as [number, number, number],
                scale,
                rotation
            });
        }
        return temp;
    }, []);

    return (
        <group position={[0, 0, zOffset]}>
            <Instances range={COUNT}>
                <coneGeometry args={[0.5, 1, 3]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={10} // crank up intensity to feel "bright" without bloom
                    transparent
                    opacity={0.7}
                    side={THREE.DoubleSide}
                />
                {shapes.map((s, i) => (
                    <Instance
                        key={i}
                        position={s.position}
                        scale={s.scale}
                        rotation={[s.rotation, s.rotation, s.rotation]}
                    />
                ))}
            </Instances>

            <Instances range={COUNT / 2} position={[0, 0, -LENGTH / 2]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color="#bc13fe"
                    emissive="#bc13fe"
                    emissiveIntensity={5}
                    transparent
                    opacity={0.5}
                />
                {shapes.slice(0, COUNT / 2).map((s, i) => (
                    <Instance
                        key={i}
                        position={[s.position[0] * 1.2, s.position[1] * 1.2, s.position[2]]}
                        scale={s.scale * 0.8}
                        rotation={[s.rotation, s.rotation, s.rotation]}
                    />
                ))}
            </Instances>
        </group>
    );
}

function Tunnel() {
    const groupRef = useRef<THREE.Group>(null);
    const scrollSpeedRef = useRef(0.05);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            scrollSpeedRef.current = 0.05 + Math.min(scrollY * 0.0003, 1.0); // capped speed
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Smoothly animate the group
        groupRef.current.position.z += scrollSpeedRef.current;

        // Seamless reset logic
        if (groupRef.current.position.z >= LENGTH) {
            groupRef.current.position.z = 0;
        }

        // Twist based on mouse - capped to prevent extreme angles
        groupRef.current.rotation.z += delta * 0.05;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current.y * 0.1, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.current.x * 0.1, 0.05);
    });

    return (
        <group ref={groupRef}>
            <TunnelSegment zOffset={0} />
            <TunnelSegment zOffset={-LENGTH} />
        </group>
    );
}

export const CyberVortex = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black pointer-events-none">
            {/* Reduced dpr to 1 for maximum stability */}
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={1}
                gl={{ antialias: false, powerPreference: "high-performance" }}
            >
                <color attach="background" args={['#020205']} />
                <ambientLight intensity={1.0} />
                <pointLight position={[10, 10, 10]} intensity={2} />
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />

                <Tunnel />

                <fog attach="fog" args={['#020205', 5, 50]} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
        </div>
    );
};

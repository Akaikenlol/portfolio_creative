"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { func } from "three/examples/jsm/nodes/Nodes.js";

const Shapes = () => {
	return (
		<div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
			<Canvas
				className="z-0"
				shadows
				gl={{ antialias: false }}
				dpr={[1, 1.5]}
				camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
			>
				<Suspense fallback={null}>
					<Geometries />
					<ContactShadows
						position={[0, -3.5, 0]}
						opacity={0.65}
						scale={40}
						blur={1}
						far={9}
					/>
					<Environment preset="studio" />
				</Suspense>
			</Canvas>
		</div>
	);
};

export default Shapes;

function Geometries() {
	const geometries = [
		{
			position: [0, 0, 0],
			r: 0.3,
			geometry: new THREE.IcosahedronGeometry(3), // Gem
		},
		{
			position: [1, -0.75, 4],
			r: 0.4,
			geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
		},
		{
			position: [-1.4, 2, -4],
			r: 0.6,
			geometry: new THREE.DodecahedronGeometry(1.5), // Soccer ball
		},
		{
			position: [-0.8, -0.75, 5],
			r: 0.5,
			geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
		},
		{
			position: [1.6, 1.6, -4],
			r: 0.7,
			geometry: new THREE.OctahedronGeometry(1.5), // Diamond
		},
	];

	const materials = [
		new THREE.MeshStandardMaterial({ color: 0xea7074, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0x1a5256, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0x015438, roughness: 0.4 }),
		new THREE.MeshStandardMaterial({ color: 0x662853, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({ color: 0xffc897, roughness: 0.1 }),
		new THREE.MeshStandardMaterial({
			color: 0x099280,
			roughness: 0.1,
			metalness: 0.5,
		}),
		new THREE.MeshStandardMaterial({
			color: 0xe8296c,
			roughness: 0.1,
			metalness: 0.5,
		}),
	];

	const soundEffects = [
		new Audio("/audio/knock1.ogg"),
		new Audio("/audio/knock2.ogg"),
		new Audio("/audio/knock3.ogg"),
	];

	// PASS to Geometry

	return geometries.map(({ position, r, geometry }) => (
		<Geometry
			key={JSON.stringify(position)}
			position={position.map((p) => p * 2)}
			r={r}
			soundEffects={soundEffects}
			geometry={geometry}
			materials={materials}
		/>
	));
}

function Geometry({ geometry, materials, position, r, soundEffects }) {
	const meshRef = useRef();
	const [visible, setVisible] = useState(true);

	const startingMaterial = getRandomMaterial();

	function getRandomMaterial() {
		return gsap.utils.random(materials);
	}

	function handleClick(e) {
		const mesh = e.object;

		gsap.utils.random(soundEffects).play();

		gsap.to(mesh.rotation, {
			// x: `+=${gsap.utils.random(-Math.PI, Math.PI)}`,
			x: `+=${gsap.utils.random(0, 2)}`,
			y: `+=${gsap.utils.random(0, 2)}`,
			z: `+=${gsap.utils.random(0, 2)}`,
			duration: 1.3,
			ease: "elastic.out(1, 0.3)",
			yoyo: true,
		});
		mesh.material = getRandomMaterial();
	}

	const handlePointerOver = () => {
		document.body.style.cursor = "pointer";
	};

	const handlePointerOut = () => {
		document.body.style.cursor = "default";
	};

	useEffect(() => {
		let ctx = gsap.context(() => {
			setVisible(true);
			gsap.from(meshRef.current.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1,
				ease: "elastic.out(1, 0.3)",
				delay: 0.3,
			});
		});
		return () => ctx.revert(); // Clean up function
	}, []);

	return (
		<group position={position} ref={meshRef}>
			<Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
				<mesh
					geometry={geometry}
					onClick={handleClick}
					onPointerOver={handlePointerOver}
					onPointerOut={handlePointerOut}
					visible={visible}
					material={startingMaterial}
				/>
			</Float>
		</group>
	);
}

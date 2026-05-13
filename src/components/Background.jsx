import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
	const blobRefs = useRef([]);

	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	];

	useEffect(() => {
		let currentScroll = 0;
		let ticking = false;

		const updateBlobs = () => {
			blobRefs.current.forEach((blob, index) => {
				if (!blob) return;

				const initialPos = initialPositions[index];

				const xOffset = Math.sin(currentScroll / 100 + index * 0.5) * 340;
				const yOffset = Math.cos(currentScroll / 100 + index * 0.5) * 40;

				const x = initialPos.x + xOffset;
				const y = initialPos.y + yOffset;

				blob.style.transform = `translate(${x}px, ${y}px)`;
				blob.style.transition = "transform 1.2s ease-out";
			});

			ticking = false;
		};

		const handleScroll = () => {
			currentScroll = window.pageYOffset;

			if (!ticking) {
				window.requestAnimationFrame(updateBlobs);
				ticking = true;
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="fixed inset-0 -z-10">
			<div className="absolute inset-0">

				{/* 💗 Pink Glow */}
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-pink-400 rounded-full mix-blend-screen filter blur-[150px] opacity-60"
				/>

				{/* 💜 Fuchsia Glow */}
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-72 h-72 md:w-96 md:h-96 bg-fuchsia-500 rounded-full mix-blend-screen filter blur-[150px] opacity-50 hidden sm:block"
				/>

				{/* 🌸 Purple Glow */}
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-40%] md:left-20 w-72 h-72 md:w-96 md:h-96 bg-purple-400 rounded-full mix-blend-screen filter blur-[150px] opacity-55"
				/>

				{/* ✨ Indigo Glow */}
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-72 h-72 md:w-96 md:h-96 bg-indigo-400 rounded-full mix-blend-screen filter blur-[150px] opacity-40 hidden sm:block"
				/>

			</div>

			{/* grid overlay (soft white aesthetic) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
		</div>
	);
};

export default AnimatedBackground;
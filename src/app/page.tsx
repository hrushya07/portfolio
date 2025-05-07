'use client';

import { useEffect, useRef } from "react";
import { createTimeline, createScope, eases } from 'animejs';


export default function Home() {
	const root = useRef(null);

	const initialTimeline = createTimeline();

	const bioText = 'IT Consultant & Polyglot Developer Bridging business needs with tech solutions JavaScript & Go enthusiast'

	useEffect(() => {
		createScope({ root })
			.add(() => {

				initialTimeline
					.add('.bar', {
						width: {
							from: 0,
							to: '100%',
							ease: eases.cubicBezier(.6, -0.01, .37, 1)
						},
						duration: 3000,
					})
					.add('.loader', {
						width: { from: 400, to: '100%' },
						maxWidth: { from: '90%', to: '100%' },
						height: {
							from: 24,
							to: '100%'
						},
						ease: eases.outQuint,
						duration: 1000,
						onComplete: () => {
							const loaderEl = document.querySelector('.loader-container');
							if (loaderEl) {
								loaderEl.remove();
							}
						}
					})
					.add('.page', {
						display: 'block',
					})
					.add('.slide', {
						translateX: ['-100%', '0%', '100%'],
						opacity: [0, 1],
						duration: 1000,
						ease: eases.outExpo,
						onComplete: () => {
							const loaderEl = document.querySelector('.slide');
							if (loaderEl) {
								loaderEl.remove();
							}
						}
					})
					.add('.hrushikesh-text', {
						opacity: [0, 1],
					}, "-=700")
				// .add('.slide-2', {
				// 	translateX: ['100%', '0%', '-100%'],
				// 	opacity: [0, 1],
				// 	duration: 1000,
				// 	ease: eases.outExpo,
				// })
				// .add('.text-2', {
				// 	opacity: [0, 1],
				// }, "-=700")
				.add('.bio-text .letter', {
					scale: [7, 1],
					opacity: [0, 1],
					// duration: 100,
					ease: eases.outExpo,
					delay: (el, i) => i * 20,
				}).add('.scroll-indicator', {
					display: 'block',
					opacity: [0, 1],
					ease: eases.outExpo,
					duration: 1000,
				})
			});


	}, []);

	return (
		<main ref={root} className="main h-screen p-0 m-0 bg-black">
			{/* laoding screen */}
			<div className="w-full h-full bg-white fixed top-0 left-0 text-white loader-container">
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex bg-gray loader"
					style={{ width: 400, height: 24, maxWidth: '90%' }}
				>
					<div className="w-full bg-black h-full bar"></div>
				</div>
			</div>


			{/* main screen */}
			{/* <div className="landing-page opacity-0">
				<div className="content overflow-hidden">
					<div className="slide opacity-0 p-2 z-1"></div>
					<div className="hrushikesh-text opacity-0 text-white general-sans name-gradient">Hrushikesh</div>
				</div> */}

				{/* <div className="content overflow-hidden">
						<div className="slide-2 opacity-0 p-2"></div>
						<div className="text-2 opacity-0 text-white">Pardeshi</div>
					</div> */}

				{/* <p className="text-white bio-text">
					{bioText.split('').map((char, index) => (
						<span className="letter opacity-0 inline-block" key={index}>
							{char === ' ' ? '\u00A0' : char}
						</span>
					))}
				</p>
			</div> */}





			<div className="page hidden">
				<div className="landing-page relative">
					<div className="content overflow-hidden">
						<div className="slide opacity-0 p-2 z-1"></div>
						<div className="hrushikesh-text opacity-0 text-white general-sans name-gradient general-sans">Hrushikesh</div>
					</div>

					<div className="bio-container">
						<p className="text-white bio-text gambetta">
							{bioText.split('').map((char, index) => (
								<span className="letter opacity-0 inline-block" key={index}>
									{char === ' ' ? '\u00A0' : char}
								</span>
							))}
						</p>
					</div>

					<div className="scroll-indicator hidden">
						<div className="dots"></div>
					</div>

				</div>
			</div>

		</main>
	);
}

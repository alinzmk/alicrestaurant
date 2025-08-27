import { useLayoutEffect, useRef, useState } from "react";
import { Button, Chip, Spinner } from "@heroui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../i18n.jsx";

// Register plugin once in module scope
if (!gsap.core.globals()["ScrollTrigger"]) {
	gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxHero() {
	const containerRef = useRef(null);
	const bgRef = useRef(null);
	const midRef = useRef(null);
	const fgRef = useRef(null);
	const videoRef = useRef(null);
	const { t } = useI18n();
	const [videoReady, setVideoReady] = useState(false);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Background slower
			gsap.to(bgRef.current, {
				yPercent: -20,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=120%",
					scrub: 1
				}
			});

			// Mid layer medium
			gsap.to(midRef.current, {
				yPercent: -35,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=120%",
					scrub: 1.2
				}
			});

			// Foreground faster (only translate, keep opacity steady to avoid flashes)
			gsap.to(fgRef.current, {
				yPercent: -50,
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "+=120%",
					scrub: 1.4
				}
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section ref={containerRef} className="relative h-screen -mt-16 w-full overflow-hidden bg-black text-white">
			{/* Loader overlay */}
			{!videoReady && (
				<div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black">
					<Spinner color="secondary" label="Loading..." />
				</div>
			)}

			{/* Background layer (static, no AOS fade) */}
			<div ref={bgRef} className="absolute inset-0">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900" />
				<video
					ref={videoRef}
					className={`h-full w-full object-cover opacity-40 transition-opacity duration-500 ${videoReady ? "opacity-40" : "opacity-0"}`}
					autoPlay
					loop
					muted
					playsInline
					preload="auto"
					onCanPlay={() => setVideoReady(true)}
					onLoadedData={() => setVideoReady(true)}
					aria-label="Background video"
				>
					<source src="https://videos.pexels.com/video-files/2040075/2040075-hd_1920_1080_24fps.mp4" type="video/mp4" />
					{/* <source src="https://videos.pexels.com/video-files/3121327/3121327-uhd_2560_1440_24fps.mp4" type="video/mp4" /> */}
				</video>
			</div>

			{/* Mid layer decorative shapes */}
			<div ref={midRef} className="absolute inset-0">
				<div className="absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
				<div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
				<div className="absolute bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-2xl" />
			</div>

			{/* Foreground content (text animates on scroll) */}
			<div ref={fgRef} className={`relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${videoReady ? "opacity-100" : "opacity-0"}`}>
				<Chip color="secondary" variant="flat" className="mb-6">{t("hero.badge")}</Chip>
				<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
					{t("hero.title")}
				</h1>
				<p className="mt-4 max-w-2xl text-balance text-base text-white/80 sm:text-lg">
					{t("hero.desc")}
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button color="secondary" variant="shadow">{t("hero.cta1")}</Button>
					<Button variant="bordered" className="border-white/30 text-white">{t("hero.cta2")}</Button>
				</div>
			</div>
		</section>
	);
} 
import { useMemo, useState, useLayoutEffect, useRef } from "react";
import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FadeInWhenVisible from "./FadeInWhenVisible.jsx";
import { useI18n } from "../i18n.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "../design/assets/photo1.jpg";
import img2 from "../design/assets/photo2.jpg";
import img3 from "../design/assets/photo3.jpg";
import img4 from "../design/assets/photo4.jpg";
import video1 from "../design/assets/video1.mp4";
import video2 from "../design/assets/video2.mp4";
import video3 from "../design/assets/video3.mp4";


if (!gsap.core.globals()["ScrollTrigger"]) {
	gsap.registerPlugin(ScrollTrigger);
}

const defaultImages = [
	img1,
	img2,
	img3,
	img4,
	video1,
	video2,
	video3,
];

export default function Gallery({ images = defaultImages }) {
	const [active, setActive] = useState(null);
	const { t } = useI18n();
	const slides = useMemo(() => images, [images]);

	const swiperRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				swiperRef.current,
				{ y: 40, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
			);
			gsap.to(swiperRef.current, {
				y: -160,
				ease: "none",
				scrollTrigger: {
					trigger: swiperRef.current,
					start: "top 85%",
					end: "bottom top",
					scrub: 1.2
				}
			});
			ScrollTrigger.refresh();
		});
		return () => ctx.revert();
	}, []);

	return (
		<FadeInWhenVisible>
			<section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
				<div className="mb-10 text-center">
					<h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("gallery.title")}</h2>
					<p className="mt-3 text-base text-foreground/70">{t("gallery.desc")}</p>
				</div>

				<div ref={swiperRef} className="relative will-change-transform">
					<Swiper
						modules={[EffectCoverflow]}
						effect="coverflow"
						grabCursor
						centeredSlides
						slidesPerView="auto"
						loop={slides.length > 3}
						coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.5, slideShadows: true }}
						className=""
						style={{ height: "560px" }}
					>
						{slides.map((src, idx) => (
							<SwiperSlide key={src} className="!h-[420px] !w-[320px] sm:!h-[480px] sm:!w-[380px] lg:!h-[520px] lg:!w-[420px]">
								<button
									onClick={() => setActive({ src, idx })}
									className="group relative block h-full w-full overflow-hidden rounded-2xl border border-content3/20 bg-content1/60 shadow-md transition hover:shadow-xl focus:outline-none"
								>
									{String(src).toLowerCase().endsWith(".mp4") ? (
										<video
											src={src}
											className="h-full w-full object-cover"
											muted
											playsInline
											autoPlay
											loop
											preload="metadata"
										/>
									) : (
									<Image
											src={src}
										alt={`Gallery image ${idx + 1}`}
										removeWrapper
										className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
									/>
									)}
									<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
								</button>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<Modal isOpen={!!active} onOpenChange={() => setActive(null)} size="xl" backdrop="blur">
					<ModalContent className="bg-content1">
						{() => (
							<ModalBody className="p-0">
								{active && (
									String(active.src).toLowerCase().endsWith(".mp4") ? (
										<video
											src={active.src}
											className="h-full w-full rounded-b-xl object-contain"
											autoPlay
											loop
											muted
											controls
											playsInline
										/>
									) : (
									<Image src={active.src} alt={`Large image ${active.idx + 1}`} className="h-full w-full rounded-b-xl object-contain" />
									)
								)}
							</ModalBody>
						)}
					</ModalContent>
				</Modal>
			</section>
		</FadeInWhenVisible>
	);
} 
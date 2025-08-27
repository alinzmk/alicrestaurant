import { useMemo, useState } from "react";
import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FadeInWhenVisible from "./FadeInWhenVisible.jsx";
import { useI18n } from "../i18n.jsx";

const defaultImages = [
	"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=2069&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
	"https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1974&auto=format&fit=crop",
];

export default function Gallery({ images = defaultImages }) {
	const [active, setActive] = useState(null);
	const { t } = useI18n();
	const slides = useMemo(() => images, [images]);

	return (
		<FadeInWhenVisible>
			<section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
				<div className="mb-10 text-center">
					<h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("gallery.title")}</h2>
					<p className="mt-3 text-base text-foreground/70">{t("gallery.desc")}</p>
				</div>

				<div className="relative">
					<Swiper
						modules={[EffectCoverflow, Navigation, Pagination]}
						effect="coverflow"
						grabCursor
						centeredSlides
						slidesPerView="auto"
						loop={slides.length > 3}
						coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.5, slideShadows: true }}
						pagination={{ clickable: true }}
						navigation
						className="!pb-12"
						style={{ height: "560px" }}
					>
						{slides.map((src, idx) => (
							<SwiperSlide key={src} className="!h-[420px] !w-[320px] sm:!h-[480px] sm:!w-[380px] lg:!h-[520px] lg:!w-[420px]">
								<button
									onClick={() => setActive({ src, idx })}
									className="group relative block h-full w-full overflow-hidden rounded-2xl border border-content3/20 bg-content1/60 shadow-md transition hover:shadow-xl focus:outline-none"
								>
									<Image
										src={`${src}&sat=-15`}
										alt={`Gallery image ${idx + 1}`}
										removeWrapper
										className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
									/>
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
									<Image src={active.src} alt={`Large image ${active.idx + 1}`} className="h-full w-full rounded-b-xl object-contain" />
								)}
							</ModalBody>
						)}
					</ModalContent>
				</Modal>
			</section>
		</FadeInWhenVisible>
	);
} 
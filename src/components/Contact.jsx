import { useLayoutEffect, useRef } from "react";
import { useI18n } from "../i18n.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (!gsap.core.globals()["ScrollTrigger"]) {
	gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
	const { t } = useI18n();
	const sectionRef = useRef(null);
	const card1Ref = useRef(null);
	const card2Ref = useRef(null);
	const card3Ref = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			// Set initial state
			gsap.set([card1Ref.current, card2Ref.current, card3Ref.current], {
				y: 60,
				opacity: 0
			});

			// Staggered animations
			gsap.to(card1Ref.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 60%",
					scrub: false
				}
			});

			gsap.to(card2Ref.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
				delay: 0.5,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 60%",
					scrub: false
				}
			});

			gsap.to(card3Ref.current, {
				y: 0,
				opacity: 1,
				duration: 0.8,
				ease: "power3.out",
				delay: 1.0,
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 80%",
					end: "top 60%",
					scrub: false
				}
			});

			ScrollTrigger.refresh();
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id="contact" className="mx-auto max-w-7xl px-6 py-20">
			<div className="mb-10 text-center">
				<h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("contact.title")}</h2>
				<p className="mt-3 text-base text-foreground/70">{t("contact.desc")}</p>
			</div>

			<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
				{/* Description */}
				<div ref={card1Ref} className="rounded-2xl border border-content3/20 bg-content1/60 p-6 shadow-sm will-change-transform">
					<h3 className="mb-3 text-lg font-semibold">{t("contact.about")}</h3>
					<p className="text-sm leading-6 text-foreground/80">
						{t("contact.about.text")}
					</p>
				</div>

				{/* Address */}
				<address ref={card2Ref} className="not-italic rounded-2xl border border-content3/20 bg-content1/60 p-6 shadow-sm will-change-transform">
					<h3 className="mb-3 text-lg font-semibold">{t("contact.address")}</h3>
					<ul className="space-y-2 text-sm text-foreground/80">
						<li>{t("contact.address.line1")}</li>
						<li>{t("contact.address.line2")}</li>
						<li>{t("contact.address.line3")}</li>
					</ul>
					<div className="mt-4 space-y-1 text-sm">
						<a href="mailto:hello@alicres.com" className="text-warning hover:underline">hello@alicres.com</a>
						<div>+1 (415) 555-0123</div>
					</div>
				</address>

				{/* Logo */}
				<div ref={card3Ref} className="flex items-center justify-center rounded-2xl border border-content3/20 bg-content1/60 p-6 shadow-sm will-change-transform">
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-xl bg-gradient-to-br from-warning/80 to-fuchsia-500/70" />
						<div>
							<div className="text-xl font-semibold leading-tight">Alicres</div>
							<div className="text-xs text-foreground/60">Motion • Design • Experience</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
} 
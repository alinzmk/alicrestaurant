import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useI18n } from "../i18n.jsx";

export default function Navbar() {
	const lastScrollY = useRef(0);
	const [isAtTop, setIsAtTop] = useState(true);
	const [open, setOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const translateY = useMotionValue(0);
	const springConfig = isMobile
		? { stiffness: 400, damping: 45, mass: 0.7 }
		: { stiffness: 700, damping: 40, mass: 0.6 };
	const y = useSpring(translateY, springConfig);
	const { t, lang, setLang } = useI18n();

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const onChange = () => setIsMobile(mq.matches);
		onChange();
		mq.addEventListener("change", onChange);
		return () => mq.removeEventListener("change", onChange);
	}, []);

	useEffect(() => {
		const onScroll = () => {
			const current = window.scrollY;
			setIsAtTop(current <= 8);

			if (current > lastScrollY.current && current > 80) {
				translateY.set(-80); // hide up
				setOpen(false); // close menu on scroll down
			} else {
				translateY.set(0); // show
			}
			lastScrollY.current = current;
		};

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [translateY]);

	// lock body scroll when menu is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => { document.body.style.overflow = ""; };
	}, [open]);

	// Custom eased scroll (ease-out cubic: fast then slow)
	function scrollToId(id) {
		const target = document.getElementById(id);
		if (!target) return;

		const headerOffset = 64; // 4rem navbar
		const startY = window.scrollY;
		const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
		const distance = targetY - startY;
		const duration = Math.min(1200, Math.max(400, Math.abs(distance) * 0.6));

		let startTime = null;
		const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

		function step(timestamp) {
			if (startTime === null) startTime = timestamp;
			const elapsed = timestamp - startTime;
			const progress = Math.min(1, elapsed / duration);
			const eased = easeOutCubic(progress);
			window.scrollTo(0, startY + distance * eased);
			if (progress < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	const handleNavClick = (e, id) => {
		e.preventDefault();
		scrollToId(id);
		setOpen(false);
	};

	const panelTransition = isMobile
		? { duration: 1, ease: [0.22, 1, 0.36, 1] }
		: { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

	return (
		<motion.header
			style={{ y }}
			className={`fixed inset-x-0 top-0 z-50 border-b border-content3/20 bg-content1 md:backdrop-blur md:supports-[backdrop-filter]:bg-background/60 ${isAtTop ? "md:bg-transparent" : "md:bg-background/70"}`}
		>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<a href="#" className="text-lg font-semibold">Alicres</a>

				{/* Desktop nav */}
				<nav className="hidden items-center gap-6 text-sm md:flex">
					<a href="#gallery" onClick={(e) => handleNavClick(e, "gallery")} className="hover:text-secondary">{t("nav.gallery")}</a>
					<a href="#location" onClick={(e) => handleNavClick(e, "location")} className="hover:text-secondary">{t("nav.location")}</a>
					<a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-secondary">{t("nav.contact")}</a>
					<select
						aria-label="Language"
						value={lang}
						onChange={(e) => setLang(e.target.value)}
						className="rounded-md border border-content3/30 bg-content1/70 px-2 py-1 text-foreground/90 hover:border-content3/50"
					>
						<option value="en">EN</option>
						<option value="tr">TR</option>
						<option value="ar">AR</option>
					</select>
				</nav>

				{/* Mobile hamburger */}
				<div className="md:hidden">
					<button
						aria-label="Toggle menu"
						onClick={() => setOpen((v) => !v)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-content3/30 bg-content1/70"
					>
						<span className="sr-only">Menu</span>
						<div className="relative h-4 w-5">
							<span className={`absolute left-0 top-0 block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
							<span className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
							<span className={`absolute left-0 top-3 block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
						</div>
					</button>
				</div>
			</div>

			{/* Mobile fullscreen menu */}
			<AnimatePresence>
				{open && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 z-40 bg-black/50"
							onClick={() => setOpen(false)}
						/>
						{/* Panel */}
						<motion.aside
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={panelTransition}
							className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-content1 shadow-xl"
						>
							<div className="flex h-16 items-center justify-between border-b border-content3/20 px-6">
								<div className="text-lg font-semibold">Alicres</div>
								<button
									aria-label="Close menu"
									onClick={() => setOpen(false)}
									className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-content3/30 bg-content1/70"
								>
									<span className="sr-only">Close</span>
									<div className="relative h-4 w-5">
										<span className="absolute left-0 top-1.5 block h-0.5 w-5 rotate-45 bg-foreground" />
										<span className="absolute left-0 top-1.5 block h-0.5 w-5 -rotate-45 bg-foreground" />
									</div>
								</button>
							</div>
							<div className="flex h-[calc(100vh-4rem)] flex-col justify-between px-6 py-4">
								<nav className="space-y-2">
									<a href="#gallery" onClick={(e) => handleNavClick(e, "gallery")} className="block rounded-md px-3 py-3 text-base hover:bg-content2/30">{t("nav.gallery")}</a>
									<a href="#location" onClick={(e) => handleNavClick(e, "location")} className="block rounded-md px-3 py-3 text-base hover:bg-content2/30">{t("nav.location")}</a>
									<a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="block rounded-md px-3 py-3 text-base hover:bg-content2/30">{t("nav.contact")}</a>
								</nav>
								<div className="flex items-center justify-between gap-3 border-t border-content3/20 pt-4">
									<label htmlFor="lang" className="text-sm text-foreground/80">Language</label>
									<select
										id="lang"
										aria-label="Language"
										value={lang}
										onChange={(e) => setLang(e.target.value)}
										className="w-28 rounded-md border border-content3/30 bg-content1/70 px-2 py-2 text-foreground/90 hover:border-content3/50"
									>
										<option value="en">EN</option>
										<option value="tr">TR</option>
										<option value="ar">AR</option>
									</select>
								</div>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</motion.header>
	);
} 
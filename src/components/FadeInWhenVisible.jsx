import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FadeInWhenVisible({ children, delay = 0, y = 24, className = "" }) {
	const ref = useRef(null);
	const controls = useAnimation();
	const inView = useInView(ref, { amount: 0.15, once: true });

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [inView, controls]);

	return (
		<motion.div
			ref={ref}
			className={className}
			initial="hidden"
			animate={controls}
			variants={{
				hidden: { opacity: 0, y },
				visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay } }
			}}
		>
			{children}
		</motion.div>
	);
} 
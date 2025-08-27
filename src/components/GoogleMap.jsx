import PropTypes from "prop-types";
import FadeInWhenVisible from "./FadeInWhenVisible.jsx";
import { useI18n } from "../i18n.jsx";

export default function GoogleMap({ embedUrl, title = "Google Map", height = 420, rounded = true }) {
	const { t } = useI18n();
	return (
		<FadeInWhenVisible>
			<section id="location" className="mx-auto max-w-7xl px-6 py-16">
				<div className="mb-6 text-center">
					<h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("map.title")}</h2>
					<p className="mt-2 text-base text-foreground/70">{t("map.desc")}</p>
				</div>

				<div className={`relative w-full overflow-hidden ${rounded ? "rounded-2xl" : ""} border border-content3/20 bg-content1/50 shadow`}
					style={{ height }}
				>
					<iframe
						src={embedUrl}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						refererPolicy="no-referrer-when-downgrade"
						title={title}
						className="block h-full w-full"
					/>
				</div>
			</section>
		</FadeInWhenVisible>
	);
}

GoogleMap.propTypes = {
	embedUrl: PropTypes.string.isRequired,
	title: PropTypes.string,
	height: PropTypes.number,
	rounded: PropTypes.bool,
}; 
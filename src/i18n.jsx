import { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(null);

const translations = {
	tr: {
		"nav.gallery": "Galeri",
		"nav.location": "Konum",
		"nav.contact": "İletişim",
		"hero.badge": "Yeni",
		"hero.title": "Alıç Restoran",
		"hero.desc": "Yeşilliğin arasında eşsiz bir yemek deneyimi.",
		"hero.cta1": "Başlayın",
		"hero.cta2": "Daha Fazla Bilgi",
		"gallery.title": "Fotoğraf Galerisi",
		"gallery.desc": "Eşsiz manzaralarımız ve yemeklerimizle tanışın.",
		"map.title": "Konum",
		"map.desc": "Aşağıdaki haritada bizi bulun.",
		"contact.title": "İletişime Geçin",
		"contact.desc": "Sizden haber almak isteriz. Aşağıdaki bilgilerle ulaşın.",
		"contact.about": "Hakkımızda",
		"contact.about.text": "Alicres; hareket, etkileşim ve tasarımı harmanlayarak etkileyici görsel deneyimler üretir. Netlik, performans ve akılda kalan detaylara odaklanırız.",
		"contact.address": "Adres",
		"contact.address.line1": "Yaratıcı Cad. 1234",
		"contact.address.line2": "San Francisco, CA 94107",
		"contact.address.line3": "Amerika Birleşik Devletleri"
	},
	en: {
		"nav.gallery": "Gallery",
		"nav.location": "Location",
		"nav.contact": "Contact",
		"hero.badge": "New",
		"hero.title": "Explore Our Gallery",
		"hero.desc": "Immersive visuals with smooth parallax powered by GSAP ScrollTrigger.",
		"hero.cta1": "Get Started",
		"hero.cta2": "Learn More",
		"gallery.title": "Photo Gallery",
		"gallery.desc": "Swipe through a 3D coverflow carousel. Tap to open.",
		"map.title": "Location",
		"map.desc": "Find us on the map below.",
		"contact.title": "Get in Touch",
		"contact.desc": "We'd love to hear from you. Reach out via the details below.",
		"contact.about": "About Us",
		"contact.about.text": "Alicres crafts engaging visual experiences blending motion, interaction, and design. We focus on clarity, performance, and delightful details that make products memorable.",
		"contact.address": "Address",
		"contact.address.line1": "1234 Creative Ave",
		"contact.address.line2": "San Francisco, CA 94107",
		"contact.address.line3": "United States"
	},
	ar: {
		"nav.gallery": "المعرض",
		"nav.location": "الموقع",
		"nav.contact": "تواصل",
		"hero.badge": "جديد",
		"hero.title": "استكشف معرضنا",
		"hero.desc": "تجربة حركة سلسة مدعومة بـ GSAP ScrollTrigger.",
		"hero.cta1": "ابدأ الآن",
		"hero.cta2": "اعرف المزيد",
		"gallery.title": "معرض الصور",
		"gallery.desc": "اسحب عبر كاروسيل ثلاثي الأبعاد. اضغط للفتح.",
		"map.title": "الموقع",
		"map.desc": "اعثر علينا على الخريطة أدناه.",
		"contact.title": "تواصل معنا",
		"contact.desc": "نسعد بالتواصل معك. استخدم التفاصيل أدناه.",
		"contact.about": "نبذة عنا",
		"contact.about.text": "تُقدّم Alicres تجارب بصرية جذابة تمزج الحركة والتفاعل والتصميم معًا، مع التركيز على الوضوح والأداء والتفاصيل الممتعة.",
		"contact.address": "العنوان",
		"contact.address.line1": "1234 شارع الإبداع",
		"contact.address.line2": "سان فرانسيسكو، كاليفورنيا 94107",
		"contact.address.line3": "الولايات المتحدة"
	},
	ru: {
		"nav.gallery": "Галерея",
		"nav.location": "Местоположение",
		"nav.contact": "Контакты",
		"hero.badge": "Новинка",
		"hero.title": "Исследуйте нашу галерею",
		"hero.desc": "Захватывающие визуальные эффекты с плавным параллаксом на GSAP ScrollTrigger.",
		"hero.cta1": "Начать",
		"hero.cta2": "Узнать больше",
		"gallery.title": "Фотогалерея",
		"gallery.desc": "Пролистывайте 3D coverflow карусель. Нажмите, чтобы открыть.",
		"map.title": "Местоположение",
		"map.desc": "Найдите нас на карте ниже.",
		"contact.title": "Связаться с нами",
		"contact.desc": "Мы рады вашей обратной связи. Свяжитесь с нами по данным ниже.",
		"contact.about": "О нас",
		"contact.about.text": "Alicres создаёт увлекательные визуальные впечатления, сочетая анимацию, интерактив и дизайн. Мы ценим ясность, производительность и запоминающиеся детали.",
		"contact.address": "Адрес",
		"contact.address.line1": "Ул. Креативная, 1234",
		"contact.address.line2": "Сан‑Франциско, Калифорния 94107",
		"contact.address.line3": "Соединённые Штаты"
	}
};

export function I18nProvider({ children }) {
	const [lang, setLang] = useState("tr");

	useEffect(() => {
		document.documentElement.lang = lang;
		// Keep layout LTR to avoid RTL issues with components like Swiper
		document.documentElement.dir = "ltr";
	}, [lang]);

	const value = useMemo(() => ({
		lang,
		setLang,
		t: (key) => translations[lang]?.[key] ?? translations.tr[key] ?? key
	}), [lang]);

	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used within I18nProvider");
	return ctx;
} 
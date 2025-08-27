import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./design/index.css";
import App from "./App.jsx";
import { I18nProvider } from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </HeroUIProvider>
  </StrictMode>
);

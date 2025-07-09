
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";

const container = document.getElementById("root")!;

// Check if the app was pre-rendered
const isPrerendered = window.__PRERENDERED__;

const AppWithProviders = () => (
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

if (isPrerendered) {
  // Hydrate pre-rendered content
  hydrateRoot(container, <AppWithProviders />);
  console.log('Hydrating pre-rendered content for route:', window.__ROUTE__);
} else {
  // Normal client-side rendering
  createRoot(container).render(<AppWithProviders />);
}

// Add global type declarations
declare global {
  interface Window {
    __PRERENDERED__?: boolean;
    __ROUTE__?: string;
  }
}

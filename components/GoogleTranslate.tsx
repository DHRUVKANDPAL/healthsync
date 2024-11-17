import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const GoogleTranslate: React.FC = () => {
  const scriptLoaded = useRef(false);
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    // Clear any existing initialization
    (window as any).googleTranslateElementInit = undefined;

    const initializeTranslate = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
          setIsScriptReady(true);
        }
      } catch (error) {
        console.error("Failed to initialize Google Translate:", error);
      }
    };

    const loadScript = () => {
      if (scriptLoaded.current) return;
      scriptLoaded.current = true;

      // Remove any existing script first
      const existingScript = document.getElementById("google-translate-script");
      if (existingScript) {
        existingScript.remove();
      }

      // Clear the translate element
      const translateElement = document.getElementById(
        "google_translate_element"
      );
      if (translateElement) {
        translateElement.innerHTML = "";
      }

      // Create and append new script
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js";
      script.async = true;

      // Handle script load success
      script.onload = () => {
        window.googleTranslateElementInit = initializeTranslate;
        initializeTranslate();
      };

      // Handle script load error
      script.onerror = (error) => {
        console.error("Error loading Google Translate script:", error);
        scriptLoaded.current = false;
      };

      document.body.appendChild(script);
    };

    loadScript();

    // Cleanup function
    return () => {
      // Remove script and reset state
      const script = document.getElementById("google-translate-script");
      if (script) {
        script.remove();
      }

      // Clear the translate element
      const translateElement = document.getElementById(
        "google_translate_element"
      );
      if (translateElement) {
        translateElement.innerHTML = "";
      }

      scriptLoaded.current = false;
      setIsScriptReady(false);
      (window as any).googleTranslateElementInit = undefined;
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element">
        {!isScriptReady && <span>Loading translator...</span>}
      </div>
    </div>
  );
};

export default GoogleTranslate;

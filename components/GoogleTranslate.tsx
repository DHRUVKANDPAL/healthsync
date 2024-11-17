import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    const scriptId = "google-translate-script";

    const loadGoogleTranslateScript = () => {
      if (document.getElementById(scriptId)) {
        console.log("Google Translate script already exists.");
        return; // Script is already loaded
      }

      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate after the script loads
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    };

    loadGoogleTranslateScript();

    // Cleanup: No need to remove the script; leave it cached for next use
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;

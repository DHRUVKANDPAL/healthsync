import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;  // Prevent multiple script loads

    // Mark the script as loaded
    scriptLoaded.current = true;

    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) {
      console.log('Script already loaded');
      return; // Script already loaded, no need to add it again
    }

    // Generate a unique URL to avoid caching
    const scriptUrl = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit&nocache=${new Date().getTime()}`;

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = scriptUrl;
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate when the script is loaded
    window.googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    // Cleanup script when the component unmounts (if needed)
    return () => {
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement) {
        scriptElement.remove();  // Remove the script from the DOM when the component unmounts
      }
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;

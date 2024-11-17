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

    scriptLoaded.current = true;

    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) {
      console.log('Script already loaded');
      return;  // Prevent appending the script if it's already in the DOM
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate when the script is loaded
    window.googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    // Cleanup if component is unmounted
    return () => {
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement) {
        scriptElement.remove();  // Ensure script is removed when the component unmounts
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

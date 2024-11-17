import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || sessionStorage.getItem('google-translate-loaded')) return;

    // Mark the script as loaded in sessionStorage to prevent reloading it across page refreshes
    sessionStorage.setItem('google-translate-loaded', 'true');
    
    const existingScript = document.getElementById('google-translate-script');
    if (existingScript) {
      console.log('Script already loaded');
      return;
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

    // Cleanup script only if necessary
    return () => {
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement) {
        // Only remove the script if it's not the last one in session
        scriptElement.remove();
        sessionStorage.removeItem('google-translate-loaded');
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

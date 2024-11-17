import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Check if the script is already loaded
    if (document.getElementById('google-translate-script')) return;

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
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;

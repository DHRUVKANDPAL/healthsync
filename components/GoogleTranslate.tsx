import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Function to reset Google Translate cache and clear any related state
    const resetGoogleTranslateCache = async () => {
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear the contents (if any)
      }

      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript); // Remove script
      }

      if (window.google && window.google.translate) {
        window.google.translate = null; // Clear google.translate state
      }

      if (window.location.search.includes('hl=')) {
        const newUrl = window.location.href.replace(/([&?])hl=[a-z]{2}/, ''); // Remove hl param
        window.history.replaceState(null, '', newUrl); // Replace URL without hl
      }

      // Explicitly remove Google Translate related cookies
      document.cookie.split(';').forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim();
        if (cookieName.includes('googtrans')) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
      });

      window.localStorage.clear();
      window.sessionStorage.clear();

      // Add a small delay to ensure cleanup completes before script reload
      await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms delay
    };

    // Load the Google Translate script
    const loadGoogleTranslateScript = async () => {
      const scriptId = 'google-translate-script';

      if (document.getElementById(scriptId)) return; // Avoid reloading the script

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      window.googleTranslateElementInit = initializeGoogleTranslate; // Ensure the callback is set

      document.body.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Google Translate script.'));
      });
    };

    // Function to initialize Google Translate
    const initializeGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en', // Set the default page language
            autoDisplay: false, // Prevent auto-translation on page load
          },
          'google_translate_element'
        );
      } else {
        console.error('Google Translate API not available or loaded.');
      }
    };

    // Step 1: Reset state before script loading
    resetGoogleTranslateCache().then(() => {
      // Step 2: Load script and initialize Google Translate
      loadGoogleTranslateScript();
    });

    // Clean up the script when the component unmounts
    return () => {
      const scriptElement = document.getElementById('google-translate-script');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;

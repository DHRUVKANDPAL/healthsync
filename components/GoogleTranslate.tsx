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
    const resetGoogleTranslateCache = () => {
      // Step 1: Remove the google_translate_element div if it exists
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear the contents (if any)
      }

      // Step 2: Remove any previously loaded Google Translate scripts
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript); // Remove script
      }

      // Step 3: Reset any Google Translate internal state in the window object
      if (window.google && window.google.translate) {
        window.google.translate = null; // Clear google.translate state
      }

      // Step 4: Remove the hl query parameter from the URL (to avoid cached translated state)
      if (window.location.search.includes('hl=')) {
        const newUrl = window.location.href.replace(/([&?])hl=[a-z]{2}/, ''); // Remove hl param
        window.history.replaceState(null, '', newUrl); // Replace URL without hl
      }

      // Step 5: Remove Google Translate related cookies
      document.cookie.split(';').forEach((cookie) => {
        const cookieName = cookie.split('=')[0].trim();
        if (cookieName.includes('googtrans')) {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
      });

      // Step 6: Clear localStorage and sessionStorage (if used by Google Translate)
      window.localStorage.clear();
      window.sessionStorage.clear();
    };

    // Step 7: Reset Google Translate cache and state before loading the script
    resetGoogleTranslateCache();

    // Function to load the Google Translate script
    const loadGoogleTranslateScript = async () => {
      const scriptId = 'google-translate-script';

      // Step 8: Create and load the script asynchronously
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      // Append the script to the body
      document.body.appendChild(script);

      // Wait for the script to load
      await new Promise((resolve, reject) => {
        script.onload = () => {
          console.log('Google Translate script loaded successfully.');
          resolve(true);
        };
        script.onerror = () => {
          console.error('Failed to load Google Translate script.');
          reject(new Error('Google Translate script failed to load.'));
        };
      });

      // Define the googleTranslateElementInit after the script is loaded
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en', // Set the default page language
              autoDisplay: false, // Prevent auto-translation on page load
            },
            'google_translate_element'
          );
        } else {
          console.error('Google Translate API not loaded.');
        }
      };
    };

    // Step 9: Load the Google Translate script
    loadGoogleTranslateScript();

    // Cleanup: remove the script when the component is unmounted
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

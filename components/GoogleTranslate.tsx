import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Function to reset Google Translate's cache and state before loading the script
    const resetGoogleTranslateCache = () => {
      // Remove the google_translate_element div if it exists
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = ''; // Clear any previous widget instance
      }

      // Remove any Google Translate scripts already loaded
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) {
        existingScript.parentNode?.removeChild(existingScript); // Remove the existing script
      }

      // Optionally, reset the Google Translate state in the window object (if needed)
      if (window.google && window.google.translate) {
        window.google.translate = null; // Clear the google.translate object
      }
    };

    // Reset Google Translate cache and state before script load
    resetGoogleTranslateCache();

    // Function to load the Google Translate script
    const loadGoogleTranslateScript = async () => {
      const scriptId = 'google-translate-script';

      // Create and load the script asynchronously
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

    // Call the async function inside useEffect to load the script
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

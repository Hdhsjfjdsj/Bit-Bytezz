import React, { useState, useEffect } from "react";

// Function to load Google Translate script
const loadGoogleTranslate = () => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.head.appendChild(script);
};

// Initialize Google Translate
window.googleTranslateElementInit = () => {
  new window.google.translate.TranslateElement({
    pageLanguage: "en",
    includedLanguages: "kn,hi", // Kannada & Hindi
    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
  }, "google_translate_element");
};

const Translate = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Load the Google Translate script when the component mounts
  useEffect(() => {
    loadGoogleTranslate();

    // Clean up the script when the component unmounts
    return () => {
      const script = document.querySelector('script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]');
      if (script) script.remove();
    };
  }, []);

  // Function to toggle the visibility of the translation menu
  const toggleTranslateMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Function to trigger language translation
  const translatePage = (lang) => {
    let select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div id="translate-container">
      <button onClick={toggleTranslateMenu}>🌐 Translate</button>
      {isMenuVisible && (
        <div id="translate-menu">
          <button onClick={() => translatePage('kn')}>🇮🇳 Kannada</button>
          <button onClick={() => translatePage('hi')}>🇮🇳 Hindi</button>
        </div>
      )}
    </div>
  );
};

export default Translate;
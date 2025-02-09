import React, { useState, useRef } from "react";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("Start speaking to get feedback.");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Listening...");
      setIsListening(true);
      setFeedback("Listening... Start speaking.");
    };

    recognition.onresult = (event) => {
      let speechToText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setTranscript(speechToText);
      analyzeSpeech(speechToText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setFeedback(`Error: ${event.error}`);
    };

    recognition.onend = () => {
      console.log("Stopped listening.");
      setIsListening(false);
      setFeedback("Click Start to resume.");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log("Stopped listening.");
      setFeedback("Speech recognition stopped.");
    }
  };

  const analyzeSpeech = (text) => {
    const fillerWords = ["uh", "um", "like", "you know", "so", "basically"];
    const containsFiller = fillerWords.some((word) => text.includes(word));
    const wordCount = text.split(" ").length;

    if (containsFiller) {
      setFeedback("Try to avoid filler words like 'uh', 'um', or 'like'.");
    } else if (wordCount < 5) {
      setFeedback("Keep going! Try to give a more complete response.");
    } else if (wordCount > 30) {
      setFeedback("Great answer! Be concise to stay impactful.");
    } else {
      setFeedback("Good job! You're speaking clearly and confidently.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#333" }}>🎙️ AI Interview Speech Coach</h1>

      <div style={{ marginBottom: "20px" }}>
        {!isListening ? (
          <button
            onClick={startSpeechRecognition}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            🎤 Start Speaking
          </button>
        ) : (
          <button
            onClick={stopSpeechRecognition}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ⏹ Stop Speaking
          </button>
        )}
      </div>

      {/* Live Speech Transcript */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          textAlign: "left",
          width: "60%",
          margin: "auto",
        }}
      >
        <h2>Your Response:</h2>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333", minHeight: "50px" }}>
          {transcript || "Start speaking to see your text here..."}
        </p>
      </div>

      {/* AI Feedback */}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#ffeb3b",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          width: "60%",
          margin: "auto",
        }}
      >
        <h2>AI Feedback:</h2>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333", minHeight: "50px" }}>
          {feedback}
        </p>
      </div>
    </div>
  );
};

export default SpeechToText;

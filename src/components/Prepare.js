import React, { useState } from "react";
import AIInterviewPostureCoach from "./BodyLanguageChecker";
import SpeechToText from "./SpeechToText";
import MCQQuiz from "./ai_quiz"; // Importing the MCQ quiz component

const Prepare = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false); // State for MCQ quiz

  return (
    <div style={{ backgroundColor: "#F4F4F9", padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ backgroundColor: "#003366", padding: "10px 20px", color: "white" }}>
        <h2>Prepare for Interview</h2>
      </nav>

      {/* AI Interview Checker Box */}
      {!isStarted && !isQuizStarted && (
        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
          }}
        >
          <h2 style={{ color: "#003366", marginBottom: "20px" }}>Real-Time AI Interview Checker</h2>
          <p style={{ color: "#003366", fontSize: "16px", marginBottom: "20px" }}>
            Test your speaking skills and body language here
          </p>
          <button
            onClick={() => setIsStarted(true)}
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              backgroundColor: "#E63946",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Start
          </button>
        </div>
      )}

      {/* MCQ Mock Interview Section */}
      {!isStarted && !isQuizStarted && (
        <div
          style={{
            marginTop: "30px",
            padding: "30px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
          }}
        >
          <h2 style={{ color: "#003366", marginBottom: "10px" }}>MCQ Mock Interview</h2>
          <p style={{ color: "#003366", fontSize: "16px", marginBottom: "20px" }}>
            Test your knowledge with real interview-style questions.
          </p>
          <button
            onClick={() => setIsQuizStarted(true)} // Starts the MCQ Quiz
            style={{
              padding: "12px 25px",
              fontSize: "18px",
              backgroundColor: "#FFA500",
              color: "#003366",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Start MCQ Test
          </button>
        </div>
      )}

      {/* Real-time Interview Analysis */}
      {isStarted && (
        <div style={{ marginTop: "50px" }}>
          <AIInterviewPostureCoach />
          <SpeechToText />
        </div>
      )}

      {/* MCQ Quiz Section */}
      {isQuizStarted && (
        <div style={{ marginTop: "50px" }}>
          <MCQQuiz />
        </div>
      )}

      {/* Footer */}
      <footer style={{ backgroundColor: "#003366", color: "white", padding: "20px 0", marginTop: "50px" }}>
        <p>&copy; 2025 Prepare for Interview. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Prepare;

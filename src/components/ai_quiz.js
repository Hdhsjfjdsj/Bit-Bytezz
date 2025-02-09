import React, { useState, useEffect } from "react";

const AI_QUESTIONS = [
  {
    question: "What does AI stand for?",
    options: ["Artificial Intelligence", "Automated Input", "Applied Integration", "Advanced Interactions"],
    answer: "Artificial Intelligence",
  },
  {
    question: "Who is considered the father of AI?",
    options: ["Alan Turing", "Elon Musk", "Bill Gates", "Stephen Hawking"],
    answer: "Alan Turing",
  },
  {
    question: "Which AI model is best for natural language processing?",
    options: ["GPT-4", "VGG-16", "ResNet-50", "LeNet"],
    answer: "GPT-4",
  },
];

const fetchRandomQuestions = async () => {
  try {
    const response = await fetch("https://the-trivia-api.com/api/questions?categories=artificial_intelligence&limit=5");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error("No questions found");
    }

    return data.results.map((item) => ({
      question: item.question,
      options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
      answer: item.correct_answer,
    }));

  } catch (error) {
    console.error("Error fetching questions:", error);
    return AI_QUESTIONS; // Use fallback AI questions
  }
};

const MCQQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchRandomQuestions();
      setQuestions(data);
    } catch (err) {
      setError("Failed to load questions. Please try again later.");
    }

    setLoading(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  if (loading) {
    return <p>Loading Questions...</p>;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={loadQuestions} style={{ padding: "10px 20px", backgroundColor: "#003366", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Retry
        </button>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>AI MCQ Quiz</h1>
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <h2 style={{ color: "#003366" }}>{questions[currentQuestion].question}</h2>
        <div style={{ margin: "20px 0" }}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: selectedOption === option ? "#E63946" : "#FFA500",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedOption}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MCQQuiz;

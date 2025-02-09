import React, { useState } from "react";
import "./CareerAssessment.css";

export default function CareerAssessment() {
  const [responses, setResponses] = useState({});
  const [result, setResult] = useState("");

  // Enhanced questions array with 10 questions
  const questions = [
    {
      id: "q1",
      text: "Which activities do you enjoy the most?",
      options: [
        "Problem solving and coding",
        "Design and creativity",
        "Data analysis",
        "Team coordination"
      ]
    },
    {
      id: "q2",
      text: "What's your ideal work environment?",
      options: [
        "Startup culture",
        "Corporate office",
        "Remote work",
        "Creative studio"
      ]
    },
    {
      id: "q3",
      text: "What skills do you excel at?",
      options: [
        "Technical skills",
        "Creative skills",
        "Communication skills",
        "Analytical skills"
      ]
    },
    {
      id: "q4",
      text: "What matters most to you in a career?",
      options: [
        "Innovation",
        "Work-life balance",
        "Social impact",
        "Professional growth"
      ]
    },
    {
      id: "q5",
      text: "Which tools do you prefer working with?",
      options: [
        "Programming languages",
        "Design software",
        "Spreadsheets & dashboards",
        "Presentation tools"
      ]
    },
    {
      id: "q6",
      text: "How do you handle challenges?",
      options: [
        "Solve logically and break down the problem",
        "Think creatively and find a unique approach",
        "Analyze data and find patterns",
        "Organize a team and assign tasks"
      ]
    },
    {
      id: "q7",
      text: "What kind of projects excite you the most?",
      options: [
        "Building apps or websites",
        "Creating visually appealing designs",
        "Researching and drawing insights from data",
        "Managing and leading a team"
      ]
    },
    {
      id: "q8",
      text: "Which of these industries fascinates you?",
      options: [
        "Tech and Software Development",
        "Media and Design",
        "Finance and Analytics",
        "Business and Management"
      ]
    },
    {
      id: "q9",
      text: "What is your preferred role in a team?",
      options: [
        "Leader – I like to guide and make decisions",
        "Innovator – I prefer generating new ideas",
        "Collaborator – I enjoy working closely with others",
        "Supporter – I help ensure everyone succeeds"
      ]
    },
    {
      id: "q10",
      text: "How do you approach learning new skills?",
      options: [
        "Self-study and online courses",
        "Hands-on workshops or seminars",
        "Learning through mentorship",
        "Collaborative group projects"
      ]
    }
  ];

  // Handle option selection
  const handleChange = (questionId, option) => {
    setResponses((prev) => ({ ...prev, [questionId]: option }));
  };

  // Enhanced result generation with detailed recommendations
  const handleSubmit = () => {
    // Check if all questions are answered
    const answeredAll = questions.every((q) => responses[q.id]);
    if (!answeredAll) {
      setResult("Please answer all questions!");
      return;
    }

    // Career matching logic
    let scores = {
      technical: 0,
      creative: 0,
      analytical: 0,
      management: 0
    };

    // Analyze responses and adjust scores
    if (responses.q1 === "Problem solving and coding") scores.technical += 2;
    if (responses.q1 === "Design and creativity") scores.creative += 2;
    if (responses.q1 === "Data analysis") scores.analytical += 2;
    if (responses.q1 === "Team coordination") scores.management += 2;

    if (responses.q2 === "Startup culture") scores.technical += 1;
    if (responses.q2 === "Creative studio") scores.creative += 1;
    if (responses.q2 === "Corporate office") scores.management += 1;
    if (responses.q2 === "Remote work") scores.technical += 1;

    if (responses.q3 === "Technical skills") scores.technical += 2;
    if (responses.q3 === "Creative skills") scores.creative += 2;
    if (responses.q3 === "Analytical skills") scores.analytical += 2;
    if (responses.q3 === "Communication skills") scores.management += 2;

    if (responses.q4 === "Innovation") scores.technical += 1;
    if (responses.q4 === "Work-life balance") scores.management += 1;
    if (responses.q4 === "Social impact") scores.analytical += 1;
    if (responses.q4 === "Professional growth") scores.creative += 1;

    if (responses.q5 === "Programming languages") scores.technical += 2;
    if (responses.q5 === "Design software") scores.creative += 2;
    if (responses.q5 === "Spreadsheets & dashboards") scores.analytical += 2;
    if (responses.q5 === "Presentation tools") scores.management += 2;

    if (responses.q6 === "Solve logically and break down the problem") scores.technical += 2;
    if (responses.q6 === "Think creatively and find a unique approach") scores.creative += 2;
    if (responses.q6 === "Analyze data and find patterns") scores.analytical += 2;
    if (responses.q6 === "Organize a team and assign tasks") scores.management += 2;

    if (responses.q7 === "Building apps or websites") scores.technical += 2;
    if (responses.q7 === "Creating visually appealing designs") scores.creative += 2;
    if (responses.q7 === "Researching and drawing insights from data") scores.analytical += 2;
    if (responses.q7 === "Managing and leading a team") scores.management += 2;

    if (responses.q8 === "Tech and Software Development") scores.technical += 2;
    if (responses.q8 === "Media and Design") scores.creative += 2;
    if (responses.q8 === "Finance and Analytics") scores.analytical += 2;
    if (responses.q8 === "Business and Management") scores.management += 2;

    if (responses.q9.includes("Leader")) scores.management += 2;
    if (responses.q9.includes("Innovator")) scores.creative += 2;
    if (responses.q9.includes("Collaborator")) scores.analytical += 1;
    if (responses.q9.includes("Supporter")) scores.management += 1;

    if (responses.q10 === "Self-study and online courses") scores.technical += 1;
    if (responses.q10 === "Hands-on workshops or seminars") scores.creative += 1;
    if (responses.q10 === "Learning through mentorship") scores.management += 1;
    if (responses.q10 === "Collaborative group projects") scores.analytical += 1;

    // Determine highest scoring category
    const maxScore = Math.max(...Object.values(scores));
    const careerPath = Object.keys(scores).find(
      (key) => scores[key] === maxScore
    );

    // Generate detailed result based on career path
    const careerResults = {
      technical: 
        "You have a strong aptitude for technical challenges and a passion for problem-solving. " +
        "You are well-suited for Software Development, where you can work on innovative projects and cutting-edge technologies. \n\n" +
        "Recommended roles include:\n• Full-stack Developer\n• AI/ML Engineer\n• Cybersecurity Specialist\n• Blockchain Developer\n\n" +
        "Consider deepening your knowledge with advanced courses in programming and emerging technologies.",
      creative:
        "Your creativity shines through in your responses, indicating a natural talent for design and innovation. " +
        "A career in creative industries would allow you to express your ideas visually and conceptually. \n\n" +
        "Recommended roles include:\n• UI/UX Designer\n• Graphic Designer\n• Digital Artist\n• Creative Director\n\n" +
        "You might consider building a portfolio and exploring new design trends to further enhance your skills.",
      analytical:
        "You have a keen eye for data and a logical mindset that makes you excellent at uncovering insights. " +
        "A career in analytics will allow you to transform data into meaningful strategies. \n\n" +
        "Recommended roles include:\n• Data Scientist\n• Business Analyst\n• Financial Analyst\n• AI Researcher\n\n" +
        "Strengthen your abilities by gaining experience with data visualization and statistical tools.",
      management:
        "Your responses reflect strong leadership and organizational skills, indicating a natural fit for management roles. " +
        "You excel in guiding teams and orchestrating projects towards success. \n\n" +
        "Recommended roles include:\n• Product Manager\n• Marketing Strategist\n• HR Manager\n• Business Consultant\n\n" +
        "Consider honing your strategic planning and communication skills to further boost your leadership potential."
    };

    setResult(careerResults[careerPath]);
  };

  // Calculate progress percentage
  const progress = (Object.keys(responses).length / questions.length) * 100;

  return (
    <div className="container">
      <header className="navbar">
        <h1>Career Assessment</h1>
      </header>

      <div className="assessment-form">
        {/* Progress bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <h2>Find Your Ideal Career Path</h2>
        
        {questions.map((q) => (
          <div key={q.id} className="question">
            <p className="question-text">{q.text}</p>
            <div className="options">
              {q.options.map((option) => (
                <label
                  key={option}
                  className={`option-label ${responses[q.id] === option ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={responses[q.id] === option}
                    onChange={() => handleChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="submit-button" onClick={handleSubmit}>
          Get Your Results
        </button>

        {result && (
          <div className="result-box">
            <h3>Your Career Assessment Results</h3>
            <p style={{ whiteSpace: "pre-line" }}>{result}</p>
            <button
              className="reset-button"
              onClick={() => {
                setResponses({});
                setResult("");
              }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

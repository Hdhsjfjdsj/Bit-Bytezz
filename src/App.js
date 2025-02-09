import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import CareerAssessment from "./components/CareerAssessment";
import LoginPage from "./components/LoginPage"; // Import LoginPage
import Roadmap from "./components/Roadmap";
import Chatbot from "./components/Chatbot";
import Mentorship from "./components/Mentorship";
import Scholarship from "./components/Scholarship";
import Internship from "./components/Internship";
import Prepare from "./components/Prepare";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />  {/* Default page is now LoginPage */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/career-assessment" element={<CareerAssessment />} />
        <Route path="/roadmap" element={<Roadmap />}/>
        <Route path="/Chatbot" element={<Chatbot />}/>
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/Scholarship" element={<Scholarship/>}/>
        <Route path="/Internship" element={<Internship/>}/>
        <Route path="/Prepare" element={<Prepare/>}/>
      </Routes>
    </Router>
  );
}

export default App;

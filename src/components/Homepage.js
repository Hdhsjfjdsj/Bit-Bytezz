import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import homepageImage from "./homepage.png";

const Homepage = () => {
    const navigate = useNavigate();

    const sections = [
        { id: "01", title: "CAREER TEST", link: "/career-assessment", description: "Discover your strengths and find the perfect career path with our expert-designed test." },
        { id: "02", title: "CAREER ROADMAPS", link: "/roadmap", description: "Step-by-step guidance to help you navigate your dream career effortlessly." },
        { id: "03", title: "SCHOLARSHIPS", link: "/Scholarship", description: "Explore funding opportunities that match your profile and secure your future." },
        { id: "04", title: "INTERNSHIP & JOB", link: "/Internship", description: "Find the best internships and job openings to kickstart your career journey." },
        { id: "05", title: "MENTORSHIP", link: "/Chatbot", description: "Connect with industry experts for guidance, insights, and career growth." },
        { id: "06", title: "PREPARE", link: "/prepare", description: "Access resources, practice tests, and materials to get career-ready." }
    ];

    return (
        <div>
            <nav className="navbar">
                <h1>CareerPath</h1>
                <select>
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="kn">ಕನ್ನಡ</option>
                </select>
            </nav>
            
            <div className="home-container">
                <div className="home-text">
                    <h1>FROM LEARNING TO EARNING - WE GUIDE THE WAY</h1>
                    <p>Discover career paths, gain skills, and explore top opportunities.<br />
                        Let’s make your dream job a reality.</p>
                </div>
                <div className="home-image">
                    
                    <img src={homepageImage} alt="Rural Student Studying" /> {/* Use the imported variable */}
                </div>
            </div>

            <div className="career-intro">
                <h2>Tailored career for every stage of your journey.</h2>
            </div>

            <div className="career-sections">
                {sections.map((section) => (
                    <div key={section.id} className="section" onClick={() => navigate(section.link)}>
                        <div className="section-content">
                            <h2 className="section-id">{section.id}</h2>
                            <h3 className="section-title">{section.title}</h3>
                        </div>
                        <p className="section-description">{section.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;

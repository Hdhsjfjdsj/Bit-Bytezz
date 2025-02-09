import React, { useState } from "react";
import "./Internship.css";

const internships = [
  {
    title: "Software Engineer Intern",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    link: "https://careers.google.com/internships/",
    eligibility: `
      - Must be pursuing a Computer Science or IT degree.
      - Strong foundation in Java, Python, or C++.
      - Familiarity with algorithms and data structures.
      - Excellent problem-solving skills.
      - Prior experience in software development is a plus.
    `,
    description:
      "Work with software development teams to design, test, and deploy applications. Gain valuable experience and improve coding and problem-solving skills.",
  },
  {
    title: "Mechanical Engineering Intern",
    company: "Tesla",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    link: "https://www.tesla.com/careers/internships",
    eligibility: `
      - Enrolled in a Mechanical, Electrical, or related engineering program.
      - Experience with CAD software (SolidWorks, AutoCAD).
      - Understanding of mechanical systems and material science.
      - Ability to work in a fast-paced environment.
      - Previous internship experience in automotive or manufacturing is a plus.
    `,
    description:
      "Assist in designing mechanical components for electric vehicles. Work involves testing prototypes and solving real-world engineering problems.",
  },
  {
    title: "Cybersecurity Intern",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    link: "https://careers.microsoft.com/us/en/studentsandinterns",
    eligibility: `
      - Strong knowledge of networks, firewalls, and cybersecurity principles.
      - Experience with Python, C++, or Java.
      - Familiarity with security tools (Wireshark, Nmap, Burp Suite).
      - Ability to identify security vulnerabilities.
      - Knowledge of ethical hacking is a plus.
    `,
    description:
      "Assist in cybersecurity tasks like vulnerability scanning and risk assessment to ensure data and system security.",
  },
];

function Internship() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleEligibilityClick = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index); // Toggle eligibility details
  };

  const handleApplyClick = (link) => {
    window.open(link, "_blank");
  };

  return (
    <div className="internship-container">
      <h2>Explore Internships</h2>

      <div className="internship-list">
        {internships.map((item, index) => (
          <div key={index} className="internship-card">
            <div className="internship-info">
              <img
                src={item.logo}
                alt={`${item.company} Logo`}
                className="company-logo"
              />
              <div>
                <p className="job-title">{item.title}</p>
                <p>{item.company}</p>
                <p className="job-description">{item.description}</p>
                {selectedIndex === index && (
                  <p className="eligibility-description">{item.eligibility}</p>
                )}
              </div>
            </div>

            <div className="button-container">
              <button
                className="eligibility-button"
                onClick={() => handleEligibilityClick(index)}
              >
                {selectedIndex === index ? "Hide Eligibility" : "Eligibility"}
              </button>
              <button
                className="cta-button"
                onClick={() => handleApplyClick(item.link)}
              >
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Internship;

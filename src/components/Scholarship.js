import React, { useState, useMemo } from "react";
import "./Scholarship.css";

function Scholarship() {
  // Memoizing scholarships to prevent re-creation on every render
  const scholarships = useMemo(() => [
    { 
      name: "National Level Science Talent Search Exam (NSTSE)", 
      eligibility: "Class 2 to 12",
      benefit: "Rs 2,00,000 cash prize, Laptop + Medal",
      deadline: "November 3, 2024",
      category: "science",
      link: "https://www.unifiedcouncil.com/about-nstse.html"
    },
    { 
      name: "PM YASASVI Entrance Test (PMYET)", 
      eligibility: "Class 9 to 12",
      benefit: "Scholarships Rs 75,000 - Rs 1,25,000",
      deadline: "TBA",
      category: "general",
      link: "https://yet.nta.ac.in/"
    },
    { 
      name: "IOEL (International Olympiad of English Language)", 
      eligibility: "Class 1 to 12",
      benefit: "Cash prize Rs 1,00,000",
      deadline: "TBA",
      category: "language",
      link: "https://www.silverzone.org/IOEL"
    },
    { 
      name: "AICTE Pragati Scholarship for Girls", 
      eligibility: "Female candidates in 1st-year courses from AICTE-approved colleges",
      benefit: "Rs. 30,000/- reimbursement for books, laptops, etc.",
      deadline: "Till November",
      category: "girls",
      link: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati-Scholarship"
    },
    { 
      name: "Foundation for Excellence (FEE) Scholarship", 
      eligibility: "BE./B.Tech, Integrated 5-Year Dual Degree students with 70% marks in 12th",
      benefit: "Covers full course fees",
      deadline: "July to December",
      category: "engineering",
      link: "https://www.ffe.org/"
    },
    { 
      name: "North South Foundation (NSF) Scholarship", 
      eligibility: "For students from economically weaker sections pursuing engineering.",
      benefit: "Up to INR 30,000 per year.",
      deadline: "Varies; check the official site.",
      category: "engineering",
      link: "https://www.northsouth.org/public/IndiaScholarships.aspx"
    },
    { 
      name: "IDFC FIRST Bank Engineering Scholarship", 
      eligibility: "Students with a family income of less than INR 6 lakhs per annum.",
      benefit: "Up to INR 1 lakh per year.",
      deadline: "Check the official site for updates.",
      category: "engineering",
      link: "https://www.idfcfirstbank.com/csr/scholarship"
    },
    { 
      name: "Prime Minister Scholarship Scheme (PMSS)", 
      eligibility: "For the wards of ex-servicemen and serving personnel.",
      benefit: "INR 2,000 per month for engineering students.",
      deadline: "Typically in September; verify for 2025.",
      category: "engineering",
      link: "https://www.desw.gov.in/scholarship"
    }
  ], []);

  const [searchQuery, setSearchQuery] = useState("");

  // Optimized filtering with useMemo
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) =>
      Object.values(scholarship).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, scholarships]);

  return (
    <div className="scholarship-container">
      <header className="navbar">Scholarship Finder</header>

      <main className="content">
        <h1>Find Scholarships</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Scholarships (e.g., engineering, science, girls)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Scholarships"
          />
        </div>

        {/* Scholarship List */}
        <section className="scholarship-list">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((scholarship, index) => (
              <article key={index} className="scholarship-card">
                <h3>{scholarship.name}</h3>
                <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                <p><strong>Benefit:</strong> {scholarship.benefit}</p>
                <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                <a 
                  href={scholarship.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Apply for ${scholarship.name}`}
                >
                  <button className="apply-button">Apply</button>
                </a>
              </article>
            ))
          ) : (
            <p className="no-results">No scholarships found.</p>
          )}
        </section>
      </main>

      <footer className="footer">© 2025 Scholarship Finder</footer>
    </div>
  );
}

export default Scholarship;

import React, { useState } from "react";

const mentors = [
  { name: "Dr. John Doe", expertise: "AI & Machine Learning", experience: "10+ years" },
  { name: "Jane Smith", expertise: "Software Development", experience: "8+ years" },
  { name: "Dr Mike Israetel", expertise: "Product Management", experience: "5+ years" },
  { name: "Sarah Lee", expertise: "Cybersecurity", experience: "7+ years" },
];

function Mentorship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: ""
  });
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleModalChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your application for mentorship with ${selectedMentor.name} has been submitted.`);
    closeModal();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${contactFormData.name}! We will get back to you soon.`);
    setContactFormData({ name: "", email: "", message: "" });
  };

  const openModal = (mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMentor(null);
    setFormData({ name: "", email: "", phone: "", experience: "", message: "" });
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <h1>Career Mentorship</h1>
      </nav>

      <section style={styles.section}>
        <h2 style={styles.heading}>Meet Our Mentors</h2>
        <div style={styles.mentorList}>
          {mentors.map((mentor, index) => (
            <div key={index} style={styles.mentorCard}>
              <h3>{mentor.name}</h3>
              <p><strong>Expertise:</strong> {mentor.expertise}</p>
              <p><strong>Experience:</strong> {mentor.experience}</p>
              <button style={styles.ctaButton} onClick={() => openModal(mentor)}>
                Apply for Mentorship
              </button>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h2 style={styles.heading}>Apply for Mentorship</h2>
              <p>Mentor: <strong>{selectedMentor.name}</strong></p>
              <form onSubmit={handleModalSubmit} style={styles.form}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Your Experience (e.g., 2 years in AI)"
                  value={formData.experience}
                  onChange={handleModalChange}
                  required
                  style={styles.input}
                />
                <textarea
                  name="message"
                  placeholder="Why do you want this mentorship?"
                  value={formData.message}
                  onChange={handleModalChange}
                  required
                  style={styles.textarea}
                />
                <button type="submit" style={styles.ctaButton}>
                  Submit Application
                </button>
                <button onClick={closeModal} style={styles.cancelButton}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <button style={styles.chatbotButton} onClick={() => alert("Chatbot feature coming soon!")}>Chat with our Bot</button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Contact a Mentor</h2>
        <form onSubmit={handleContactSubmit} style={styles.contactForm}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactFormData.name}
            onChange={handleContactChange}
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactFormData.email}
            onChange={handleContactChange}
            required
            style={styles.input}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={contactFormData.message}
            onChange={handleContactChange}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      </section>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Career Mentorship. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#002855",
    color: "white",
    padding: "1em",
    textAlign: "center",
    fontSize: "1.5em",
  },
  section: { 
    padding: "2em", 
    textAlign: "center" 
  },
  heading: { 
    color: "#003366" 
  },
  mentorList: { 
    display: "flex", 
    flexWrap: "wrap", 
    justifyContent: "center" 
  },
  mentorCard: {
    backgroundColor: "#f8f8f8",
    padding: "1.5em",
    margin: "1em",
    width: "250px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)"
  },
  ctaButton: {
    backgroundColor: "#E63946",
    color: "white",
    padding: "0.8em",
    border: "none",
    borderRadius: "5px",
    marginTop: "1em",
    cursor: "pointer"
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    padding: "0.8em",
    border: "none",
    borderRadius: "5px",
    marginTop: "1em",
    cursor: "pointer",
    marginLeft: "10px"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "white",
    padding: "2em",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  contactForm: {
    maxWidth: "400px",
    margin: "0 auto"
  },
  input: {
    width: "100%",
    padding: "1em",
    marginBottom: "1em",
    border: "1px solid #ddd",
    borderRadius: "4px"
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "1em",
    border: "1px solid #ddd",
    borderRadius: "4px"
  },
  submitButton: {
    backgroundColor: "#E63946",
    color: "white",
    padding: "1em",
    border: "none",
    width: "100%",
    cursor: "pointer"
  },
  footer: {
    backgroundColor: "#002855",
    color: "white",
    textAlign: "center",
    padding: "1em",
    marginTop: "2em",
  },
};

export default Mentorship;
import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Contact a Mentor</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </section>
  );
}

const styles = {
  section: { padding: "2em", textAlign: "center" },
  heading: { color: "#003366" },
  form: { maxWidth: "400px", margin: "0 auto" },
  input: { width: "100%", padding: "1em", marginBottom: "1em", border: "1px solid #ddd", borderRadius: "4px" },
  textarea: { width: "100%", height: "100px", padding: "1em", border: "1px solid #ddd", borderRadius: "4px" },
  submitButton: { backgroundColor: "#E63946", color: "white", padding: "1em", border: "none", width: "100%", cursor: "pointer" },
};

export default ContactForm;

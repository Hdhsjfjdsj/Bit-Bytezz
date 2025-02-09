import React from "react";

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Career Mentorship. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#002855",
    color: "white",
    textAlign: "center",
    padding: "1em",
    marginTop: "2em",
  },
};

export default Footer;

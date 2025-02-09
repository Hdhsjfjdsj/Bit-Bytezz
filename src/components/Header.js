import React from "react";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1>Career Mentorship</h1>
    </nav>
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
};

export default Navbar;

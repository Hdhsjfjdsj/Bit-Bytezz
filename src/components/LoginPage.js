import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import styles for LoginPage

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error message state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error messages

    if (isSignup) {
      // Signup Logic
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some((user) => user.username === username || user.email === email);

      if (userExists) {
        setError("Username or Email already taken!");
        return;
      }

      const newUser = { username, email, password };
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
      alert("Signup successful! Please log in.");
      setIsSignup(false); // Switch to login mode after signup
    } else {
      // Login Logic
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find((user) => user.username === username || user.email === username);

      if (!user || user.password !== password) {
        setError("Invalid Username/Email or Password!");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      alert("Login successful!");
      navigate("/home"); // Redirect to Homepage
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error messages */}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="input-group">
              <label>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>{isSignup ? "Email" : "Username or Email"}</label>
            <input
              type={isSignup ? "email" : "text"}
              value={isSignup ? email : username}
              onChange={(e) => (isSignup ? setEmail(e.target.value) : setUsername(e.target.value))}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

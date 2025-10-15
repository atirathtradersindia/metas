import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("✅ Signed in successfully!");
      navigate("/products-all"); // redirect to products page after login
    } catch (error) {
      console.error("Signin error:", error);
      
      if (error.code === "auth/user-not-found") {
        setErrorMessage("No account found with this email. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else if (error.code === "auth/too-many-requests") {
        setErrorMessage("Too many failed attempts. Please try again later.");
      } else {
        setErrorMessage("Error signing in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/icon.png" alt="Logo" className="auth-logo" />
      <h2>Sign In</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        {/* Forgot Password link, aligned right */}
        <div className="auth-links forgot-password">
          <p>
            <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
          </p>
        </div>
        
        {/* Error message display */}
        {errorMessage && (
          <div className="error-message">
            ⚠️ {errorMessage}
          </div>
        )}
        
        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        
        {/* Sign up and Home links */}
        <div className="auth-links">
          <p>
            Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
          </p>
          <p>
            Go back to <Link to="/" className="auth-link">Home</Link>
          </p>
        </div>
      </form>

      <style jsx>{`
        .auth-container {
          max-width: 400px;
          margin: 2rem auto;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          border: 1px solid gold;
          text-align: center;
          color: white;
        }

        .auth-logo {
          width: 60px;
          height: 50px;
          margin-bottom: 1rem;
        }

        h2 {
          color: gold;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          text-align: left;
        }

        .form-input {
          width: 100%;
          padding: 12px;
          border: 1px solid gold;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
        }

        .form-input::placeholder {
          color: #ccc;
        }

        .form-input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }

        .auth-button {
          padding: 12px;
          background: gold;
          color: black;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .auth-button:hover:not(:disabled) {
          background: #ffd700;
        }

        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .error-message {
          background: rgba(255, 0, 0, 0.1);
          color: #ff6b6b;
          padding: 10px;
          border-radius: 6px;
          border: 1px solid #ff6b6b;
          font-size: 14px;
        }

        .auth-links {
          margin-top: 0.5rem;
          text-align: center;
        }

        .auth-links.forgot-password {
          text-align: right;
        }

        .auth-links p {
          margin: 0.5rem 0;
          color: #ccc;
        }

        .auth-link {
          color: gold;
          text-decoration: none;
        }

        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
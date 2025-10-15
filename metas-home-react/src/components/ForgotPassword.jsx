import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset email sent! Redirecting to login...");

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate("/login", { state: { resetSent: true } });
      }, 3000);
    } catch (err) {
      console.error(err);

      if (err.code === "auth/user-not-found") {
        setError(
          "❌ No account found with this email. Please check your spelling or register a new account."
        );
      } else if (err.code === "auth/invalid-email") {
        setError("❌ Invalid email address format.");
      } else {
        setError("❌ Failed to send reset email. Please try again.");
      }
    }
  };

  return (
    <div className="mobile-login-container">
      <div className="login-form-box">
        {/* Logo */}
        <img src={logo} alt="Logo" className="login-logo tw-mx-auto" />

        <h1 className="login-title">Forgot Password</h1>
        <p className="tw-text-gray-300 tw-mb-4 tw-text-center">
          Enter your registered email to receive a reset link
        </p>

        <form className="login-form" onSubmit={handleReset}>
          {/* Email Input */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="tw-w-full tw-px-4 tw-py-2 tw-rounded-lg tw-text-black tw-bg-white tw-border tw-border-gray-300 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-500"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="login-btn">
            Send Reset Link
          </button>
        </form>

        {/* Success & Error Messages */}
        {message && (
          <p className="tw-text-green-400 tw-mt-4 tw-text-center">{message}</p>
        )}
        {error && (
          <p className="tw-text-red-400 tw-mt-4 tw-text-center">{error}</p>
        )}

        {/* Back to Login */}
        <p className="tw-mt-6 tw-text-center tw-text-gray-300">
          Remembered your password?{" "}
          <Link to="/login" className="register-link-text">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
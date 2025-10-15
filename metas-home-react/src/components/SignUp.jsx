import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    countryCode: "+91", // Default country code
    phone: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak"); // weak, medium, strong
  const navigate = useNavigate();

  const countryOptions = [
    { code: "+91", label: "🇮🇳 +91 (India)", length: 10 },
    { code: "+1", label: "🇺🇸 +1 (USA)", length: 10 },
    { code: "+44", label: "🇬🇧 +44 (UK)", length: 10 },
    { code: "+971", label: "🇦🇪 +971 (UAE)", length: 9 },
    { code: "+61", label: "🇦🇺 +61 (Australia)", length: 9 },
    { code: "+98", label: "🇮🇷 +98 (Iran)", length: 10 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errorMessage) setErrorMessage("");

    // Check password strength if password field
    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }

    // Validate phone number if phone field
    if (name === "phone") {
      validatePhoneNumber(value, formData.countryCode);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    setFormData({ ...formData, countryCode: selectedCode, phone: "" }); // Reset phone on country change
    validatePhoneNumber("", selectedCode); // Validate with empty phone
  };

  const validatePhoneNumber = (number, code) => {
    const selectedCountry = countryOptions.find(opt => opt.code === code);
    const expectedLength = selectedCountry?.length || 10;
    
    if (number && number.length > expectedLength) {
      setErrorMessage(`Phone number must not exceed ${expectedLength} digits for ${selectedCountry.label}`);
      return false;
    }
    
    if (number && !/^\d+$/.test(number)) {
      setErrorMessage(`Phone number must contain only digits for ${selectedCountry.label}`);
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength >= 4) return "strong";
    if (strength >= 3) return "medium";
    return "weak";
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "strong": return "green";
      case "medium": return "orange";
      default: return "red";
    }
  };

  const isPasswordStrong = () => passwordStrength === "strong";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isPasswordStrong()) {
      setErrorMessage("Password must be strong (8+ characters, uppercase, lowercase, number, special character).");
      return;
    }

    // Validate phone number before submission
    const isPhoneValid = validatePhoneNumber(formData.phone, formData.countryCode);
    if (!isPhoneValid) return;

    setIsLoading(true);
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Set displayName in Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Save user info in Realtime Database
      await set(ref(db, "users/" + userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone ? `${formData.countryCode} ${formData.phone}` : "Not provided",
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid
      });

      alert("✅ Account created successfully!");
      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error);
      
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("This email is already registered. Please go to login page.");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password should be at least 6 characters.");
      } else if (error.code === "auth/invalid-email") {
        setErrorMessage("Please enter a valid email address.");
      } else {
        setErrorMessage("Error creating account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <img src="/icon.png" alt="Logo" className="auth-logo" />
      <h2>Create Account</h2>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

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
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleCountryChange}
            className="form-input"
            style={{ padding: "12px", appearance: "none" }}
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            name="phone"
            placeholder={`Phone Number (${countryOptions.find(opt => opt.code === formData.countryCode)?.length || 10} digits)`}
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            style={{ marginTop: "0.5rem" }}
            maxLength={countryOptions.find(opt => opt.code === formData.countryCode)?.length || 10}
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password (8+ chars, uppercase, lowercase, number, special char)"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
          <div className={`password-strength ${getPasswordStrengthColor()}`}>
            Password Strength: {passwordStrength.toUpperCase()}
          </div>
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
          disabled={isLoading || !isPasswordStrong()}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
        
        {/* Login and Home links */}
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/signin" className="auth-link">Login here</Link>
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
          margin-top: 1rem;
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

        .password-strength {
          margin-top: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
        }

        .password-strength.green {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
          border: 1px solid #22c55e;
        }

        .password-strength.orange {
          background: rgba(251, 146, 60, 0.2);
          color: #fb923c;
          border: 1px solid #fb923c;
        }

        .password-strength.red {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border: 1px solid #ef4444;
        }
      `}</style>
    </div>
  );
}
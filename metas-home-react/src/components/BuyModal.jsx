import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { riceData } from '../data/products';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { submitQuote } from '../firebasequote';

const BuyModal = ({ isOpen, onClose, product, products, onSubmitted }) => {
  const { t } = useLanguage();
  const [grade, setGrade] = useState('');
  const [packing, setPacking] = useState('');
  const [quantity, setQuantity] = useState('');
  const [port, setPort] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [grades, setGrades] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [user, setUser] = useState(null);

  const countryOptions = [
    { value: '+91', flag: '🇮🇳', name: 'India', length: 10 },
    { value: '+1', flag: '🇺🇸', name: 'USA', length: 10 },
    { value: '+44', flag: '🇬🇧', name: 'UK', length: 10 },
    { value: '+971', flag: '🇦🇪', name: 'UAE', length: 9 },
    { value: '+61', flag: '🇦🇺', name: 'Australia', length: 9 },
    { value: '+98', flag: '🇮🇷', name: 'Iran', length: 10 }
  ];

  // Get user data from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "Not provided",
          email: firebaseUser.email || "Not provided",
          phone: firebaseUser.phoneNumber || "Not provided"
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auto-fill user details
  useEffect(() => {
    if (user && isOpen) {
      if (user.name && user.name !== "Not provided") setFullName(user.name);
      if (user.email && user.email !== "Not provided") setEmail(user.email);

      if (user.phone && user.phone !== "Not provided") {
        const phone = user.phone.toString();
        const foundCountry = countryOptions.find(opt => phone.startsWith(opt.value));
        if (foundCountry) {
          setCountryCode(foundCountry.value);
          setPhoneNumber(phone.replace(foundCountry.value, '').trim());
        } else {
          setPhoneNumber(phone);
        }
      }
    }
  }, [user, isOpen]);

  // Get available grades for selected product
  useEffect(() => {
    if (product) {
      const variety = product.name.en;
      const varietyEntries = riceData.filter(e => e.variety === variety);
      const uniqueGrades = [...new Set(varietyEntries.map(e => e.grade))];
      setGrades(uniqueGrades);
    }
  }, [product]);

  const validatePhoneNumber = (number, code) => {
    const selectedCountry = countryOptions.find(opt => opt.value === code);
    const expectedLength = selectedCountry?.length || 10;
    if (!number) {
      setPhoneError('Phone number is required');
      return false;
    } else if (number.length !== expectedLength) {
      setPhoneError(`Phone number must be ${expectedLength} digits`);
      return false;
    } else if (!/^\d+$/.test(number)) {
      setPhoneError('Phone number must contain only digits');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleCountryChange = (e) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    validatePhoneNumber(phoneNumber, newCode);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    validatePhoneNumber(value, countryCode);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async () => {
    if (!quantity || !packing || !port || !grade || !fullName) {
      alert("Please fill all required fields.");
      return;
    }

    const isPhoneValid = validatePhoneNumber(phoneNumber, countryCode);
    const isEmailValid = validateEmail(email);

    if (!isPhoneValid || !isEmailValid) {
      if (!isPhoneValid) alert("Please enter a valid phone number.");
      if (!isEmailValid) alert("Please enter a valid email address.");
      return;
    }

    const fullPhoneNumber = `${countryCode} ${phoneNumber}`;

    const quoteData = {
      fullName,
      email,
      phone: fullPhoneNumber,
      variety: product.name.en,
      grade,
      packing,
      quantity,
      port,
      additionalInfo: additionalInfo || "",
      timestamp: new Date().toISOString()
    };

    try {
      // Save to Firebase
      await submitQuote(quoteData);
      alert("Your quote has been submitted successfully!");

      // Open WhatsApp
      const message = `Hello! I want a quote for:
- Name: ${fullName}
- Email: ${email}
- Phone: ${fullPhoneNumber}
- Variety: ${product.name.en}
- Grade: ${grade}
- Packing: ${packing}
- Quantity: ${quantity} MT
- Port: ${port}
${additionalInfo ? `- Additional Info: ${additionalInfo}` : ''}`;
      window.open(`https://wa.me/+919703744571?text=${encodeURIComponent(message)}`, '_blank');

      if (onSubmitted) onSubmitted();
      onClose();
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("Failed to submit quote. Please try again later.");
    }
  };

  const getCurrentCountry = () => countryOptions.find(opt => opt.value === countryCode);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="buy-modal-header">
          <h2 className="text-2xl font-bold">{t('buy_query')}</h2>
          {user && <p className="text-sm text-green-400 mt-1">✅ Your profile information has been auto-filled</p>}
        </div>
        <div className="buy-modal-body">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Contact Info */}
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold text-gold-800 mb-4">Contact Information</h3>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input type="text" className="form-input" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input type="email" className="form-input" placeholder="your.email@example.com" value={email} onChange={handleEmailChange} required />
                {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <div className="flex gap-3">
                  <div className="w-1/3">
                    <select value={countryCode} onChange={handleCountryChange} className="form-select h-full">
                      {countryOptions.map(option => <option key={option.value} value={option.value}>{option.flag} {option.value}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input type="tel" placeholder={`Phone number (${getCurrentCountry()?.length || 10} digits)`} value={phoneNumber} onChange={handlePhoneChange} className="form-input" required maxLength={getCurrentCountry()?.length || 10} />
                    {phoneError && <div className="text-red-500 text-sm mt-1">{phoneError}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h3 className="text-lg font-semibold text-gold-800 mb-4">Product Information</h3>
              <div className="form-group">
                <label className="form-label">{t('category')}</label>
                <select id="category" className="form-select" disabled value={product.category}>
                  <option value={product.category}>{product.category}</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('grade')}</label>
                <select id="grade" className="form-select" value={grade} onChange={(e) => setGrade(e.target.value)} required>
                  <option value="">Select Grade</option>
                  {grades.map((g, i) => <option key={i} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('packing')}</label>
                <select id="packing" className="form-select" value={packing} onChange={(e) => setPacking(e.target.value)} required>
                  <option value="">Select Packing</option>
                  <option value="25 Kg Bag">25 Kg Bag</option>
                  <option value="50 Kg Bag">50 Kg Bag</option>
                  <option value="Tones">Tones</option>
                  <option value="Bulk">Bulk</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('quantity_mt')}</label>
                <input type="number" id="quantity" className="form-input" placeholder="e.g. 100" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">{t('port')}</label>
                <select id="port" className="form-select" value={port} onChange={(e) => setPort(e.target.value)} required>
                  <option value="">Select Port</option>
                  <option value="Mundra">Mundra</option>
                  <option value="Kandla">Kandla</option>
                  <option value="Nhava Sheva">Nhava Sheva</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Vizag">Vizag</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">{t('additional_info')}</label>
                <textarea id="additionalInfo" className="form-textarea" placeholder="Any additional requirements or information..." value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)}></textarea>
              </div>
            </div>

            <button type="button" className="form-submit" onClick={handleSubmit}>
              {t('get_quote')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
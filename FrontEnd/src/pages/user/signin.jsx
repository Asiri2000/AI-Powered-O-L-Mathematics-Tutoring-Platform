import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api'; // Make sure this path is correct

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Strip out confirmPassword before sending to backend
        const payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password
        };

        // Call the Backend
        await registerUser(payload);
        
        // Success!
        alert('Account created successfully! Please login.');
        navigate('/auth/login');
      } catch (err) {
        console.error(err);
        // Display backend error (e.g., "Email already in use")
        setErrors({ 
          username: err.detail || err.message || 'Registration failed. Please try again.' 
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 border border-emerald-100">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-emerald-900">Create Account</h1>
          <p className="text-emerald-600 mt-2">Join our student community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.username ? 'border-red-500' : 'border-emerald-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-emerald-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-emerald-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Re-enter Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-emerald-200'
                } focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-emerald-700">
              I agree to the{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500 font-medium">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-600 hover:text-emerald-500 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 transform hover:-translate-y-0.5 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-emerald-700 hover:to-green-700'
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <p className="text-emerald-700">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-emerald-100">
          <p className="text-center text-sm text-emerald-600">
            © 2024 Student Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
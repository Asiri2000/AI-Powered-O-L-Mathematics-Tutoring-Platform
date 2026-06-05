import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api'; // Make sure this path is correct

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', // Change to 'username' if your backend expects a username for login
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Send data to backend
      const response = await loginUser(formData);
      
      // 2. Save auth data to sessionStorage (Matching your Navbar.jsx!)
      // Note: Adjust 'response.token' based on exactly what your backend sends back
      sessionStorage.setItem('accessToken', response.token); 
      sessionStorage.setItem('username', response.user?.username || response.username || 'Student');
      sessionStorage.setItem('user_role', response.user?.role || response.role || 'user');

      // 3. Tell the Navbar to update immediately without refreshing the page
      window.dispatchEvent(new Event("authChange"));
      
      // 4. Send them to the homepage
      navigate('/');
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-emerald-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">Welcome Back</h1>
          <p className="text-emerald-600 mt-2">Sign in to continue learning</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-800 mb-2">
              Email Address
            </label>
            <input
              type="email" // Change to "text" if using username
              name="email" // Change to "username" if using username
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-800 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-emerald-700 hover:to-green-700 transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center mt-6">
            <p className="text-emerald-700">
              Don't have an account?{' '}
              <Link to="/auth/register" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
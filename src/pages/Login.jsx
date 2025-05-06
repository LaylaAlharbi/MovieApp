import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify";
import GoogleIcon from "../assets/GoogleIcon.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const { logIn, signUpProvider, forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      toastSuccessNotify("Logged in successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toastErrorNotify(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpProvider();
      toastSuccessNotify("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(resetEmail);
      toastSuccessNotify("Password reset email sent. Please check your inbox.");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div className="form-container mt-[5vh] w-[380px] h-[580px]">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Reset Password
            </h2>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                placeholder="Enter your email"
                className="peer"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-danger">
              Send Reset Link
            </button>
            <button
              type="button"
              className="btn-danger mt-4"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
              Sign In
            </h2>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                placeholder="Email"
                className="peer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                placeholder="Password"
                className="peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center mt-4 text-sm">
              <span 
                onClick={() => setShowForgotPassword(true)}
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#FF4B45]"
              >
                Forgot Password
              </span>
              <Link
                to="/register"
                className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#FF4B45]"
              >
                Sign Up
              </Link>
            </div>

            <button type="submit" className="btn-danger">
              Login
            </button>
            <button
              className="flex items-center justify-center gap-2 btn-danger mt-4"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon color="currentColor" />
              Continue with Google
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
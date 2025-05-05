import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify";
import GoogleIcon from "../assets/GoogleIcon.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, signUpProvider } = useAuth();
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
  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div className="form-container mt-[5vh] w-[380px] h-[580px]">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign In
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              placeholder="Email"
              className="peer"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              placeholder="Password"
              className="peer"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-4 text-sm">
            <span className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#FF4B45]">
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
      </div>
    </div>
  );
}
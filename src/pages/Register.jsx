import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify";
import GoogleIcon from "../assets/GoogleIcon.jsx";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const { signUp, signUpProvider } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(firstName, lastName, email, password, displayName);
      toastSuccessNotify("Registered successfully!");
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
            Sign Up
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              placeholder="First Name"
              className="peer"
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              placeholder="Last Name"
              className="peer"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn-danger">
            Register
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
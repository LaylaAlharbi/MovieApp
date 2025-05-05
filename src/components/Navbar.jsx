import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Switch from "./Switch";
import defaultAvatar from "../assets/avatar.png";


const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get the avatar source - use Google photo if available, otherwise use default
  const avatarSrc = currentUser?.photoURL || defaultAvatar;

  return (
    <nav className="bg-neutral-100 dark:bg-gray-900 py-3 dark:text-white w-full">
      <div className="flex w-full flex-wrap items-center justify-between px-6">
        <Link className="pr-2 text-2xl font-semibold" to="/">
          React Movie App
        </Link>
        <div className="relative flex items-center">
          {currentUser && (
            <h5 className="mr-2 capitalize">
              {currentUser.displayName || currentUser.email}
            </h5>
          )}
          <Switch />
          <img
            className="h-8 w-8 rounded-full cursor-pointer"
            src={avatarSrc}
            alt="User Avatar"
            onClick={() => setMenuOpen(!menuOpen)}
            onError={(e) => {
              e.target.src = defaultAvatar; // Fallback if the Google image fails to load
            }}
          />
          {menuOpen && (
            <div ref={menuRef} className="relative">
              <ul className="absolute left-auto right-0 z-[1000] mt-1 min-w-max list-none overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                {!currentUser ? (
                  <>
                    <li>
                      <Link
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
                        to="/register"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link to="/login">
                      <span
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-white/30 cursor-pointer"
                        role="button"
                        onClick={() => logOut()}
                      >
                        Logout
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
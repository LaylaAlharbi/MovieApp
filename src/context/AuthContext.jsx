import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signUp(firstName, lastName, email, password, displayName) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        // You can add other profile fields here
      });
      
      // Store additional user data in your database here if needed
      // For now, we'll just add it to the currentUser state
      setCurrentUser({ 
        ...user, 
        displayName,
        firstName,
        lastName
      });
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setCurrentUser(result.user);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signUp,
    logIn,
    logOut,
    signUpProvider: signUpWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
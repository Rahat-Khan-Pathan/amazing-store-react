import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user) setUser(user);
      } else {
        setUser({});
      }
    });
  }, []);

  //   Login with google
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Get logged in user
        const user = result.user;
        user.emailVerified = true;
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //   Sign up with email and password
  const emailPassSignup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("Account created successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //   Login with email and password
  const emailPassLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  //   Log out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        setError(error);
      });
  };

  return {
    user,
    error,
    logOut,
    googleLogin,
    emailPassLogin,
    emailPassSignup,
    setError
  };
};

export default useFirebase;

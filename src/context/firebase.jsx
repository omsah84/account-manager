// Import the functions you need from the SDKs you need
import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo0Cbs3o3kSHLUERGwyUFVIBQNGMEWGhc",
  authDomain: "account-manager-7bb46.firebaseapp.com",
  projectId: "account-manager-7bb46",
  storageBucket: "account-manager-7bb46.appspot.com",
  messagingSenderId: "386878696322",
  appId: "1:386878696322:web:7bf3fd3b3fd8d99cb47d9b",
  measurementId: "G-7WFWG57PTW",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPassword }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

// Prop Types validation
FirebaseProvider.propTypes = {
  children: PropTypes.object.isRequired, // setValue prop is required and must be a function
};

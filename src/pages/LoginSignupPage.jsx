import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import PropTypes from "prop-types";

function LoginSignupPage({ getUserCredential }) {
  // State to manage the current view (login or signup)
  const [toggle, setToggle] = useState("login");

  // Function to toggle between login and signup views
  const toggleChanger = (value) => {
    setToggle(value);
  };

  return (
    <>
      {toggle === "login" ? (
        <Login setValue={toggleChanger} getUserCredential={getUserCredential} />
      ) : (
        <Signup setValue={toggleChanger} />
      )}
    </>
  );
}

export default LoginSignupPage;

// Prop Types validation
LoginSignupPage.propTypes = {
  getUserCredential: PropTypes.func.isRequired, // setValue prop is required and must be a function
};

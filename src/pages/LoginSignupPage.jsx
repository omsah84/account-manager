import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";


function LoginSignupPage() {
  // State to manage the current view (login or signup)
  const [toggle, setToggle] = useState("login");

  // Function to toggle between login and signup views
  const toggleChanger = (value) => {
    setToggle(value);
  };

  return (
    <>
      {toggle === "login" ? (
        <Login setValue={toggleChanger} />
      ) : (
        <Signup setValue={toggleChanger} />
      )}
    </>
  );
}

export default LoginSignupPage;

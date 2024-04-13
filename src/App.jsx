import LoginSignupPage from "./pages/LoginSignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const getUserCredential = (uid, userName) => {
    setUserId(uid);
    setUsername(userName);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginSignupPage getUserCredential={getUserCredential} />}
          />{" "}
          */
          <Route
            path="/home"
            element={<HomePage userId={userId} userName={username} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

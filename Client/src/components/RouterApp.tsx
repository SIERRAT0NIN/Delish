import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import SavedRecipes from "./SavedRecieps";
import Error from "./Error";
import App from "../App";
import Featured from "./Featured";
import SignUp from "./SignUp";

function RouterApp() {
  const is_logged_in = true;

  return (
    <Routes>
      {is_logged_in ? (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feature" element={<Featured />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<SavedRecipes />} />
          <Route path="/error" element={<Error />} />
          <Route path="/app" element={<App />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LandingPage />} />
        </>
      )}
    </Routes>
  );
}

export default RouterApp;

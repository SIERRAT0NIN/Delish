import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import LandingPage from "./LandingPage";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import SavedRecipes from "./Explore";
import Error from "./Error";
import App from "../App";
import Featured from "./Featured";
import SignUp from "./SignUp";
import "../App.css";
import ChatBox from "./ChatBox";
import HomeThreeJS from "./HomeThreeJS";
import Footer from "./Footer";
import NewHome from "./NewHome";

function RouterApp() {
  const is_logged_in = true;

  return (
    <Routes>
      {is_logged_in ? (
        <>
          <Route path="/" element={<NewHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/feature" element={<Featured />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes" element={<SavedRecipes />} />
          <Route path="/developers" element={<Footer />} />
          <Route path="/three" element={<HomeThreeJS />} />
          <Route path="/error" element={<Error />} />
          <Route path="/app" element={<App />} />
        </>
      ) : (
        <>
          <Route path="/" element={<NewHome />} />
        </>
      )}
    </Routes>
  );
}

export default RouterApp;

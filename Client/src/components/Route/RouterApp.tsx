import { Route, Routes } from "react-router-dom";

import Profile from "../Home/Profile";
import Login from "../Auth/Login";
import Home from "../Home/Home";

import Error from "./Error";

import Featured from "../Home/Featured";
import SignUp from "../Auth/SignUp";
import "../../App.css";
import ChatBox from "../Message/ChatBox";
import HomeThreeJS from "../Misc/HomeThreeJS";

import LandingPage from "../Home/LandingPage";

import Explore from "../Home/Explore";

import Logout from "../Auth/Logout";
import Developers from "../Home/Developers";

function RouterApp() {
  const isAuthenticated = localStorage.getItem("token"); // Check for token
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          {/* If user is logged in */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Featured />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore_recipes" element={<Explore />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/three" element={<HomeThreeJS />} />
          <Route path="/*" element={<Error />} />
          <Route path="/logout" element={<Logout />} />
        </>
      ) : (
        <>
          {/* If not logged in */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/developers" element={<Developers />} />
        </>
      )}
    </Routes>
  );
}

export default RouterApp;

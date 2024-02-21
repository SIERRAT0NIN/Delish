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
import { useAuth } from "../Auth/AuthContext";
import NotificationCenter from "../Home/NotificationCenter";
import Followers from "../Home/Followers";
import CommunityNight from "../CommunityNight/CommunityNight";

function RouterApp() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          {/* If user is logged in */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Featured />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/explore_recipes" element={<Explore />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/community" element={<CommunityNight />} />
          {/* <Route path="/notifications" element={<NotificationCenter />} /> */}
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

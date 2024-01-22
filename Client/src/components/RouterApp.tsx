import { Route, Routes } from "react-router-dom";

import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import SavedRecipes from "./Explore";
import Error from "./Error";

import Featured from "./Featured";
import SignUp from "./SignUp";
import "../App.css";
import ChatBox from "./ChatBox";
import HomeThreeJS from "./HomeThreeJS";
import Footer from "./Footer";
import NewHome from "./NewHome";

import Explore from "./Explore";

function RouterApp() {
  const isAuthenticated = localStorage.getItem("token"); // Check for token
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<NewHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feature" element={<Featured />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore_recipes" element={<Explore />} />
          <Route path="/developers" element={<Footer />} />
          <Route path="/three" element={<HomeThreeJS />} />
          <Route path="/*" element={<Error />} />
        </>
      ) : (
        <>
          {/* If not logged in */}
          <Route path="/" element={<NewHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/developers" element={<Footer />} />
        </>
      )}
    </Routes>
  );
}

export default RouterApp;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect to login or home page
    navigate("/");
  }, [navigate]);

  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
}

export default Logout;

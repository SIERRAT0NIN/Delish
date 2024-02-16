import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useSnackbar } from "notistack";
function Logout() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout().then((data) => {
      console.log(data);
      if (data) {
        navigate("/login");
        // enqueueSnackbar("Logged out successfully", { variant: "success" });
      } else {
        alert("Failed to logout");
      }
    });
    // Redirect to login or home page
  }, []);

  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
}

export default Logout;

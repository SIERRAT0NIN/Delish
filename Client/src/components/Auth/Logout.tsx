import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Logout() {
  const navigate = useNavigate();
  const {logout} = useAuth()
  useEffect(() => {
    // Remove the token from local storage
    
    logout().then((data) =>{
      console.log(data)
      if(data){
        navigate('/')
      }else{
        alert("Failed to logout")
      }
    })
    // Redirect to login or home page
   
  }, [navigate]);

  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
}

export default Logout;

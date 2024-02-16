import { useState } from "react";
import axios from "axios";

const DeleteUser = () => {
  const [warning, setWarning] = useState(false);

  const deleteUser = async () => {
    try {
      await axios.delete("/delete_user");
      console.log("User deleted successfully");
      // Optionally, you can perform additional actions after successful deletion,
      // such as redirecting the user to the login page or displaying a success message.
    } catch (error) {
      console.error("Failed to delete user", error);
      // Optionally, you can display an error message to the user.
    }
  };

  const handleWarningClick = (e) => {
    // Prevent the click event from propagating to the parent elements
    e.stopPropagation();
  };

  const handleDeleteAccountClick = (e) => {
    // Prevent the click event from propagating to the parent elements
    e.stopPropagation();
    // Show the warning message
    setWarning(true);
  };

  return (
    <>
      {warning ? (
        <div onClick={handleWarningClick}>
          <p>Are you sure you want to delete your account?</p>
          <button onClick={deleteUser}>Yes, Delete My Account</button>
          <button onClick={() => setWarning(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleDeleteAccountClick}>Delete Account</button>
      )}
    </>
  );
};

export default DeleteUser;

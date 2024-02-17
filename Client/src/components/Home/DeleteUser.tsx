import { useState } from "react";
import axios from "axios";

const DeleteUser = ({ deleteUser }) => {
  const [warning, setWarning] = useState(false);

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

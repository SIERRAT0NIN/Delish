// import React, { useState } from "react";
// import axios from "axios";
// import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
// import UserProfileModal from "./UserProfileModal";

// // Assuming UserProfileModal is correctly set up to use the provided props

// const Followers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [modalOpen, setModalOpen] = useState(false); // Correctly defined state for modal visibility
//   const [selectedUser, setSelectedUser] = useState(null);

//   // fetchUsers and handleSearch logic remains unchanged

//   // Updated handleUserClick to match state names

//   const fetchUsers = async (query) => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await axios.get(
//         `http://127.0.0.1:5050/search_users?query=${query}`
//       );
//       if (Array.isArray(response.data)) {
//         setUsers(response.data);
//       } else {
//         console.error("Response data is not an array", response.data);
//         setUsers([]);
//       }
//     } catch (error) {
//       console.error("Failed to fetch users:", error);
//       setError("Failed to fetch users");
//       setUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     if (e.target.value.length > 2) {
//       // Consider searching after the user has typed at least 3 characters
//       fetchUsers(e.target.value);
//     }
//   };
//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     setModalOpen(true);
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>Search for users!</CardHeader>
//         <CardBody>
//           <Input
//             placeholder="Search for followers"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           {Array.isArray(users) &&
//             users.map((user) => (
//               <div
//                 key={user.id}
//                 onClick={() => handleUserClick(user)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <p>
//                   <span className="font-bold">Username:</span> {user.username}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Email:</span> {user.email}
//                 </p>
//               </div>
//             ))}
//         </CardBody>
//       </Card>
//       <UserProfileModal
//         isOpen={modalOpen}
//         onClose={handleCloseModal}
//         user={selectedUser}
//       />
//     </div>
//   );
// };

// export default Followers;
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  useDisclosure,
  user,
} from "@nextui-org/react";
import UserProfileModal from "./UserProfileModal";

const Followers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //   const [modalOpen, setModalOpen] = useState(false); // Use this for modal visibility
  const [selectedUser, setSelectedUser] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const fetchUsers = async (query) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://127.0.0.1:5050/search_users?query=${query}`
      );
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Response data is not an array", response.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      fetchUsers(e.target.value);
    }
  };

  const handleUserClick = (user) => {
    console.log("Opening modal for user:", user);
    setSelectedUser(user);
    onOpen(true);
  };

  return (
    <div>
      <Card>
        <CardHeader>Search for users!</CardHeader>
        <CardBody>
          <Input
            placeholder="Search for followers"
            value={searchTerm}
            onChange={handleSearch}
          />
          {Array.isArray(users) &&
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  <span className="font-bold">Username:</span> {user.username}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
            ))}
        </CardBody>
      </Card>
      {isOpen ? <p>Modal should be open</p> : <p>Modal is closed</p>}
      <UserProfileModal
        isOpen={isOpen}
        // onClose={() => isOpen(false)}
        user={selectedUser}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default Followers;

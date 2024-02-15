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
          {loading && <p>Loading...</p>}

          {Array.isArray(users) &&
            users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserClick(user)}
                style={{ cursor: "pointer" }}
                className="p-2 border-b-2 border-gray-200 hover:bg-gray-100 transition-colors duration-200 ease-in-out hover:shadow-md hover:border-gray-300 rounded-md mt-2 w-full"
              >
                <p>
                  <span className="font-bold">Username:</span> {user.username}
                </p>
                <p>
                  <span className="font-bold">Email:</span> {user.email}
                </p>
              </div>
            ))}
        </CardBody>
      </Card>

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

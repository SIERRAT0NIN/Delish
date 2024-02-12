import React, { useState } from "react";
import axios from "axios"; // You might need to install axios with `npm install axios`
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";

const Followers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async (query) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5050/search_users?query=${query}`
      );
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error("Response data is not an array", response.data);
        // Handle non-array responses or set a default empty array state
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Handle the error appropriately
      setUsers([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      // Consider searching after the user has typed at least 3 characters
      fetchUsers(e.target.value);
    }
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
            users.map((user) => <div key={user.id}>{user.name}</div>)}
        </CardBody>
      </Card>
    </div>
  );
};

export default Followers;

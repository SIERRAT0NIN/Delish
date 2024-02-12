import React, { useState } from "react";
import axios from "axios"; // You might need to install axios with `npm install axios`
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";

const Followers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <CardBody>
            {Array.isArray(users) &&
              users.map((user) => (
                <div key={user.id}>
                  <p>
                    <span className="font-bold">Username:</span> {user.username}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                </div>
              ))}
          </CardBody>
        </CardBody>
      </Card>
    </div>
  );
};

export default Followers;

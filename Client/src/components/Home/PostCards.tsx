import React, { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";

import {
  Button,
  Card,
  CardBody,
  Image,
  Chip,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

export default function PostCards() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  function HeartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    );
  }
  function MessageCircleIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    );
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
      console.log("token", token);
      if (!token) {
        console.error("No token found");
      }
      try {
        const response = await fetch("http://127.0.0.1:5050/posts", {
          method: "GET",
          credentials: "include", // This tells the browser to include cookies with the request

          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is a bearer token
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch posts.");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);
  console.log("posts", posts);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4 py-10">
      {posts ? (
        posts.map((post) => (
          <Card
            key={post.id}
            className="bg-glass border border-glass shadow-lg backdrop-filter backdrop-blur-lg flex flex-col md:flex-row w-full max-w-4xl my-4 p-5 gap-4"
          >
            <div className="w-full md:w-2/5 flex flex-col items-center p-2">
              <img
                alt="Delicious meal"
                className="aspect-square max-w-full rounded-lg"
                src={post.image_url || "https://via.placeholder.com/300"} // Fallback for missing images
              />
              <div className="flex justify-center gap-2 mt-2">
                <Button variant="ghost" color="danger" className="m-2">
                  <HeartIcon className="w-4 h-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" color="danger">
                  <MessageCircleIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-3">
              <p className="text-sm mb-2">@{post.user_id}</p>
              <h2 className="text-lg font-extrabold mb-2">Recipe:</h2>
              <p>{post.content}</p>
              <h3 className="text-lg font-extrabold mt-4 mb-2">Ingredients:</h3>
              <div className="flex flex-wrap">
                {/* {post.ingredients.map((ingredient, index) => ( */}
                <Chip
                  key={post.id}
                  color="primary"
                  variant="dot"
                  className="m-2"
                >
                  {post.ingredients}
                </Chip>
                {/* ))} */}
              </div>
              <h4 className="font-bold mt-4">Tags</h4>
              <div className="flex flex-wrap">
                {/* {post.content.map((content, index) => ( */}
                <Chip
                  key={post.id}
                  color="primary"
                  variant="dot"
                  className="m-2"
                >
                  {post.content}
                </Chip>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}

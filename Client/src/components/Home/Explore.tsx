import React, { useEffect, useState } from "react";
import { Button, Card, Tooltip } from "@nextui-org/react";
import NavBar from "./NavBar";
import Followers from "./Followers";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
      console.log("token", token);
      if (!token) {
        setIsLoading(false);
        setError("You need to be logged in to view this page");
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5050/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        setError("An error occurred. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log("posts", posts);
  return (
    <div className="lg:container mx-auto px-4 lg:px-8 pattern">
      <Card className="p-1 mt-5 sm:p-10  sm:m-10">
        <h1 className="mb-5 text-center text-base sm:text-lg bg-gradient-to-r from-purple-500 to-pink-300 text-white py-3 sm:py-5 rounded ">
          Explore
        </h1>
        <div className="mb-5">
          <Followers />
        </div>
        <div className=""></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map(
            (
              post // Map over the posts array
            ) => (
              <div key={post.id} className="relative group">
                <img
                  alt="Post"
                  className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
                  src={post.image_url || "https://via.placeholder.com/200"} // Use post.image_url for the image source
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex flex-col items-center space-y-2">
                    <Button color="danger" variant="ghost">
                      <HeartIcon className="w-6 h-6" />
                      <span className="sr-only">Like</span>
                    </Button>
                    <Button color="danger" variant="ghost">
                      <MessageCircleIcon className="w-6 h-6" />
                      <span className="sr-only">Comment</span>
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
}

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

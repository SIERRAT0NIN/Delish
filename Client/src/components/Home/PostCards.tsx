import React, { useEffect, useState } from "react";
import UserInfoCard from "./UserInfoCard";

import {
  Button,
  Card,
  CardBody,
  Image,
  Chip,
  CardHeader,
  CircularProgress,
  CardFooter,
} from "@nextui-org/react";
import { useSnackbar } from "notistack";
import { useAuth } from "../Auth/AuthContext";

export default function PostCards() {
  const { user, getCookie } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
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
  const isLikedByUser = (post: any) => {
    return post.likes.some((like: any) => like.user_id === user.id);
  };

  const handleLike = async (post) => {
    const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
    if (!token) {
      console.error("No token found");
      enqueueSnackbar("Please login to like or unlike posts", {
        variant: "warning",
      });
      return;
    }

    // Determine whether to like or unlike the post
    const method = post.isLikedByUser ? "DELETE" : "POST";
    const url = `/api/like/${post.id}`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update the like status of the post.");
      }

      // Update local state to reflect the new like status
      const updatedPosts = posts.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            isLikedByUser: !p.isLikedByUser,
            // Optionally adjust the like count if you're tracking that
            // likeCount: p.isLikedByUser ? p.likeCount - 1 : p.likeCount + 1,
          };
        }
        return p;
      });

      setPosts(updatedPosts);

      enqueueSnackbar(
        post.isLikedByUser
          ? "Post unliked successfully"
          : "Post liked successfully",
        { variant: "success" }
      );
    } catch (error) {
      console.error("Error liking/unliking the post:", error);
      enqueueSnackbar("An error occurred while updating the post", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage

      if (!token) {
        console.error("No token found");
        setIsLoading(false); // Ensure loading is set to false even if there's no token
        return;
      }
      try {
        const response = await fetch("/api/posts", {
          // Ensure the URL is correct
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Assuming the token is a bearer token
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch posts.");
        }

        let data = await response.json();

        // Assuming each post has a 'likes' array containing objects with a 'user_id' key
        data = data.map((post) => ({
          ...post,
          isLikedByUser: post.likes
            ? post.likes.some((like) => like.user_id === user.id)
            : false,
        }));

        setPosts(data);
      } catch (error) {
        console.error(error.message);
        enqueueSnackbar(error.message, { variant: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [enqueueSnackbar, user.id]);

  const commentClick = () => {
    console.log("Comment button clicked");
    enqueueSnackbar("Commented", { variant: "success" });
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-3 ">
      {posts ? (
        posts.map((post: any) => (
          <div className="shadow-lg flex m-5 mt-12 p-5 rounded-lg w-full xl:w-4/5">
            <div className="w-full xl:w-1/2">
              <div className="">
                <Image
                  alt="Delicious meal"
                  className="rounded-lg object-cover"
                  src={post.image_url || "https://via.placeholder.com/300"} // Fallback for missing images
                  width={600}
                  height={600}
                />
                <div className="flex justify-center gap-2 mt-2">
                  <Button
                    color="danger"
                    variant={post.isLikedByUser ? "solid" : "ghost"} // Change button variant based on like status
                    onClick={() => handleLike(post)}
                  >
                    <HeartIcon className="w-6 h-6" />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button color="danger" variant="ghost" onClick={commentClick}>
                    <MessageCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Comment</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-3">
              <p className="text-sm mb-2">@{user.username}</p>
              <h2 className="text-lg font-extrabold mb-2">Recipe:</h2>
              <p>{post.content}</p>
              <h3 className="text-lg font-extrabold mt-4 mb-2">Ingredients:</h3>
              {post.ingredients.map((ingredient, index) => (
                <Chip
                  key={`${post.id}-${ingredient}-${index}`} // Adjusted key to be more unique
                  color="primary"
                  variant="dot"
                  className="m-2"
                >
                  {ingredient}
                </Chip>
              ))}
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
              <h3>Comments</h3>
            </div>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
}

// Create a file named AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useSnackbar } from "notistack";

export const BackendDataContext = createContext({}); // Provide an argument for createContext()

export const BackendContext = ({ children }: { children: React.ReactNode }) => {
  // Add type annotation for the 'children' parameter
  const { user, getCookie } = useAuth();
  const [posts, setPosts] = useState<never[]>([]); // Add type annotation for the state variable
  const { enqueueSnackbar } = useSnackbar();
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Initial state as 0

  const handleLike = async (post: any) => {
    // Add type annotation for the 'post' parameter
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      enqueueSnackbar("Please login to like or unlike posts", {
        variant: "warning",
      });
      return;
    }

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

      const updatedPosts = posts.map((p) => {
        if (p.id === post.id) {
          return {
            ...p,
            isLikedByUser: !p.isLikedByUser,
          };
        }
        return p;
      });

      setPosts(updatedPosts as never[]); // Add type assertion for the setPosts function

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
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }
      try {
        const response = await fetch("/api/posts", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch posts.");
        }

        let data = await response.json();

        data = data.map((post: any) => ({
          ...post,
          isLikedByUser: post.likes
            ? post.likes.some((like: any) => like.user_id === user.id)
            : false,
        }));

        setPosts(data as never[]); // Add type assertion for the setPosts function
      } catch (error) {
        console.error(error.message);
        enqueueSnackbar(error.message, { variant: "error" });
      }
    };

    fetchPosts();
  }, [user]);

  //! Add the fetchCommentsForPost function

  const [comments, setComments] = useState([]); // Add type annotation for the state variable
  const fetchCommentsForPost = async (postId: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          x_csrf_token: getCookie("csrf_access_token"),
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch comments for post with ID " + postId);
      }

      const comments = await response.json();
      setComments(comments);
      return comments;
    } catch (error) {
      console.error("Fetch comments error:", error);
      enqueueSnackbar("Failed to load comments for post", {
        variant: "error",
      });
      return [];
    }
  };

  useEffect(() => {
    posts.forEach((post) => {
      fetchCommentsForPost(post.id).then((comments) => {
        setCommentsByPostId((prevComments) => ({
          ...prevComments,
          [post.id]: comments,
        }));
      });
    });
  }, [posts, refreshTrigger]);

  console.log("commentsByPostId", commentsByPostId);

  const commentClick = () => {
    console.log("Comment button clicked");
    enqueueSnackbar("Commented", { variant: "success" });
  };
  const isLikedByUser = (post: any) => {
    return post.likes.some((like: any) => like.user_id === user.id);
  };

  return (
    <BackendDataContext.Provider
      value={{
        handleLike,
        posts,
        fetchCommentsForPost,
        enqueueSnackbar,
        commentClick,
        isLikedByUser,
        commentsByPostId,
        selectedPost,
        setSelectedPost,
        refreshTrigger,
        setRefreshTrigger,
      }}
    >
      {children}
    </BackendDataContext.Provider>
  );
};
export const BackendDataProvider = BackendContext;

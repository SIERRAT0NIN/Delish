import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useSnackbar } from "notistack";

export const BackendDataContext = createContext({});
export const BackendContext = ({ children }: { children: React.ReactNode }) => {
  const { user, getCookie } = useAuth();
  const [posts, setPosts] = useState<never[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsByPostId, setCommentsByPostId] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileBio, setProfileBio] = useState("");

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch user profile.");
      }

      const data = await response.json();

      setProfileData(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      enqueueSnackbar("Failed to load user profile", {
        variant: "error",
      });
    }
  };

  const handleLike = async (post: any) => {
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

      setPosts(updatedPosts as never[]);
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

  const [comments, setComments] = useState([]);
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

  const commentClick = () => {
    console.log("Comment button clicked");
    enqueueSnackbar("Commented", { variant: "success" });
  };
  const isLikedByUser = (post: any) => {
    return post.likes.some((like: any) => like.user_id === user.id);
  };

  const userId = user ? user.id : "no user";
  useEffect(() => {
    console.log("userId", userId);
    const fetchProfilePicture = async (userId: string | null) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/profiles/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });

        if (!response.ok) {
          throw new Error("Could not fetch profile picture.");
        }

        const data = await response.json();

        setProfilePicture(data.profile_picture);
        setProfileBio(data.bio);
        console.log("Profile picture data:", data);
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        enqueueSnackbar("Failed to load profile picture", {
          variant: "error",
        });
      }
    };

    fetchProfilePicture(userId);
  }, [userId]);

  return (
    <BackendDataContext.Provider
      value={{
        handleLike,
        posts,
        setPosts,
        fetchCommentsForPost,
        enqueueSnackbar,
        commentClick,
        isLikedByUser,
        commentsByPostId,
        selectedPost,
        setSelectedPost,
        refreshTrigger,
        setRefreshTrigger,
        profileData,
        fetchUserProfile,
        setProfileData,
        profilePicture,
        profileBio,
      }}
    >
      {children}
    </BackendDataContext.Provider>
  );
};
export const BackendDataProvider = BackendContext;

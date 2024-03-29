import {
  Avatar,
  Card,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { useEffect, useState, useContext } from "react";
import { useAuth } from "../Auth/AuthContext";
import { BackendDataContext } from "../Auth/BackendDataContext";

import DeleteUser from "./DeleteUser";
import FollowersInfo from "./FollowersInfo";
import { enqueueSnackbar } from "notistack";

export default function Component() {
  const { refreshTrigger, profileBio, profilePicture } =
    useContext(BackendDataContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const { getCookie, user } = useAuth();

  const userId = user.id;
  const deleteUser = async () => {
    try {
      const response = await fetch("/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const fetchMyPosts = async () => {
    try {
      const response = await fetch("/api/my/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
      enqueueSnackbar("Failed to load user posts", {
        variant: "error",
      });
    }
  };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/user/posts", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }

      const data = await response.json();

      setPosts(data);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  console.log("posts", posts);
  useEffect(() => {
    fetchUserPosts();
  }, []);
  useEffect(() => {
    fetchMyPosts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <Card className="mt-5 mb-10">
        <div className="text-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-5 rounded  text-center shadow-md">
          <span className="">Profile</span>
        </div>
        <span className="flex justify-end p-5">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem href="/logout">Logout</DropdownItem>
              <DropdownItem color="danger">
                <DeleteUser deleteUser={deleteUser} />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
        <div className="flex flex-col items-center space-y-6 profile-card">
          <div className="justify-center contents">
            <div>
              <Avatar
                // src={profileData?.profile_picture}
                src={profilePicture}
                alt="Profile Picture"
                size="xl"
                className="m-auto"
              />
              <h1>{user.username}</h1>
              <h1>{user.email}</h1>
              <br />
              <p>{profileBio}</p>
              {profileData && (
                <>
                  <h1></h1>
                  <p>
                    Profile Picture:
                    <img src={profilePicture} alt="Profile" />
                  </p>
                  <p>Bio: {profile.bio}</p>
                </>
              )}
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <span>{posts.length} Posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <FollowersInfo userId={user.id} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id}>
                  <Image
                    alt="Image caption"
                    className="aspect-square object-cover rounded-[12px]"
                    height={300}
                    src={post.image_url}
                    width={300}
                  />
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {post.content}
                  </div>
                </div>
              ))
            ) : (
              <div>
                <span className="flex justify-center mx-auto">
                  No posts found
                </span>
              </div>
            )}
          </div>
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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/It5XEMx4dPJ
 */
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
import RecipeModal from "./RecipeModal";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import DeleteUser from "./DeleteUser";

export default function Component() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(false);

  const { getCookie } = useAuth();
  const deleteUser = async () => {
    try {
      await axios.delete("/delete_user");
      // Optionally, you can handle success response here
      console.log("User deleted successfully");
    } catch (error) {
      // Handle error response here
      console.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5050/user/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": getCookie("csrf_access_token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [getCookie]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("posts", posts);
  return (
    <div className="w-full">
      <Card className="mt-5 mb-10">
        <div className="text-lg bg-gradient-to-r from-violet-200 to-green-500 text-white p-5 rounded  text-center">
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
                <DeleteUser />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </span>
        <div className="flex flex-col items-center space-y-6 profile-card">
          <div className="justify-center contents">
            <Avatar
              src="https://w7.pngwing.com/pngs/480/557/png-transparent-bart-simpsons-illustration-homer-simpson-lisa-simpson-marge-simpson-fox-satire-homer-television-face-animals.png"
              alt="User's name"
              size="lg"
              className="place-content-stretch"
            />
            <h1 className="text-2xl font-bold">@Alberto.Sierra</h1>
            <p className="justify-center text-sm text-gray-500 dark:text-gray-400 line-clamp-4">
              This is a short bio about the user. It's a brief introduction that
              is limited to 150 characters.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>3 Posts</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5" />
                <span>1.2k followers</span>
              </div>
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-5 h-5" />
                <span>500 following</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div>
              <Image
                alt="Image caption"
                className="aspect-square object-cover rounded-[12px]"
                height={300}
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Image caption
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <HeartIcon className="w-5 h-5" />
                <span>120 likes</span>
              </div>
            </div>

            <div>
              <Image
                alt="Image caption"
                className="aspect-square object-cover rounded-[12px]"
                height={300}
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Image caption
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <HeartIcon className="w-5 h-5" />
                <span>85 likes</span>
              </div>
            </div>
            <div>
              <Image
                alt="Image caption"
                className="aspect-square object-cover rounded-[12px]"
                height={300}
                src="https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Image caption
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <HeartIcon className="w-5 h-5" />
                <span>200 likes</span>
              </div>
            </div>
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

import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  Avatar,
  Image,
} from "@nextui-org/react";
import { useAuth } from "../Auth/AuthContext";
import { toast } from "react-toastify";

// Adjusted component to accept props
const UserProfileModal = ({ isOpen, onClose, user, onOpenChange }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { getCookie } = useAuth();

  const checkIfFollowing = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}/followers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIsFollowing(data.isFollowing);
      } else {
        throw new Error("Failed to fetch follow status.");
      }
    } catch (error) {
      console.error("Failed to check follow state", error);
      toast.error("Could not verify follow status.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user.id}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });
      if (response.ok) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Failed to follow user", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleFollowUnfollow = async (action) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`/api/users/${user.id}/follow`, {
  //       method: action === "follow" ? "POST" : "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-CSRF-TOKEN": getCookie("csrf_access_token"),
  //       },
  //     });
  //     if (response.ok) {
  //       setIsFollowing(action === "follow");
  //       toast.success(
  //         `User ${action === "follow" ? "" : "un"}followed successfully.`
  //       );
  //     } else {
  //       throw new Error(`Failed to ${action} user.`);
  //     }
  //   } catch (error) {
  //     console.error(`Failed to ${action} user`, error);
  //     toast.error(`Could not ${action} the user.`);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  useEffect(() => {
    if (user) {
      checkIfFollowing();
    }
  }, [user]);
  const handleFollowUnfollow = async (action) => {
    setIsLoading(true);
    try {
      const method = action === "follow" ? "POST" : "DELETE"; // Determine method based on action
      const response = await fetch(`/api/users/${user.id}/follow`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": getCookie("csrf_access_token"),
        },
      });
      if (response.ok) {
        setIsFollowing(action === "follow");
        toast.success(
          `User ${action === "follow" ? "" : "un"}followed successfully.`
        );
      } else {
        // Handle non-OK response
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(`Failed to ${action} user`, error);
      toast.error(`Could not ${action} the user.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader>
        <h2>User Profile</h2>
      </ModalHeader>
      <ModalContent className="flex justify-center">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="dancing-script justify-center flex">Delish</h1>
            </ModalHeader>

            <ModalBody className="flex justify-center">
              {user && (
                <>
                  <div className="flex justify-center">
                    <Avatar
                      src="https://w7.pngwing.com/pngs/480/557/png-transparent-bart-simpsons-illustration-homer-simpson-lisa-simpson-marge-simpson-fox-satire-homer-television-face-animals.png"
                      alt="User's name"
                      size="lg"
                      className="place-content-stretch flex justify-center"
                    />
                  </div>
                  <h2 className="flex justify-center">@{user.username}</h2>
                  <Button
                    color={isFollowing ? "default" : "primary"}
                    onClick={() =>
                      handleFollowUnfollow(isFollowing ? "unfollow" : "follow")
                    }
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : isFollowing
                      ? "Unfollow"
                      : "Follow"}
                  </Button>

                  <div>
                    <Image
                      alt="Image caption"
                      className="aspect-square object-cover rounded-[12px] "
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
                </>
              )}
            </ModalBody>

            <ModalFooter>
              {/* <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <ModalFooter>
        <Button auto flat color="error" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserProfileModal;

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

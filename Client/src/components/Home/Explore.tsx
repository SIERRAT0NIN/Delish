import { useEffect, useState, useContext } from "react";
import { Button, Card, Image, useDisclosure } from "@nextui-org/react";
import Followers from "./Followers";
import { useSnackbar } from "notistack";
import ExploreImgModal from "./ExploreImgModal";
import { CircularProgress } from "@nextui-org/react";
import { BackendDataContext } from "../Auth/BackendDataContext";

export default function Explore() {
  const { commentsByPostId, posts, setPosts, selectedPost, setSelectedPost } =
    useContext(BackendDataContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");

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
    return <CircularProgress aria-label="Loading..." />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const likeClick = () => {
    console.log("Like button clicked");
    enqueueSnackbar("Liked", { variant: "success", className: "" });
  };
  const commentClick = () => {
    enqueueSnackbar("Commented", { variant: "success" });
  };
  const imgClick = (post) => {
    setSelectedPost(post);
    onOpenChange(true);
  };

  console.log(posts[0].user_id);
  return (
    <Card className="mt-5 mb-10 p-2">
      <h1 className="flex justify-center text-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-5 rounded ">
        Explore
      </h1>
      <div className="mb-5">
        <Followers />
      </div>

      <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="relative group">
            <Image
              alt="Post"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              src={post.image_url || "https://i.imgur.com/xIMZq7l.png"}
              onClick={() => imgClick(post)}
            />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2 z-10">
                <Button onClick={likeClick} color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button
                  color="danger"
                  variant="ghost"
                  onClick={() => imgClick(post)}
                >
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ExploreImgModal
        onClose={onclose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedPost={selectedPost} // Pass selectedPost as a prop
        likeClick={likeClick}
        commentClick={commentClick}
        commentsByPostId={commentsByPostId}
      />
    </Card>
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

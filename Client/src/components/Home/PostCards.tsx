import UserInfoCard from "./UserInfoCard";
import { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  CardHeader,
  CircularProgress,
  CardFooter,
  Image,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  select,
} from "@nextui-org/react";

import { useSnackbar } from "notistack";
import { useAuth } from "../Auth/AuthContext";
import { BackendDataContext } from "../Auth/BackendDataContext";
import CommentModal from "./CommentModal";
import { FoodImgCarousel } from "./FoodImgCarousel";

export default function PostCards() {
  const { user, getCookie } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    handleLike,

    commentsByPostId,

    setSelectedPost,

    setRefreshTrigger,
    posts,
  } = useContext(BackendDataContext);

  const openCommentModal = (postId) => {
    setSelectedPost(postId);
    onOpenChange(true);
  };

  const deleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRF-Token": getCookie("csrf_access_token"),
        },
      });
      if (!response.ok) {
        throw new Error("Could not delete comment");
      }
      const data = await response.json();
      setRefreshTrigger((prev) => prev + 1);
      enqueueSnackbar("Comment deleted", { variant: "success" });
    } catch (error) {
      console.error("Delete comment error:", error);
      enqueueSnackbar("Failed to delete comment", { variant: "error" });
    }
  };

  console.log("posts", posts);
  return (
    <div className="flex flex-col justify-center items-center px-4 py-3">
      {posts ? (
        posts.map((post: any) => (
          <div
            key={post.id}
            className="shadow-lg flex m-5 mt-12 p-5 rounded-lg w-full xl:w-4/5"
          >
            <div className="w-full xl:w-1/2">
              <div className="">
                <FoodImgCarousel post={post} />
                <div className="flex justify-center gap-2 mt-2">
                  <Button
                    color="danger"
                    variant={post.isLikedByUser ? "solid" : "ghost"}
                    onClick={() => handleLike(post)}
                  >
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
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>

                    <span className="sr-only">Like</span>
                  </Button>
                  <Button
                    color="danger"
                    variant="ghost"
                    onClick={() => openCommentModal(post.id)}
                  >
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
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                      />
                    </svg>

                    <span className="sr-only">Comment</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-3">
              <p className="text-sm mb-2">@{user.username}</p>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
              <h2 className="text-lg font-extrabold mb-2">Recipe:</h2>
              <p>{post.content}</p>
              <h3 className="text-lg font-extrabold mt-4 mb-2">Ingredients:</h3>
              {post.ingredients.map((ingredient, index) => (
                <Chip
                  key={`${post.id}-${ingredient}-${index}`}
                  color="primary"
                  variant="dot"
                  className="m-2"
                >
                  {ingredient}
                </Chip>
              ))}
              <h4 className="font-bold mt-4">Tags</h4>
              <div className="flex flex-wrap">
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
              <div className="rounded-lg bg-zinc-100">
                {commentsByPostId[post.id] &&
                commentsByPostId[post.id].length > 0 ? (
                  commentsByPostId[post.id].map((comment) => (
                    <div
                      key={comment.id}
                      className="  p-3  justify-right flex "
                    >
                      <div className="justify-left flex">
                        <p className="font-bold">@Alberto:</p>
                        <p className="text-black ml-1">{comment.content}</p>
                      </div>

                      {/* DELETE BUTTON */}
                      <Button
                        isIconOnly
                        className="delete-icon ml-5"
                        onPress={() => deleteComment(comment.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 hover:block cursor-pointer hover:text-red-500 transition-all duration-300 ease-in-out hover:rotate-180 transform hover:scale-125 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No comments yet</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <CircularProgress />
      )}
      <CommentModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

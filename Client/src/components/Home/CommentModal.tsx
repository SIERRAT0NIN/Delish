// import React, { useEffect } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Textarea,
// } from "@nextui-org/react";
// import { useState } from "react";
// import { useAuth } from "../Auth/AuthContext";
// import { useSnackbar } from "notistack";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useSnackbar } from "notistack";
import { BackendDataContext } from "../Auth/BackendDataContext";

const CommentModal = ({ isOpen, onOpenChange }) => {
  const { selectedPost, setRefreshTrigger } = useContext(BackendDataContext);
  const { enqueueSnackbar } = useSnackbar();
  const { user, getCookie } = useAuth();
  const [commentText, setCommentText] = useState("");

  const createComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      enqueueSnackbar("You must be logged in to post a comment", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CSRF-Token": getCookie("csrf_access_token"),
        },
        body: JSON.stringify({
          user_id: user.id,
          post_id: selectedPost,
          content: commentText,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create comment.");
      }

      const data = await response.json();
      enqueueSnackbar("Comment posted successfully", { variant: "success" });
      onOpenChange(false);
      setCommentText("");
      setRefreshTrigger((prev) => prev + 1); // Increment the trigger
    } catch (error) {
      console.error("Create comment error:", error);
      enqueueSnackbar("Failed to post comment", { variant: "error" });
    }
  };

  const commentClick = (post) => {
    console.log("Comment button clicked");
    enqueueSnackbar("Commented", { variant: "success" });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add a comment
            </ModalHeader>
            <ModalBody>
              <Textarea
                placeholder="Write your comment here"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />{" "}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={createComment}>
                Post
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;

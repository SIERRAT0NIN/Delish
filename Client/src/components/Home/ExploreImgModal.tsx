import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
} from "@nextui-org/react";
import { Chip } from "@mui/material";

const ExploreImgModal = ({
  isOpen,
  onOpenChange,
  selectedPost,
  likeClick,
  commentClick,
  commentsByPostId,
}) => {
  console.log("Selected post:", selectedPost);
  const comments = selectedPost ? commentsByPostId[selectedPost.id] || [] : [];
  console.log("Comments:", comments);
  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-bold">{selectedPost.content}</h3>
                <p className="text-sm text-gray-500">
                  Posted by: {selectedPost.user_id}
                </p>
                <Button
                  className="justify-center"
                  variant="shadow"
                  color="primary"
                >
                  Follow
                </Button>
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center">
                  {selectedPost && (
                    <Image src={selectedPost.image_url} alt="Selected Post" />
                  )}
                </div>
                <p>{selectedPost.ingredients}</p>
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Comments</h4>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="mb-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{comment.user}</p>
                          <span className="text-sm text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-center ">
                <div className="flex gap-2 mt-2">
                  <Button color="danger" variant="ghost" onPress={likeClick}>
                    <HeartIcon className="w-6 h-6 " />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button color="danger" variant="ghost" onPress={commentClick}>
                    <MessageCircleIcon className="w-6 h-6" />
                    <span className="sr-only">Comment</span>
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ExploreImgModal;

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

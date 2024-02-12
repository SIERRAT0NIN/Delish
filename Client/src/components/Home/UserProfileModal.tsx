import React from "react";
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

// Adjusted component to accept props
const UserProfileModal = ({ isOpen, onClose, user, onOpenChange }) => {
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
                  <Button color="primary" onPress={onClose}>
                    Follow
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

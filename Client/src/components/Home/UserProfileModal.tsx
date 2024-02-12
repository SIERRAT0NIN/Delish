import React from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
} from "@nextui-org/react";

// Adjusted component to accept props
const UserProfileModal = ({ isOpen, onClose, user, onOpenChange, onOpen }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader>
        <h2 size={18}>User Profile</h2>
      </ModalHeader>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>

            <ModalBody>
              {user && (
                <>
                  <h2>
                    <strong>Username:</strong> {user.username}
                  </h2>
                  <h2>
                    <strong>Email:</strong> {user.email}
                  </h2>
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
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

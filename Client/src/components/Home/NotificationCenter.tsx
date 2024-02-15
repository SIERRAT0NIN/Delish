import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

export default function NotificationCenter({ isOpen, onOpenChange }) {
  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Notifications
              </ModalHeader>
              <ModalBody>
                {/* <Card>
                  <CardHeader> */}
                <h4>Notifications</h4>
                <p>You have 3 unread messages.</p>
                {/* </CardHeader>
                  <CardBody> */}
                <div className="notification-item">
                  <h4>Your call has been confirmed.</h4>
                  <p>5 min ago</p>
                </div>
                <div className="notification-item">
                  <h4>You have a new message!</h4>
                  <p>1 min ago</p>
                </div>
                <div className="notification-item">
                  <h4>Your subscription is expiring soon!</h4>
                  <p>2 hours ago</p>
                </div>
                {/* </CardBody> */}
                {/* </Card> */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  useDisclosure,
  Input,
  Chip,
} from "@nextui-org/react";

export default function CreatePostModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", file);
    onClose();
    // Send the FormData object to a server
  };
  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="foreground"
          href="chat "
          color="success"
          variant="shadow"
          className="text-white"
          onPress={() => handleOpen()}
        >
          Create Post
        </Button>
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create a post!
              </ModalHeader>
              <ModalBody>
                <div className="flex align-center">
                  <input
                    className="bg-orange-300 rounded-lg p-3"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex">
                  <Textarea
                    label="Recipe"
                    variant="bordered"
                    placeholder="Enter your recipe"
                    disableAnimation
                    disableAutosize
                    classNames={{
                      base: "max-w-md",
                      input: "resize-y min-h-[40px]",
                    }}
                  />
                </div>

                <div className="bg-orange-300 p-3 rounded-lg">
                  <Input placeholder="Add an ingredient" />
                  <br />
                  <Button
                    color="default"
                    className="text-white"
                    variant="ghost"
                  >
                    Add ingredient
                  </Button>
                </div>
              </ModalBody>
              <ModalHeader>List of ingredients</ModalHeader>
              <ModalBody>
                <Chip variant="dot" color="primary">
                  ingredient 1
                </Chip>
                <Chip variant="dot" color="success">
                  ingredient 2
                </Chip>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-orange-300 text-white"
                  variant="shadow"
                  onPress={handleSubmit}
                >
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import React, { useState, useEffect } from "react";
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
import { useAuth } from "../Auth/AuthContext";
import { Alert, Snackbar } from "@mui/material";
import { useSnackbar } from "notistack";

export default function CreatePostModal() {
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState(null);
  const { getCookie } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ingredients, setIngredients] = useState([]);
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState(
    "https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const handleInputChange = (e) => setInput(e.target.value);
  const handleInputTagChange = (e) => setInputTag(e.target.value);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  const addIngredient = () => {
    if (!input.trim()) return; // Prevent adding empty strings
    setIngredients([...ingredients, input]);
    setInput("");
  };

  const addTag = () => {
    if (!inputTag.trim()) return; // Prevent adding empty strings
    setTags([...tags, inputTag]);
    setInputTag("");
  };
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        // Update ingredients, tags, or other data if needed
      } catch (error) {
        console.error("Error fetching data:", error);
        enqueueSnackbar("Error fetching data:", { variant: "error" });
      }
    };

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmit = () => {
    fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCookie("csrf_access_token"),
      },
      body: JSON.stringify({
        content: content,
        ingredients: ingredients,
        tags: tags,
        image_url: image_url,
      }),
    });
    setSuccessSnackbar(true);
    enqueueSnackbar("Successfully created a post!", { variant: "success" });
    onClose();
  };
  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          // color="foreground"
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
                  {/* To upload a file from local machine */}
                  {/* <input
                    type="file"
                    className="file-input  file-input-md file-input-bordered file-input-default w-full max-w-xs"
                    onChange={handleFileChange}
                    placeholder="Upload a photo"
                  /> */}
                  <Input
                    type="url"
                    value={image_url}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Upload a photo url"
                  />
                </div>
                <div className="flex">
                  <Textarea
                    label="Recipe"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    variant="bordered"
                    placeholder="Enter your recipe"
                    disableAnimation
                    disableAutosize
                    isRequired
                    classNames={{
                      base: "max-w-md",
                      input: "resize-y min-h-[40px]",
                    }}
                  />
                </div>

                <div className="bg-orange-300 p-3 rounded-lg">
                  <Input
                    placeholder="Add an ingredient"
                    value={input}
                    onChange={handleInputChange}
                  />
                  <br />
                  <Button
                    color="default"
                    className="text-white"
                    variant="ghost"
                    onClick={addIngredient}
                  >
                    Add ingredient
                  </Button>
                </div>
                <div className="bg-blue-300 p-3 rounded-lg">
                  <Input
                    placeholder="Add tags"
                    value={inputTag}
                    onChange={handleInputTagChange}
                  />
                  <br />
                  <Button
                    color="default"
                    className="text-white"
                    variant="ghost"
                    onClick={addTag}
                  >
                    Add tags
                  </Button>
                </div>
              </ModalBody>
              <h1>List of ingredients</h1>
              <ModalBody>
                <ul className="mt-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="mt-1">
                      <Chip variant="dot" color="primary">
                        {ingredient}
                      </Chip>
                    </li>
                  ))}
                </ul>
                <h1>List of tags</h1>
                <ul className="mt-3">
                  {tags.map((tag, index) => (
                    <li key={index} className="mt-1">
                      <Chip variant="dot" color="success">
                        #{tag}
                      </Chip>
                    </li>
                  ))}
                </ul>
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

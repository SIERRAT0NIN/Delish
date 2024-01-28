import React, { useEffect, useState } from "react";
import { Button, Card, Tooltip } from "@nextui-org/react";
import NavBar from "./NavBar";

export default function Explore() {
  const toolTip = "Check out post from other users!";
  const [images, setImages] = useState([]);

  const fetchPostImage = async (postId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/post/${postId}/image`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setImages((prevImages) => [...prevImages, data.image_url]);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    const postIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    postIds.forEach(fetchPostImage);
  }, []);
  return (
    <div className="lg:container mx-auto px-4 lg:px-8">
      <NavBar />
      <Card className="p-1 mt-5 sm:p-10  sm:m-10">
        <div className="">
          <h1 className="mb-5 text-center text-base sm:text-lg bg-gradient-to-r from-purple-500 to-pink-300 text-white py-3 sm:py-5 rounded ">
            Explore
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button color="danger" variant="ghost">
                  <MessageCircleIcon className="w-6 h-6" />
                  <span className="sr-only">Comment</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group">
            <img
              alt="Image"
              className="aspect-square object-cover w-full rounded-lg overflow-hidden group-hover:opacity-50"
              height="300"
              src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"
              width="300"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col items-center space-y-2">
                <Button color="danger" variant="ghost">
                  <HeartIcon className="w-6 h-6" />
                  <span className="sr-only">Like</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
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

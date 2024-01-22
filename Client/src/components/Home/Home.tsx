/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0c74MeFlbqY
 */
import { Button, Card, CardBody, Image } from "@nextui-org/react";
import NavBar from "./NavBar";
import UserInfoCard from "./UserInfoCard";

export default function Home() {
  return (
    <>
      <NavBar />
      <Card className="p-10 mt-10">
        <h1 className="flex justify-center text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-5 rounded m-2">
          Home
        </h1>
        <div className="grid grid-cols-1  gap-4">
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 1"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 2"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 3"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 4"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 5"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="group">
            <Card className="p-3">
              <img
                alt="Image 6"
                className="aspect-square object-cover w-full rounded-lg cursor-pointer"
                height={300}
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=2880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                width={300}
              />
              <div className="p-2">
                <p className="text-sm">This is a beautiful sunset.</p>
                <UserInfoCard />
                <div>
                  <Button variant="ghost" color="danger" className="m-2">
                    <HeartIcon className="w-4 h-4" />

                    <span className="sr-only">Like</span>
                  </Button>

                  <Button variant="ghost" color="danger">
                    <MessageCircleIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </>
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

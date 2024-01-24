/**
 * v0 by Vercel.
 * @see https://v0.dev/t/It5XEMx4dPJ
 */
import { Avatar, Card, Button, Image } from "@nextui-org/react";
import RecipeModal from "./RecipeModal";
import NavBar from "./NavBar";

export default function Component() {
  return (
    <div className="lg:container lg:mx-auto">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 md:px-6 lg:py-16 md:py-12 ">
        <div className="mb-10">
          <NavBar />
        </div>
        <Card>
          <div className="text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-5 rounded m-2 text-center">
            Profile
          </div>
          <div className="flex flex-col items-center space-y-6 profile-card">
            <div className="justify-center contents">
              <Avatar
                src="https://w7.pngwing.com/pngs/480/557/png-transparent-bart-simpsons-illustration-homer-simpson-lisa-simpson-marge-simpson-fox-satire-homer-television-face-animals.png"
                alt="User's name"
                size="lg"
                className="place-content-stretch"
              />
              <h1 className="text-2xl font-bold">@Alberto.Sierra</h1>
              <p className="justify-center text-sm text-gray-500 dark:text-gray-400 line-clamp-4">
                This is a short bio about the user. It's a brief introduction
                that is limited to 150 characters.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <span>3 Posts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5" />
                  <span>1.2k followers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UsersIcon className="w-5 h-5" />
                  <span>500 following</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <Image
                  alt="Image caption"
                  className="aspect-square object-cover rounded-[12px]"
                  height={300}
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={300}
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Image caption
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <HeartIcon className="w-5 h-5" />
                  <span>120 likes</span>
                </div>
              </div>

              <div>
                <Image
                  alt="Image caption"
                  className="aspect-square object-cover rounded-[12px]"
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
              <div>
                <Image
                  alt="Image caption"
                  className="aspect-square object-cover rounded-[12px]"
                  height={300}
                  src="https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={300}
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Image caption
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <HeartIcon className="w-5 h-5" />
                  <span>200 likes</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

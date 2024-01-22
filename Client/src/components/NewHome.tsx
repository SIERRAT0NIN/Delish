/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EvGAMCINoOi
 */

import {
  Card,
  Link,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import NavBar from "./NavBar";
import UserInfoCard from "./UserInfoCard";

export default function NewHome() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800">
        <Link href="#">
          <span className="sr-only">Social Media Platform</span>
        </Link>
        <NavBar />
      </header>
      <main className="flex-1  bg-glass border border-glass shadow-lg backdrop-filter-blur ">
        <section className="flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 ">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to Social Media Platform
          </h1>
          <p className="mt-4 max-w-[700px] text-black-500 md:text-xl dark:text-gray-400">
            Connect with friends and the world around you on Social Media
            Platform.
          </p>
          <Link
            className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Sign Up Now
          </Link>
        </section>
        <section className="px-6 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center">
            Latest Posts
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Image
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  height="200"
                  className="w-full h-64 object-cover rounded-lg"
                  src="https://travelfoodatlas.com/wp-content/uploads/2020/08/Tacos-Al-Pastor.jpg.webp"
                ></Image>
                <h3 className="mt-4 text-xl font-bold">Post Title</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This is a brief description of the post.
                </p>
                <UserInfoCard />
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Image
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  height="200"
                  className="w-full h-64 object-cover rounded-lg"
                  src="https://travelfoodatlas.com/wp-content/uploads/2020/08/Tacos-Al-Pastor.jpg.webp"
                ></Image>
                <h3 className="mt-4 text-xl font-bold">Post Title</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This is a brief description of the post.
                </p>
                <UserInfoCard />
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center p-6">
                <Image
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  height="200"
                  className="w-full h-64 object-cover rounded-lg"
                  src="https://travelfoodatlas.com/wp-content/uploads/2020/08/Tacos-Al-Pastor.jpg.webp"
                ></Image>
                <h3 className="mt-4 text-xl font-bold">Post Title</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This is a brief description of the post.
                </p>
                <UserInfoCard />
              </CardBody>
            </Card>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center py-6 bg-white dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          © 2024 Social Media Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

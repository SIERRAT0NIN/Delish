import {
  Card,
  Link,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import NavBar from "./NavBar";
import UserInfoCard from "./UserInfoCard";
import NotificationCenter from "./NotificationCenter";
import { useAuth } from "../Auth/AuthContext";
import Cake3D from "../3D-Models/Cake3D";
import Logo3D from "../3D-Models/Logo3D";
import Footer from "./Footer";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="flex  flex-col min-h-screen lg:container lg:mx-auto rounded mt-5 mb-10 ">
      <header className="flex items-center justify-between px-6 py-4  rounded-lg">
        <Link href="/">
          <span className="sr-only">Delish</span>
        </Link>
      </header>
      <main className="flex-1 rounded bg-glass border border-glass shadow-lg glass ">
        <section className="flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 ">
          <h1 className="text-3xl  font-bold text-black tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to
            <span>
              <Logo3D />
            </span>
          </h1>
          <p className="mt-4 max-w-[700px] text-black-500 md:text-xl  text-black">
            Connect with friends and the world around you on Delish to share
            your beautiful meals and delicious recipes
          </p>
          {!user && (
            <Link
              className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="signup"
            >
              Sign Up Now
            </Link>
          )}
          {/* <Cake3D /> */}
        </section>
        <section className="px-6 py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-center ">
            Latest Posts
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardBody className=" flex flex-col items-center justify-center p-6">
                <Image
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  height="200"
                  className="w-full h-64 object-cover rounded-lg"
                  src="https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                ></Image>
                <h3 className="mt-4 text-xl font-bold">Post Title</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This is a brief description of the post.
                </p>
                <UserInfoCard />
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center justify-center p-6 ">
                <Image
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                  height="200"
                  className="w-full h-64 object-cover rounded-lg"
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                ></Image>
                <h3 className="mt-4 text-xl font-bold">Post Title</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  This is a brief description of the post.
                </p>
                <UserInfoCard />
              </CardBody>
            </Card>
          </div>
          <a href="developers">
            <Button
              className="mt-10 hover:text-white hover:bg-warning-500"
              variant="ghost"
              color="warning"
            >
              <span className="hover:text-white">Developers</span>
            </Button>
          </a>
        </section>
      </main>

      {/* <NotificationCenter /> */}
    </div>
  );
}

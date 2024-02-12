import { Link } from "@nextui-org/react";
import NavBar from "./NavBar";
import LogoIcon from "../3D-Models/LogoIcon3D";

export default function Developers() {
  return (
    <>
      <div className="  absolute">
        <LogoIcon />
      </div>

      <div className="rounded-lg mt-10">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-t-lg">
          <footer className="container mx-auto py-6 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center ">
            <h2 className="text-2xl font-bold">Alberto S.</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Full-stack developer specializing in modern web technologies.
              Passionate about creating intuitive and dynamic user experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <GithubIcon className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </footer>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800">
          <footer className="container mx-auto py-6 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold">Landon C.</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Full-stack developer specializing in modern web technologies.
              Passionate about creating intuitive and dynamic user experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <GithubIcon className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </footer>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800">
          <footer className="container mx-auto py-6 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold">Danner B.</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Full-stack developer specializing in modern web technologies.
              Passionate about creating intuitive and dynamic user experiences.
            </p>
            <div className="flex space-x-4">
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <GithubIcon className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </footer>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-b-lg">
        <footer className="container mx-auto py-6 px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-2xl font-bold">Austin O.</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Full-stack developer specializing in modern web technologies.
            Passionate about creating intuitive and dynamic user experiences.
          </p>
          <div className="flex space-x-4">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <GithubIcon className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <TwitterIcon className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <LinkedinIcon className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024</p>
        </footer>
      </div>
    </>
  );
}

function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

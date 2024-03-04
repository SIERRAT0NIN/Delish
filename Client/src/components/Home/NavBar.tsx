import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  ButtonGroup,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Badge,
  useDisclosure,
} from "@nextui-org/react";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "../Auth/AuthContext";

import NightmodeBtn from "../Misc/NightmodeBtn";

export default function NavBar() {
  const { user } = useAuth(); // Check for token
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleUserClick = () => {
    onOpen(true);
  };

  return (
    <>
      <Navbar
        className="nav-bar content-stretch p-2 shadow-lg overflow-y-auto"
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="md:hidden">
          <NavbarBrand className="justify-center flex">
            <p className="font-bold dancing-script ">Delish</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {user && (
            <NavbarContent justify="end">
              <NavbarItem>
                <Link color="foreground" href="home">
                  Home
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="profile">
                  Profile
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href="explore_recipes"
                  color="foreground"
                  aria-current="page"
                >
                  Explore
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="chat">
                  Messages
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="community">
                  Community Night
                </Link>
              </NavbarItem>
              <div className="hidden md:flex flex p-5 ">
                <NavbarItem>
                  <CreatePostModal />
                </NavbarItem>
                <Button
                  className="justify-self-end ml-4"
                  as={Link}
                  color="danger"
                  href="logout"
                  variant="shadow"
                >
                  Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                </Button>
              </div>
            </NavbarContent>
          )}

          <div className="hidden md:inline-block">{<NightmodeBtn />}</div>
        </NavbarContent>
      </Navbar>
      <ButtonGroup
        variant="ghost"
        className="btm-nav fixed bottom-0 inset-x-0 bg-transparent shadow-md p-4 flex justify-around md:hidden z-50"
      >
        <Button href="/home" className="glass">
          <a href="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>
        </Button>
        <Button className="glass">
          <a href="/explore_recipes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </a>
        </Button>
        <Button
          className="glass"
          color="primary"
          variant="shadow"
          as={CreatePostModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Button>
        <Button className="glass" href="/chat" as={Link}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </Button>
        <Button className="glass" as={Link} href="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Button>
      </ButtonGroup>
      {/* <NotificationCenter isOpen={isOpen} onOpenChange={onOpenChange} /> */}
    </>
  );
}

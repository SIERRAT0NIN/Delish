import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
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
import NotificationCenter from "./NotificationCenter";
export default function NavBar() {
  const { user } = useAuth(); // Check for token
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Login", href: "/login" },
    { label: "Home Page", href: "/home" },
    { label: "Create a new post", href: "/new-post" },
    { label: "Profile", href: "/profile" },
    { label: "Explore Recipes", href: "/explore_recipes" },
    { label: "Messages", href: "/chat" },
    { label: "Followers", href: "/followers" },
    { label: "Notification", href: "/notifications" },
    { label: "My Settings", href: "/settings" },
    { label: "Help & Feedback", href: "/help" },
    { label: "Log Out", href: "/logout" },
    <NightmodeBtn />,
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleUserClick = () => {
    onOpen(true);
  };

  return (
    <div className="container  ">
      <Navbar
        className="nav-bar content-stretch p-2 shadow-lg "
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden  pr-3">
          <NavbarBrand>
            <p className="font-bold dancing-script">Delish</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
          <Badge content="5" color="default">
            <Button isIconOnly onPress={handleUserClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Badge>
          <div className="hidden md:inline-block">{<NightmodeBtn />}</div>
        </NavbarContent>

        <NavbarContent justify="center">
          {!user && (
            <NavbarContent justify="end">
              <NavbarItem className="hidden lg:flex ">
                <Link href="login">Login</Link>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="secondary"
                  href="signup"
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          )}
        </NavbarContent>

        <div className="nav">
          <NavbarMenu>
            <div className="mt-7 pt-10 z-10">
              {menuItems.map((item, index) => (
                <NavbarMenuItem className="mb-2" key={`${item}-${index}`}>
                  <Link
                    className="w-full  "
                    color={
                      index === 0
                        ? "warning"
                        : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    href={item.href}
                    size="lg"
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
              <NavbarItem className="">
                <Link href="logout">
                  <Button color="danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6  sm:hidden"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                  </Button>
                </Link>
              </NavbarItem>
            </div>
          </NavbarMenu>
        </div>
      </Navbar>
      <NotificationCenter isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

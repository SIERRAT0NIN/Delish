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
  Image,
  Button,
} from "@nextui-org/react";
import CreatePostModal from "./CreatePostModal";
import { useAuth } from "../Auth/AuthContext";
import Logo3D from "./Logo3D";
import LogoIcon from "./LogoIcon3D";

import NightmodeBtn from "../Misc/NightmodeBtn";
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

  return (
    <div className="container  ">
      <Navbar
        className="nav-bar content-stretch p-2 shadow-lg "
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* <Image src="Client/src/images/FoodieLogo.png" /> */}
        {/* <div className="w-100px">
          <Logo3D />
        </div> */}

        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold dancing-script">Delish</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <button className="font-bold dancing-script">
              <a href="/">
                <LogoIcon />
              </a>
            </button>
          </NavbarBrand>

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
                  Explore Recipes
                </Link>
              </NavbarItem>

              <NavbarItem>
                <Link color="foreground" href="chat">
                  Messages
                </Link>
              </NavbarItem>
              <div className="hidden md:flex flex">
                <NavbarItem>
                  <CreatePostModal />
                </NavbarItem>
                <Button
                  className="justify-self-end"
                  as={Link}
                  color="danger"
                  href="logout"
                  variant="ghost"
                >
                  Logout
                </Button>
              </div>
            </NavbarContent>
          )}
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
        <div className="nav ">
          <NavbarMenu>
            <div className="mt-7 pt-10">
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
            </div>
          </NavbarMenu>
        </div>
      </Navbar>
    </div>
  );
}

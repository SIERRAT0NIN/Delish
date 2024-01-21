import React from "react";
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
import NightmodeBtn from "./NightmodeBtn";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Create a new post",
    "Profile",
    "Explore Recipes",
    "Messages",
    "Followers",
    "Notification",
    "My Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      className="nav-bar content-stretch shadow-lg"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <Image src="Client/src/images/FoodieLogo.png" />

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">Delish</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Image
            className="mr-10"
            src="https://i.imgur.com/qc6msvk.png"
            width={"69"}
          ></Image>
          <button className="font-bold text-inherit">
            <a href="/"> Delish</a>
          </button>
        </NavbarBrand>

        <NavbarItem>
          <Link href="recipes" color="foreground" aria-current="page">
            Explore Recipes
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="profile">
            Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="home">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="chat">
            Messages
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {/* <NightmodeBtn /> */}

        <NavbarItem className="hidden lg:flex ">
          <Link href="login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="secondary" href="signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <div className="nav  ">
        <NavbarMenu>
          <div className="mt-7">
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="w-full  "
                  color={
                    index === 0
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href={"#"}
                  size="lg"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </div>
    </Navbar>
  );
}

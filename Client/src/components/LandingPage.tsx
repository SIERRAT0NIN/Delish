import React from "react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import NavBar from "./NavBar";
import UserInfoCard from "./UserInfoCard";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <div className="mb-10">
        <NavBar />
      </div>
      <div className="justify-center flex ">
        <Card className="user-card flex ">
          <Image src="https://travelfoodatlas.com/wp-content/uploads/2020/08/Tacos-Al-Pastor.jpg.webp"></Image>
          <h1 className="text-xl ">Food Name</h1>
          <p>
            <strong>Food Description:</strong>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At amet est
            corporis expedita dolorem, doloribus dolores ea voluptas maiores
            reprehenderit soluta id pariatur autem! Earum cumque pariatur alias
            facere saepe.
          </p>
          <CardFooter>
            <UserInfoCard />
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </>
  );
}

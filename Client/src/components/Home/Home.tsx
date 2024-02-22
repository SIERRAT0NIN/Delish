import { Card } from "@nextui-org/react";
import React, { useContext } from "react";
import PostCards from "./PostCards";
import { BackendDataContext } from "../Auth/BackendDataContext";

export default function Home() {
  const { posts } = useContext(BackendDataContext);
  return (
    <div>
      <div>
        <Card className="mt-5 mb-10 home-card">
          <h1 className="text-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-5 rounded   text-center">
            Home
          </h1>
          <PostCards posts={posts} key={posts.id} />
        </Card>
      </div>
    </div>
  );
}

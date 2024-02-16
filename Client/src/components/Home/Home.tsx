import { Card } from "@nextui-org/react";
import NavBar from "./NavBar";
import PostCards from "./PostCards";

export default function Home() {
  return (
    <div>
      <div>
        <Card className="mt-5 mb-10 home-card">
          <h1 className="text-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded  text-center">
            Home
          </h1>

          <PostCards />
        </Card>
      </div>
    </div>
  );
}

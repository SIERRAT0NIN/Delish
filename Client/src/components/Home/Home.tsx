import NavBar from "./NavBar";
import PostCards from "./PostCards";

export default function Home() {
  return (
    <div className="container max-width: 1536px">
      <NavBar />
      <h1 className="text-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded m-5 text-center">
        Home
      </h1>
      <PostCards />
      <PostCards />
    </div>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0c74MeFlbqY
 */
import {
  Button,
  Card,
  CardBody,
  Image,
  Chip,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import NavBar from "./NavBar";
import UserInfoCard from "./UserInfoCard";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen px-4 mt-10">
        <Card className="mx-auto overflow-hidden" style={{ maxWidth: "100%" }}>
          <h1 className="text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-5 rounded m-2 text-center">
            Home
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex justify-center home-cards p-5 ">
            <div className="">
              <div className="  bg-glass border border-glass shadow-lg backdrop-filter-blur flex flex-col md:flex-row w-fit p-5  home-cards ">
                <Card className=" p-2 w-full m-5 md:w-3/5">
                  <img
                    alt="Image 1"
                    className="aspect-square object-cover w-max rounded-lg cursor-pointer"
                    height={300}
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    width={300}
                  />
                  <div className="p-2">
                    <p className="text-sm">Delicious meal</p>
                    <UserInfoCard />
                    <div>
                      <Button variant="ghost" color="danger" className="m-2">
                        <HeartIcon className="w-4 h-4" />

                        <span className="sr-only">Like</span>
                      </Button>

                      <Button variant="ghost" color="danger">
                        <MessageCircleIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="w-full lg:w-3/5 m-5 p-3">
                  @Alberto.sierra
                  <CardHeader className="text-lg font-extrabold">
                    Recipe:
                  </CardHeader>
                  <CardBody>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Ipsa quasi labore praesentium tempora quia iste quo
                    necessitatibus accusamus pariatur iusto provident recusandae
                    quos, in culpa repellendus. Maiores non molestiae repellat.
                  </CardBody>
                  <CardHeader className="text-lg font-extrabold">
                    Ingredients:
                  </CardHeader>
                  <CardBody>
                    <ul className="grid grid-cols-1 md:grid-cols-1  flex">
                      <li>
                        <Chip
                          color="primary"
                          variant="dot"
                          className="m-2 p-2 "
                        >
                          Ingredient 1
                        </Chip>
                      </li>
                      <li>
                        <Chip color="primary" variant="dot" className="m-2 p-2">
                          Ingredient 2
                        </Chip>
                      </li>
                      <li>
                        <Chip color="primary" variant="dot" className="m-2 p-2">
                          Ingredient 3
                        </Chip>
                      </li>
                      <li>
                        <Chip color="primary" variant="dot" className="m-2 p-2">
                          Ingredient 4
                        </Chip>
                      </li>
                    </ul>
                  </CardBody>
                  <h1>Tags</h1>
                  <CardFooter>
                    <Chip color="primary" variant="dot" className="m-2 p-2">
                      Protein
                    </Chip>
                    <Chip color="danger" variant="dot" className="m-2 p-2">
                      Tasty
                    </Chip>
                    <Chip color="success" variant="dot" className="m-2 p-2">
                      Healthy
                    </Chip>
                    <Chip color="warning" variant="dot">
                      Ingredient
                    </Chip>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function HeartIcon(props) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
function MessageCircleIcon(props) {
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
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

import {
  Button,
  Card,
  CardHeader,
  Chip,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState, useRef, useEffect } from "react";
export default function CommunityNight() {
  const [hoveredUser, setHoveredUser] = useState(null);
  const [isWrapperHovered, setIsWrapperHovered] = useState(false);

  const users = [
    { name: "Alberto", id: "1" },
    { name: "Yola", id: "2" },
    { name: "BryanG", id: "3" },
    { name: "Antonio", id: "4" },
  ];
  const [showCard, setShowCard] = useState(false);
  const hideTimeoutRef = useRef();
  const handleMouseEnter = (userName, event) => {
    clearTimeout(hideTimeoutRef.current);
    setHoveredUser(userName);
    setShowCard(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to hide the card, giving time for the user to move the cursor over the card
    hideTimeoutRef.current = setTimeout(() => {
      setShowCard(false);
    }, 500); // 500ms delay before hiding the card
  };

  const handleCardMouseEnter = () => {
    clearTimeout(hideTimeoutRef.current); // Cancel hiding the card if the mouse is over it
  };

  const handleCardMouseLeave = () => {
    setShowCard(false); // Hide the card when the mouse leaves the card
  };

  useEffect(() => {
    return () => clearTimeout(hideTimeoutRef.current);
  }, []);

  return (
    <>
      <div className="justify-center flex mt-5 mb-10">
        <Card className="w-full md:w-1/2 ">
          <div className="px-4 py-6 space-y-6 md:px-6 ">
            <CardHeader>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">
                  <span className="dancing-script">Delish</span> Community Night
                </h1>
                <div className="p-10">
                  <h1 className="text-blue-500 font-bold dark:text-gray-400 underline">
                    Tonight's recipe: Chicken Tacos!
                  </h1>
                </div>
                <div className="">
                  <h1 className="font-bold">The ingredients you will need:</h1>

                  <ul>
                    <li>Chicken Breast</li>
                    <li>Maseca - Corn tortillas</li>
                    <li>Tomatillos</li>
                    <li>Jalapenos</li>
                    <li>Bell Pepper</li>
                    <li>Onion</li>
                    <li>Garlic</li>
                    <li>White Vinegar</li>
                    <li>Salt/Pepper</li>
                    <li>Chicken Bullion</li>
                  </ul>
                </div>

                <div className="p-5 ">
                  <h1 className="font-bold">Instructions:</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium laudantium facere reprehenderit ex, omnis,
                    deserunt debitis iusto repellat delectus libero enim
                    distinctio? Aliquid, omnis nihil! Aut illum doloribus
                    numquam necessitatibus.
                  </p>
                </div>
              </div>
            </CardHeader>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Grace Lee</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      2:14pm
                    </div>
                  </div>
                  <div>I love adding yougurt to my in my chicken marinade!</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Carlos Rodriguez</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      3:45pm
                    </div>
                  </div>
                  <div>Beans and rice are a must have with this dinner!</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Add your message</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enter your message below
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2"></div>
                  <div className="space-y-2">
                    <h1>Message</h1>
                    <Textarea
                      className="min-h-[100px]"
                      id="message"
                      placeholder="Enter your message"
                    />
                  </div>
                  <Button variant="bordered" color="primary">
                    Post Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div>
          <Card className="mx-auto w-40 p-2 ">
            <Button variant="light" className="mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="w-full h-full"
              >
                <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
              </svg>
            </Button>
            Check out our Discord Server!
          </Card>
          <Card className="p-3 m-3 max-h-[300px] ">
            <h1 className="font-bold">Leader</h1>
            <h1
              onMouseEnter={() => setHoveredUser("Alberto")}
              onMouseLeave={() => {
                setIsWrapperHovered(false);
                setHoveredUser(null);
              }}
              className="m-2 border-gray-200 hover:bg-blue-900 hover:text-white transition-colors duration-200 ease-in-out hover:shadow-md hover:border-gray-300 hover:text-black rounded-md mt-2 w-full cursor-pointer	"
            >
              Alberto
            </h1>
          </Card>

          <Card className="p-3 m-3 max-h-[300px] justify-right">
            <h1 className="font-bold">Participating Users</h1>
            <div
              onMouseEnter={() => setIsWrapperHovered(true)}
              onMouseLeave={handleMouseLeave}
            >
              {users.map((user) => (
                <div
                  key={user.id}
                  onMouseEnter={() => setHoveredUser(user.name)}
                  onMouseLeave={() => setHoveredUser(user.name)}
                  className="m-2 border-gray-200 hover:bg-blue-900 hover:text-white transition-colors duration-200 ease-in-out hover:shadow-md hover:border-gray-300 hover:text-black rounded-md mt-2 w-full cursor-pointer"
                >
                  @{user.name}
                </div>
              ))}
            </div>
            <Button variant="bordered">Want to participate?</Button>
          </Card>
          {isWrapperHovered && (
            <Card
              className="absolute transition-opacity duration-200 ease-in-out m-3 p-1 max-h-[300px]"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            >
              <CardHeader className="font-bold">{hoveredUser}</CardHeader>
              <div className="p-3">
                {hoveredUser}'s details or actions here.
              </div>
              <Button className="" color="primary">
                Profile
              </Button>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

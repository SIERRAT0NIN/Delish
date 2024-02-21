import {
  Button,
  Card,
  CardHeader,
  Chip,
  Input,
  Textarea,
} from "@nextui-org/react";

export default function CommunityNight() {
  return (
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
                  distinctio? Aliquid, omnis nihil! Aut illum doloribus numquam
                  necessitatibus.
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
                <Button>Post Message</Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div>
        <Card className="p-3 m-3 max-h-[300px]">
          <h1 className="font-bold">Leader</h1>
          <h1>Alberto</h1>
        </Card>
        <Card className="p-3 m-3 max-h-[300px]">
          <h1 className="font-bold">Participating Users</h1>
          <Chip color="success" variant="dot" className="m-2">
            @Yola
          </Chip>
          <Chip color="success" variant="dot" className="m-2">
            @BryanG
          </Chip>
          <Chip color="danger" variant="dot" className="m-2">
            @Antonio
          </Chip>
        </Card>
        <Card className="flex p-3 m-3">
          <CardHeader className=" ">What to participate?</CardHeader>
          <Button color="warning">Click here!</Button>
        </Card>
      </div>
    </div>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/po6fysEHVYX
 */

import { Button, Input, Avatar, Link, Card } from "@nextui-org/react";
import NavBar from "../Home/NavBar";

export default function ChatBox() {
  return (
    <>
      <NavBar />
      <Card className="mt-10 p-10">
        <h1 className="flex justify-center text-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white p-5 rounded m-2">
          Direct Messages
        </h1>
        <div className="grid grid-cols-4 h-screen">
          <div className="flex flex-col bg-gray-100 dark:bg-gray-800 rounded-md">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800 ">
              <Avatar
                className="h-9 w-9"
                src="https://www.gyfted.me/_next/image?url=%2Fimg%2Fcharacters%2Fned-flanders.png&w=640&q=75"
              ></Avatar>
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">Landon C.</div>
                <div className="text-green-500 dark:text-green-400">Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="group flex flex-col gap-4 py-2">
                <nav className="grid gap-1 px-2">
                  <Button
                    className="justify-start gap-2"
                    size="sm"
                    variant="ghost"
                  >
                    <Link href="#">
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="h-6 w-6"
                          alt="@shadcn"
                          src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
                        />
                        <div className="grid gap-0.5 text-xs">
                          <div className="font-medium">Alberto Sierra</div>
                          <div className="text-gray-500 dark:text-gray-400">
                            Hey, how's it going?
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Button>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex flex-col">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
              <Avatar
                className="h-6 w-6"
                alt="@shadcn"
                src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
              />
              <div className="grid gap-0.5 text-xs">
                <div className="font-medium">Alberto Sierra</div>
                <div className="text-green-500 dark:text-green-400">Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-end gap-2 mb-4">
                <Avatar
                  className="h-6 w-6"
                  alt="@shadcn"
                  src="https://www.onthisday.com/images/people/homer-simpson.jpg?w=360"
                />
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                  <p className="text-sm">Hey, how's it going?</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 p-4">
              <Input placeholder="Type a message" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../Auth/AuthContext";

export default function UserInfoCard() {
  const [isFollowed, setIsFollowed] = useState(false);
  const { user } = useAuth();

  return (
    <Card className="max-w-[100%] bg-glass border border-glass shadow-sm backdrop-filter-blur justify-center">
      <div className="bg-glass border border-glass shadow-sm backdrop-filter-blur">
        <CardHeader className="justify-between bg-glass border border-glass shadow-sm backdrop-filter-blur">
          <div className="flex gap-5 ">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://w7.pngwing.com/pngs/480/557/png-transparent-bart-simpsons-illustration-homer-simpson-lisa-simpson-marge-simpson-fox-satire-homer-television-face-animals.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center pr-5">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Alberto Sierra
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @Alberto.sierra
              </h5>
            </div>
          </div>
          <div className="">
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : "text-white"
              }
              color="success"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400  ">
          <p className=" pt-5">
            Front-end Chef. Cooking up code.
            <br />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          <span className="pt-2">
            #FrontendWithAlberto
            <span className="py-2" aria-label="computer" role="img">
              💻
            </span>
          </span>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4</p>
            <p className=" text-default-400 text-small">Following</p>
          </div>
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">1.5k</p>
            <p className="text-default-400 text-small">Followers</p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

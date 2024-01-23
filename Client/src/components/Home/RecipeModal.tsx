import React from "react";
import {
  Button,
  Card,
  CardBody,
  Image,
  Chip,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";

const RecipeModal = () => {
  return (
    <>
      <Card className="w-full lg:w-3/5  p-3">
        @Alberto.sierra
        <CardHeader className="text-lg font-extrabold">Recipe:</CardHeader>
        <CardBody>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa quasi
          labore praesentium tempora quia iste quo necessitatibus accusamus
          pariatur iusto provident recusandae quos, in culpa repellendus.
          Maiores non molestiae repellat.
        </CardBody>
        <h1>Ingredients</h1>
        <CardFooter>
          <Chip color="primary" variant="bordered" className="m-2 p-2">
            Grain
          </Chip>
          <Chip color="danger" variant="bordered" className="m-2 p-2">
            Meat
          </Chip>
          <Chip color="success" variant="bordered" className="m-2 p-2">
            Vegetable
          </Chip>
        </CardFooter>
      </Card>
    </>
  );
};

export default RecipeModal;

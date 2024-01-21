/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0c74MeFlbqY
 */
import { Button, Card } from "@nextui-org/react";
import NavBar from "./NavBar";

export default function Component() {
  return (
    <>
      <NavBar />
      <Card className="p-10 mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div className="group">
            <img
              alt="Image 1"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">This is a beautiful sunset.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              alt="Image 2"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">A stunning mountain view.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              alt="Image 3"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">A serene beach scene.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              alt="Image 4"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">A bustling cityscape.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              alt="Image 5"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">A peaceful forest path.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
          <div className="group">
            <img
              alt="Image 6"
              className="aspect-square object-cover w-full rounded-lg"
              height={300}
              src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8="
              width={300}
            />
            <div className="p-2">
              <p className="text-sm">A vibrant flower field.</p>
              <Button variant="ghost">
                <HeartIcon className="w-4 h-4" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
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

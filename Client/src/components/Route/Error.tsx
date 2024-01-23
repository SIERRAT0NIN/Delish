/**
 * v0 by Vercel.
 * @see https://v0.dev/t/xLAwhjQ8ErW
 */
import { Link, Button } from "@nextui-org/react";

export default function Component() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Oops! Something went wrong
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
          We're sorry for the inconvenience. Our team has been notified and will
          fix the issue as soon as possible.
        </p>
      </div>
      <Link
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 text-gray-900 px-8 text-sm font-medium shadow transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
        href="/"
      >
        Go Home
      </Link>
    </section>
  );
}

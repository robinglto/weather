import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
     <div className="flex justify-center my-3   ">
      <div className="space-y-2">
        <p className="subpixel-antialiased text-black mx-10 text-center  text-md">
          Built with{" "}
          <Link
            className="hover:text-gray-400 hover:decoration-dashed hover:underline cursor-pointer transition duration-500 ease-in-out"
            href="https://nextjs.org/"
          >
            Next.js
          </Link>
          ,{" "}
          <Link
            className="hover:text-gray-400 hover:decoration-dashed hover:underline cursor-pointer transition duration-500 ease-in-out"
            href="https://tailwindcss.com/"
          >
            Tailwind
          </Link>{" "}
          and{" "}
          <Link
            className="hover:text-gray-400 hover:decoration-dashed hover:underline cursor-pointer transition duration-500 ease-in-out"
            href="https://vercel.com/"
          >
            Vercel
          </Link>{" "}
          by Saul
        </p>
        <div className="flex justify-center space-x-4 ">
          <Link
            href={"https://twitter.com/robinglto"}
            className="hover:text-gray-400 subpixel-antialiased text-md text-black cursor-pointer transition duration-500 ease-in-out"
          >
            Twitter
          </Link>
          <Link
            href={"https://github.com/robinglto"}
            className="hover:text-gray-400 subpixel-antialiased  text-md text-black cursor-pointer transition duration-500 ease-in-out"
          >
            Github
          </Link>
        </div>
      </div>
    </div>
  );
}

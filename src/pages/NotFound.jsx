import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import notFoundAnimation from "../assets/notFound/Lonely 404.lottie";

export default function NotFound() {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <DotLottieReact
      src={notFoundAnimation}
      loop
      autoplay
      className="w-80 h-60 md:w-[900px] md:h-[400px]"
    />

    <h1 className="text-4xl font-bold mt-4">404</h1>
    <p className="text-gray-500 mt-2">
      Oops! The page you're looking for doesn't exist.
    </p>
  </div>
  );
}

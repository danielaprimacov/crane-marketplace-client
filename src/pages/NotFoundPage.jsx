import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import notFoundAnimation from "../assets/animations/notFoundAnimation.json";

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-gray-50 px-4 py-16">
      <section className="flex w-full max-w-3xl flex-col items-center text-center">
        <div className="h-52 w-52 sm:h-64 sm:w-64">
          <Lottie
            animationData={notFoundAnimation}
            loop
            autoplay
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
            }}
          />
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
          The page you are looking for does not exist, was moved, or the address
          is incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Go to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;

import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import notFoundAnimation from "../assets/animations/notFoundAnimation.json";

const linkClassName =
  "inline-flex h-11 items-center justify-center rounded-lg px-5 text-sm font-medium transition";

function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-6rem)] items-center justify-center bg-gray-50 px-4 py-16">
      <section className="flex w-full max-w-3xl flex-col items-center text-center">
        <div className="h-52 w-52 sm:h-64 sm:w-64" aria-hidden="true">
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
          The page you are looking for does not exist, has been moved, or the
          address is incorrect.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className={`${linkClassName} bg-black text-white hover:bg-red-700`}
          >
            Go to homepage
          </Link>

          <Link
            to="/cranes"
            className={`${linkClassName} border border-gray-300 bg-white text-gray-700 hover:bg-gray-100`}
          >
            Browse cranes
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;

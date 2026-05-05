import Lottie from "lottie-react";

import craneTruckDeliveryAnimation from "../../assets/animations/craneTruckDelivery.json";
import doubleCircularLoading from "../../assets/animations/doubleCircularLoading.json";
import profileAnimation from "../../assets/animations/profileAnimation.json";

const animationMap = {
  cranes: craneTruckDeliveryAnimation,
  profile: profileAnimation,
  default: doubleCircularLoading,
};

function LoadingState({
  type = "default",
  title = "Loading...",
  message = "Please wait while we prepare the content.",
  fullPage = false,
}) {
  const animationData = animationMap[type] || animationMap.default;

  console.log("Loading animation:", {
    type,
    animationData,
  });

  return (
    <div
      className={
        fullPage
          ? "flex min-h-[calc(100vh-6rem)] w-full items-center justify-center px-4 py-16"
          : "flex w-full items-center justify-center px-4 py-12"
      }
    >
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="h-44 w-44 sm:h-56 sm:w-56">
          <Lottie
            key={type}
            animationData={animationData}
            loop
            autoplay
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
            }}
          />
        </div>

        <h2 className="mt-4 text-xl font-semibold text-gray-900 sm:text-2xl">
          {title}
        </h2>

        {message && (
          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoadingState;

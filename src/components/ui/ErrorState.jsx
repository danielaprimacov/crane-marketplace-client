import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ErrorState({
  title = "Something went wrong",
  message = "The requested content could not be loaded.",
  actionLabel,
  actionTo,
  onRetry,
  fullPage = false,
}) {
  return (
    <div
      className={
        fullPage
          ? "flex min-h-[70vh] items-center justify-center px-4 py-16"
          : "flex w-full items-center justify-center px-4 py-12"
      }
    >
      <div className="w-full max-w-md rounded-2xl border border-red-100 bg-red-50 p-6 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
        </div>

        <h2 className="mt-4 text-xl font-semibold text-gray-900">{title}</h2>

        {message && (
          <p className="mt-2 text-sm leading-6 text-red-700">{message}</p>
        )}

        {(actionTo || onRetry) && (
          <div className="mt-6 flex justify-center">
            {actionTo ? (
              <Link
                to={actionTo}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                {actionLabel || "Go back"}
              </Link>
            ) : (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-black px-5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                {actionLabel || "Try again"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorState;

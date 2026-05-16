import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function BackButton({ className, fallback = "/cranes", label = "Back" }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/cranes", { replace: true });
    }

    navigate(fallback, { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      aria-label={label}
      className={clsx(
        "inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 cursor-pointer",
        className
      )}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm">
        <ArrowLeft className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
      </span>
      {label}
    </button>
  );
}

export default BackButton;

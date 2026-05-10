import { Link } from "react-router-dom";
import { getAvailabilityStatus } from "../../../utils/helpers";

import { getCraneId, getImageUrl } from "../../../utils/craneHelpers";

function CranePromoCard({ crane }) {
  const craneId = getCraneId(crane);
  const imageUrl = getImageUrl(crane);
  const availabilityStatus = getAvailabilityStatus(crane.availability);

  const isUnavailable = availabilityStatus === "expired";

  const availabilityLabel =
    availabilityStatus === "expired"
      ? "Not available"
      : availabilityStatus === "available"
      ? "Available now"
      : availabilityStatus === "upcoming"
      ? "Upcoming"
      : "Availability not set";

  return (
    <div className="group relative h-[20rem] overflow-hidden rounded bg-gray-100 shadow-sm transition duration-300 hover:shadow-md">
      <Link to={`/cranes/${craneId}`} className="absolute inset-0 z-10">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={crane.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        <div
          className={`absolute inset-0 ${
            isUnavailable ? "bg-black/40" : "bg-black/25"
          }`}
        />
      </Link>

      <div className="relative z-20 flex h-full flex-col items-center justify-between px-4 py-5 text-center pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
              isUnavailable
                ? "bg-gray-200 text-gray-700"
                : availabilityStatus === "upcoming"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {availabilityLabel}
          </span>
          <div className="pt-1 text-xl font-medium uppercase tracking-wider text-red-600 sm:text-2xl">
            {crane.status === "for sale"
              ? "For Sale"
              : crane.status === "for rent"
              ? "For Rent"
              : crane.status}
          </div>
        </div>
        {isUnavailable ? (
          <span className="inline-flex items-center justify-center self-center rounded-lg bg-gray-300 px-4 py-2 text-sm text-gray-700 sm:text-base">
            Inquiry unavailable
          </span>
        ) : (
          <Link
            to={`/cranes/${craneId}/new-inquiry`}
            className="pointer-events-auto rounded-lg bg-green-300 px-4 py-2 text-sm transition hover:scale-105 hover:text-black/80 sm:text-base"
          >
            Send an inquiry
          </Link>
        )}
      </div>
    </div>
  );
}

export default CranePromoCard;

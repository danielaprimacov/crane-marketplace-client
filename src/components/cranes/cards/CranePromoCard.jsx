import { Link } from "react-router-dom";

function CranePromoCard({ crane }) {
  const imageUrl = crane.images?.[0];

  return (
    <div className="group relative h-[20rem] overflow-hidden rounded bg-gray-100 shadow-sm transition duration-300 hover:shadow-md">
      <Link to={`/cranes/${crane._id}`} className="absolute inset-0 z-10">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={crane.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        <div className="absolute inset-0 bg-black/25" />
      </Link>

      <div className="relative z-20 flex h-full flex-col items-center justify-between px-4 py-6 text-center pointer-events-none">
        <div className="pt-2 text-xl font-medium uppercase tracking-wider text-white sm:text-2xl">
          {crane.status === "for sale"
            ? "For Sale"
            : crane.status === "for rent"
            ? "For Rent"
            : crane.status}
        </div>

        <Link
          to={`/cranes/${crane._id}/new-inquiry`}
          className="pointer-events-auto rounded-lg bg-green-300 px-4 py-2 text-sm transition hover:scale-105 hover:text-black/80 sm:text-base"
        >
          Send an inquiry
        </Link>
      </div>
    </div>
  );
}

export default CranePromoCard;

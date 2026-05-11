import InfoRow from "../ui/InfoRow";
import CraneSpecsGrid from "./CraneSpecsGrid";
import CraneInquiryButton from "./CraneInquiryButton";
import CraneManageButtons from "./CraneManageButtons";

import { getAvailabilityStatus } from "../../utils/craneHelpers";

function CraneDetailsPanel({ crane, user, isOwner, craneId, onDeleteClick }) {
  const availabilityStatus = getAvailabilityStatus(crane.availability);

  const canSendInquiry =
    (!user || user.role !== "admin") &&
    !isOwner &&
    availabilityStatus !== "expired";
  const canManage = user?.role === "admin" || isOwner;

  const priceLabel =
    crane.status === "for sale" && crane.salePrice != null
      ? `${crane.salePrice} €`
      : crane.status === "for rent" && crane.rentPrice?.amount != null
      ? `${crane.rentPrice.amount} €/${crane.rentPrice.interval}`
      : "Contact for price";

  const availabilityLabel =
    availabilityStatus === "expired"
      ? "Not available"
      : availabilityStatus === "available"
      ? "Available now"
      : availabilityStatus === "upcoming"
      ? "Upcoming"
      : "Not set";

  return (
    <>
      <div className="px-4 pt-4 sm:px-6 sm:px-6 xl:col-start-2 xl:row-start-1 xl:min-h-0 xl:overflow-hidden xl:pt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{crane.title}</h1>
            <h2 className="text-gray-500 mt-1">{crane.producer}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-left sm:justify-end sm:text-right">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-0 sm:mr-3 ${
                crane.status === "for sale"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {crane.status.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
            </span>

            <span className="inline-block px-3 py-1 bg-black text-white rounded-md font-medium">
              {priceLabel}
            </span>
          </div>
        </div>

        <CraneSpecsGrid crane={crane} />

        <div className="mt-4 mb-2 pr-0 xl:mt-1 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
          <p className="text-gray-700 leading-relaxed">{crane.description}</p>
        </div>
      </div>

      <div className="px-4 pb-6 sm:px-5 sm:pb-8 xl:col-start-2 xl:row-start-2">
        <div className="pt-2">
          <div className="grid gap-6 xl:grid-cols-[1fr_auto] xl:items-center">
            <dl className="space-y-4">
              <InfoRow label="Location:">{crane.location || "Not set"}</InfoRow>

              <InfoRow label="Period:">
                {crane.availability?.from && crane.availability?.to
                  ? `${new Date(
                      crane.availability.from
                    ).toLocaleDateString()} – ${new Date(
                      crane.availability.to
                    ).toLocaleDateString()}`
                  : "Not set"}
              </InfoRow>
            </dl>

            {availabilityStatus === "expired" ? (
              <span className="inline-flex items-center justify-center rounded bg-gray-200 px-4 py-2 text-gray-600">
                {availabilityLabel}
              </span>
            ) : canSendInquiry ? (
              <CraneInquiryButton craneId={craneId} />
            ) : null}
          </div>
        </div>

        {canManage && (
          <CraneManageButtons craneId={craneId} onDeleteClick={onDeleteClick} />
        )}
      </div>
    </>
  );
}

export default CraneDetailsPanel;

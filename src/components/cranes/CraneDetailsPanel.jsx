import InfoRow from "../ui/InfoRow";
import CraneSpecsGrid from "./CraneSpecsGrid";
import CraneInquiryButton from "./CraneInquiryButton";
import CraneManageButtons from "./CraneManageButtons";

import { getAvailabilityStatus } from "../../utils/helpers";

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

  return (
    <>
      <div className="px-6 pt-2 flex flex-col col-start-2 min-h-0 overflow-hidden lg:col-start-2 lg:row-start-1">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">{crane.title}</h1>
            <h2 className="text-gray-500 mt-1">{crane.producer}</h2>
          </div>

          <div className="text-right space-y-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
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

        <div className="mt-1 min-h-0 overflow-y-auto pr-2">
          <p className="text-gray-700 leading-relaxed">{crane.description}</p>
        </div>
      </div>

      <div className="px-5 pb-8 lg:col-start-2 lg:row-start-2">
        <div className="pt-2">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
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
                {availabilityStatus === "expired"
                  ? "Not available"
                  : availabilityStatus === "available"
                  ? "Available now"
                  : availabilityStatus === "upcoming"
                  ? "Upcoming"
                  : "Not set"}
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

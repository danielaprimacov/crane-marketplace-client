import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import AvailabilityRange from "../cranes/AvailabilityRange";
import Modal from "../ui/Modal";

function formatDate(dateValue) {
  if (!dateValue) return "Not specified";

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return "Not specified";

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDateInputValue(dateValue) {
  if (!dateValue) return "";

  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toISOString().slice(0, 10);
}

function getStatusBadgeClass(status) {
  return (
    {
      new: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    }[status] || "bg-gray-100 text-gray-800"
  );
}

function InquiryCard({
  _id: inquiryId,
  customerName,
  email,
  message,
  crane,
  period: initialPeriod,
  address,
  needsTransport,
  needsInstallation,
  status: initialStatus,
  onUpdate,
  onDelete,
  onCloseModal,
  showDetailsOnly = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(initialStatus || "new");
  const [editPeriod, setEditPeriod] = useState({
    periodStart: getDateInputValue(initialPeriod?.from),
    periodEnd: getDateInputValue(initialPeriod?.to),
  });

  // confirmation delete state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setEditPeriod({
      periodStart: getDateInputValue(initialPeriod?.from),
      periodEnd: getDateInputValue(initialPeriod?.to),
    });
  }, [initialPeriod]);

  const statusLabel = useMemo(
    () => (initialStatus || "new").replace(/_/g, " "),
    [initialStatus]
  );

  const saveHandler = async () => {
    const requestBody = {
      status,
    };

    if (editPeriod.periodStart && editPeriod.periodEnd) {
      requestBody.period = {
        from: new Date(editPeriod.periodStart),
        to: new Date(editPeriod.periodEnd),
      };
    }

    try {
      await onUpdate?.(inquiryId, requestBody);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save inquiry:", error);
    }
  };

  const cancelHandler = () => {
    setStatus(initialStatus || "new");
    setEditPeriod({
      periodStart: getDateInputValue(initialPeriod?.from),
      periodEnd: getDateInputValue(initialPeriod?.to),
    });
    setIsEditing(false);
  };

  // instead of immediate delete, open confirm
  const onDeleteClick = () => {
    setConfirmOpen(true);
  };

  // actual delete + close both modals
  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await onDelete?.(inquiryId);
      setConfirmOpen(false);
      onCloseModal?.();
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    } finally {
      setDeleting(false);
    }
  };

  const renderDetails = showDetailsOnly && !isEditing;

  return (
    <>
      {renderDetails ? (
        <>
          <h2 className="text-2xl uppercase font-semibold mb-5 text-center text-orange-600">
            Inquiry Details
          </h2>

          <div className="space-y-4 text-gray-700">
            <p className="text-base sm:text-lg text-center mb-2">{message}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <p>
                <strong>Customer:</strong> {customerName || "Not specified"}
              </p>
              <p className="break-all sm:text-right">
                <strong>Email:</strong> {email || "Not specified"}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:items-start">
              <p>
                <strong>Crane:</strong>{" "}
                {crane?._id ? (
                  <Link
                    to={`/cranes/${crane._id}`}
                    className="text-red-600 hover:underline"
                  >
                    {crane?.title || "View crane"}
                  </Link>
                ) : (
                  crane?.title || "Not specified"
                )}
              </p>
              <p className="sm:text-right">
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-block rounded px-2 py-1 text-sm ${getStatusBadgeClass(
                    initialStatus
                  )}`}
                >
                  {statusLabel}
                </span>
              </p>
            </div>
            <p>
              <strong>Period:</strong>{" "}
              {initialPeriod?.from && initialPeriod?.to
                ? `${formatDate(initialPeriod.from)} → ${formatDate(
                    initialPeriod.to
                  )}`
                : "Not specified"}
            </p>
            {address && (
              <p>
                <strong>Address:</strong> {address}
              </p>
            )}
            <p>
              <strong>Transportation needed:</strong>{" "}
              {needsTransport ? "Yes" : "No"}
            </p>
            <p>
              <strong>Installation/disassembly needed:</strong>{" "}
              {needsInstallation ? "Yes" : "No"}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full py-2 bg-green-600 text-white rounded transition hover:bg-green-700 sm:w-40"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDeleteClick}
              className="w-full py-2 bg-red-600 text-white rounded transition hover:bg-red-700 sm:w-40"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Edit Inquiry</h2>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block h-11 w-full border-gray-300 px-3 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-orange-200 focus:outline-none"
            >
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </label>

          <AvailabilityRange
            field="period"
            values={editPeriod}
            setValues={setEditPeriod}
            label="Period"
          />

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={cancelHandler}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded transition hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveHandler}
              className="px-4 py-2 bg-orange-600 text-white rounded transition hover:bg-orange-700"
            >
              Save
            </button>
          </div>
        </>
      )}

      {/* Confirmation Delete Modal */}
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Delete Inquiry?</h3>
        <p className="mb-6">
          Are you sure you want to permanently delete this inquiry?
        </p>
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            disabled={deleting}
            className="px-4 py-2 rounded border transition hover:bg-gray-100 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-4 py-2 rounded transition hover:bg-red-700 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default InquiryCard;

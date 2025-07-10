import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AvailabilityRange from "./AvailabilityRange";
import Modal from "./Modal";

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
  isRead,
  onUpdate,
  onDelete,
  onRead,
  onCloseModal,
  showDetailsOnly = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [editPeriod, setEditPeriod] = useState({
    periodStart: initialPeriod?.from?.slice(0, 10) || "",
    periodEnd: initialPeriod?.to?.slice(0, 10) || "",
  });

  // confirmation delete state
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setEditPeriod({
      periodStart: initialPeriod?.from?.slice(0, 10) || "",
      periodEnd: initialPeriod?.to?.slice(0, 10) || "",
    });
  }, [initialPeriod]);

  const saveHandler = () => {
    const requestBody = {
      status,
      period: {
        from: new Date(editPeriod.periodStart),
        to: new Date(editPeriod.periodEnd),
      },
    };
    onUpdate(inquiryId, requestBody);
    setIsEditing(false);
  };

  const cancelHandler = () => {
    setStatus(initialStatus);
    setEditPeriod({
      periodStart: initialPeriod?.from?.slice(0, 10) || "",
      periodEnd: initialPeriod?.to?.slice(0, 10) || "",
    });
    setIsEditing(false);
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // instead of immediate delete, open confirm
  const onDeleteClick = () => {
    setConfirmOpen(true);
  };

  // actual delete + close both modals
  const confirmDelete = () => {
    onDelete(inquiryId);
    setConfirmOpen(false);
    onCloseModal();
  };

  return (
    <>
      {showDetailsOnly && !isEditing ? (
        <>
          <h2 className="text-2xl uppercase font-semibold mb-5 text-center text-orange-600">
            Inquiry Details
          </h2>

          <div className="space-y-2 text-gray-700">
            <p className="text-lg text-center mb-3">{message}</p>
            <div className="flex justify-between items-center">
              <p>
                <strong>Customer:</strong> {customerName}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>
                <strong>Crane:</strong>{" "}
                <Link
                  to={`/cranes/${crane._id}`}
                  className="text-red-600 hover:underline"
                >
                  {crane.title}
                </Link>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    {
                      new: "bg-yellow-100 text-yellow-800",
                      in_progress: "bg-blue-100 text-blue-800",
                      resolved: "bg-green-100 text-green-800",
                    }[initialStatus] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {initialStatus.replace(/_/g, " ")}
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

          <div className="mt-10 flex justify-evenly space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="w-40 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
            >
              Edit
            </button>
            <button
              onClick={onDeleteClick}
              className="w-40 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
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
              className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={cancelHandler}
              className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={saveHandler}
              className="px-4 py-2 cursor-pointer bg-orange-600 text-white rounded hover:bg-orange-700"
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
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 rounded cursor-pointer border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default InquiryCard;

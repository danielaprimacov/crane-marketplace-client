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
  status: initialStatus,
  isRead,
  onUpdate,
  onDelete,
  onRead,
}) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [editPeriod, setEditPeriod] = useState({
    periodStart: initialPeriod?.from?.slice(0, 10) || "",
    periodEnd: initialPeriod?.to?.slice(0, 10) || "",
  });

  const model = [crane.producer, crane.seriesCode, crane.variantRevision]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setEditPeriod({
      periodStart: initialPeriod?.from?.slice(0, 10) || "",
      periodEnd: initialPeriod?.to?.slice(0, 10) || "",
    });
  }, [initialPeriod]);

  // mark read by admin when opening
  const openHandler = () => {
    if (!isRead) onRead(inquiryId);
    setOpen(true);
  };
  const closeHandler = () => setOpen(false);

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

  return (
    <>
      {/* TODO display style conditionaly (border of the inquiry card) based on
      if it was read by admin or not */}
      <div
        onClick={openHandler}
        className={`w-64 mb-4 p-5 bg-white/30 rounded-lg shadow cursor-pointer hover:shadow-md transition ${
          !isRead ? "border border-red-500" : "border border-green-500"
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {message}
        </h3>
        <div className="text-sm text-gray-600">
          <div>
            <strong>Customer:</strong> {customerName}
          </div>
          <div>
            <strong>Crane:</strong> {model}
          </div>
        </div>
      </div>

      <Modal isOpen={open} onClose={closeHandler}>
        <div className="p-6">
          {isEditing ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Edit Inquiry</h2>

              <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Status
                </span>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded shadow-sm
                             focus:border-blue-500 focus:ring focus:ring-blue-200"
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
          ) : (
            <>
              <h2 className="text-2xl uppercase font-semibold mb-5 text-center text-orange-600">
                Inquiry Details
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Message:</strong> {message}
                </p>
                <p>
                  <strong>Customer:</strong> {customerName}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
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

              <div className="mt-10 flex justify-evenly space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-40 py-2 bg-green-600 cursor-pointer text-white rounded hover:bg-green-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(inquiryId);
                    closeHandler();
                  }}
                  className="w-40 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default InquiryCard;

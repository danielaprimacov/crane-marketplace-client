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
      <div className="inquiry-summary" onClick={openHandler}>
        <h3>{message}</h3>
        <div>
          <span>Customer: </span>
          <span>{customerName}</span>
        </div>
        <div>
          <span>Crane: </span>
          <span>{crane.title}</span>
        </div>
      </div>

      {open && (
        <Modal onClose={closeHandler}>
          {isEditing ? (
            <>
              <label htmlFor="status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
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
              <div className="modal-actions">
                <button onClick={saveHandler}>Save</button>
                <button onClick={cancelHandler}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h2>Inquiry Details</h2>
              <span>{message}</span>
              <div>
                <span>Customer: </span>
                <span>{customerName}</span>
              </div>
              <div>
                <span>Email: </span>
                <span>{email}</span>
              </div>
              <div>
                <span>Crane: </span>
                <Link to={`/cranes/${crane._id}`}>{crane.title}</Link>
              </div>
              <div>
                <span>Period: </span>
                <span>
                  {initialPeriod?.from && initialPeriod?.to
                    ? `${formatDate(initialPeriod.from)} → ${formatDate(
                        initialPeriod.to
                      )}`
                    : "Not specified"}
                </span>
              </div>

              {address && (
                <div>
                  <span>Address: </span>
                  <span>{address}</span>
                </div>
              )}

              <div>
                <span>Status:</span>
                {/* TODO display the color of the status based on the value */}
                <span>{initialStatus.replace(/_/g, " ")}</span>
              </div>
              <div className="modal-actions">
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button
                  onClick={() => {
                    onDelete(inquiryId);
                    closeHandler();
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default InquiryCard;

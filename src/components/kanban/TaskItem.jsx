import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useContext, useState, useEffect } from "react";

import ArrowsOutIcon from "./icons/ArrowsOutIcon";
import DeleteIcon from "./icons/DeleteIcon";

import InquiryCard from "../cranes/InquiryCard";
import Modal from "../ui/Modal";
import KanbanContext from "./KanbanContext";

import {
  INQUIRY_STATUS_BORDER_COLORS,
  INQUIRY_STATUS_TEXT_COLORS,
} from "../../constants/inquiryStatus";

function TaskItem({ task }) {
  const { deleteTask, updateTask, markRead } = useContext(KanbanContext);
  const [showDetails, setShowDetails] = useState(false);

  // for confirm the delete action
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "TASK",
      item: {
        id: task.id,
        title: task.message,
        email: task.email,
        customerName: task.customerName,
        status: task.status,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const borderColor = INQUIRY_STATUS_BORDER_COLORS[task.status] || "#f8f9fa";
  const titleColor = INQUIRY_STATUS_TEXT_COLORS[task.status] || "#343a40";

  const openDeleteConfirm = (event) => {
    event.stopPropagation();
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleting) return;

    try {
      setDeleting(true);
      await deleteTask(task.id);
      setConfirmOpen(false);
      setShowDetails(false);
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    } finally {
      setDeleting(false);
    }
  };

  const openHandler = (event) => {
    event.stopPropagation();

    if (!task.isRead) {
      markRead(task.id);
    }

    setShowDetails(true);
  };

  const closeHandler = () => setShowDetails(false);

  const saveHandler = async (id, updatedFields) => {
    try {
      await updateTask(id, updatedFields);
      setShowDetails(false);
    } catch (error) {
      console.error("Failed to update inquiry:", error);
    }
  };

  return (
    <>
      <div
        ref={drag}
        className="mb-2.5 flex min-h-[112px] w-full touch-none select-none flex-col justify-center rounded-md p-3 active:cursor-grabbing"
        style={{
          opacity: isDragging ? 0 : 1,
          transform: isDragging ? "scale(0.98)" : "scale(1)",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          border: `1px solid ${borderColor}`,
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      >
        <h3
          className="mb-2 flex items-center justify-between gap-2 text-center"
          style={{ color: titleColor }}
        >
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md"
            aria-label="Open inquiry details"
            onClick={openHandler}
          >
            <ArrowsOutIcon className="transition duration-300 ease-out hover:stroke-[#f9572a]" />
          </button>

          <span className="truncate text-sm font-medium">
            {task.message || "No message"}
          </span>

          <button
            type="button"
            aria-label="Delete Inquiry"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md"
            onClick={openDeleteConfirm}
          >
            <DeleteIcon className="transition duration-300 ease-out hover:stroke-[#F72929]" />
          </button>
        </h3>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="truncate text-sm">
            {task.customerName || "Unknown customer"}
          </p>
          <p className="truncate text-xs text-gray-700">
            {task.email || "No email"}
          </p>
        </div>
      </div>

      <Modal isOpen={showDetails} onClose={closeHandler}>
        <InquiryCard
          key={task.id}
          id={task.id}
          customerName={task.customerName}
          email={task.email}
          message={task.message}
          crane={task.crane}
          period={task.period}
          address={task.address}
          needsTransport={task.needsTransport}
          needsInstallation={task.needsInstallation}
          status={task.status}
          isRead={task.isRead}
          onUpdate={saveHandler}
          onDelete={deleteTask}
          onRead={markRead}
          onCloseModal={closeHandler}
          showDetailsOnly
        />
      </Modal>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h3 className="mb-4 text-xl font-semibold">Delete Inquiry?</h3>
        <p className="mb-6">
          Are you sure you want to permanently delete this inquiry?
        </p>
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            className="rounded border px-4 py-2 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={confirmDelete}
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            {deleting ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default TaskItem;

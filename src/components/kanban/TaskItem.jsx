import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import axios from "axios";

import ArrowsOutIcon from "./Icons/ArrowsOutIcon";
import DeleteIcon from "./Icons/DeleteIcon";

import InquiryCard from "../InquiryCard";
import Modal from "../Modal";
import KanbanContext from "./KanbanContext";

const API_URL = "http://localhost:5005";

function TaskItem({ task }) {
  const { deleteTask, updateTask, moveTask, markRead } =
    useContext(KanbanContext);
  const [showDetails, setShowDetails] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TASK",
      item: {
        id: task.id,
        message: task.message,
        email: task.email,
        priority: task.status,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task]
  );

  const statusBorderMap = {
    new: "#98DC9A",
    in_progress: "#FF975B",
    resolved: "#FF754F",
  };

  const statusTextMap = {
    new: "#1B5E20",
    in_progress: "#BF360C",
    resolved: "#B71C1C",
  };

  const borderColor = statusBorderMap[task.status] || "#f8f9fa";
  const titleColor = statusTextMap[task.status] || "#343a40";

  const deleteHandler = async () => {
    try {
      await axios.delete(`${API_URL}/inquiries/${task.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      deleteTask(task.id);
      setShowDetails(false);
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
      alert("Could not delete. Please try again.");
    }
  };

  const openHandler = (e) => {
    e.stopPropagation();
    if (!task.isRead) markRead(task.id);
    setShowDetails(true);
  };

  const closeHandler = () => setShowDetails(false);

  const saveHandler = (id, updatedFields) => {
    updateTask(id, updatedFields);
    setShowDetails(false);
  };

  return (
    <>
      <div
        className="w-88 h-24 cursor-pointer rounded-md p-2.5 mb-2.5 flex flex-col justify-center"
        key={task.id}
        onClick={openHandler}
        ref={drag}
        style={{
          opacity: isDragging ? 0 : 1,
          cursor: "pointer",
          transform: isDragging ? "scale(0.7)" : "scale(1)",
          transition: "transform 0.5s ease, opacity 0.5s ease",
          pointerEvents: isDragging ? "none" : "auto",
          border: `1px solid ${borderColor}`,
        }}
      >
        <h3
          className={`mb-2 flex justify-between items-center ${
            {
              new: "gradient-low",
              in_progress: "gradient-medium",
              resolved: "gradient-high",
            }[task.status] || ""
          }`}
          style={{ color: titleColor }}
        >
          <div className="cursor-pointer" onClick={openHandler}>
            <ArrowsOutIcon className="transition duration-300 ease-out hover:stroke-[#f9572a]" />
          </div>
          {task.message}
          <div className="cursor-pointer" onClick={deleteHandler}>
            <DeleteIcon className="transition duration-300 ease-out hover:stroke-[#F72929]" />
          </div>
        </h3>
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm">{task.customerName}</p>
          <p className="text-xs text-gray-700">{task.email}</p>
        </div>
      </div>
      <Modal isOpen={showDetails} onClose={closeHandler}>
        <InquiryCard
          key={task.id}
          _id={task.id}
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
          onDelete={deleteHandler}
          onRead={markRead}
          onCloseModal={closeHandler}
          showDetailsOnly
        />
      </Modal>
    </>
  );
}

export default TaskItem;

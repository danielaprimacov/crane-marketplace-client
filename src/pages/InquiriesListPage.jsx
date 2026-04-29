import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";

import { getDndConfig } from "../utils/getDndConfig";

import KanbanProvider from "../components/kanban/KanbanProvider";
import Columns from "../components/kanban/Columns";
import DragLayer from "../components/kanban/DragLayer";

const API_URL = import.meta.env.VITE_API_URL;

function InquiriesListPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dndConfig = useMemo(() => getDndConfig(), []);

  const getAllInquiries = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("Missing auth token.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setInquiries(response.data);
    } catch (error) {
      console.log("Failed to fetch inquiries", error);
      setError("Failed to load inquiries!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllInquiries();
  }, []);

  const handleUpdate = async (id, updatedFields) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Missing auth token.");
    const { data: updated } = await axios.put(
      `${API_URL}/inquiries/${id}`,
      updatedFields,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setInquiries((prev) =>
      prev.map((iq) => (iq._id === id ? { ...iq, ...updated } : iq))
    );

    return updated;
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Missing auth token.");

    await axios.delete(`${API_URL}/inquiries/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setInquiries((prev) => prev.filter((iq) => iq._id !== id));
  };

  const handleRead = async (id) => {
    // mark as read only if not already
    const inquiry = inquiries.find((iq) => iq._id === id);
    if (!inquiry || inquiry.isRead) return;

    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Missing auth token.");
    await axios.put(
      `${API_URL}/inquiries/${id}`,
      { isRead: true },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setInquiries((prev) =>
      prev.map((iq) => (iq._id === id ? { ...iq, isRead: true } : iq))
    );
  };

  if (loading) {
    return <div className="py-8 text-gray-600">Loading inquiries...</div>;
  }

  if (error) {
    return <div className="py-8 text-red-600">{error}</div>;
  }

  return (
    <DndProvider backend={dndConfig.backend} options={dndConfig.options}>
      <KanbanProvider
        initialTasks={inquiries}
        onMoveTask={handleUpdate}
        onDeleteTask={handleDelete}
        onUpdateTask={handleUpdate}
        onRead={handleRead}
      >
        <div>
          <Columns />
          <DragLayer />
        </div>
      </KanbanProvider>
    </DndProvider>
  );
}

export default InquiriesListPage;

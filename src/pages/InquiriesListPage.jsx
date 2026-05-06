import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";

import { getDndConfig } from "../utils/getDndConfig";

import KanbanProvider from "../components/kanban/KanbanProvider";
import Columns from "../components/kanban/Columns";
import DragLayer from "../components/kanban/DragLayer";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

const API_URL = import.meta.env.VITE_API_URL;

function InquiriesListPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dndConfig = useMemo(() => getDndConfig(), []);

  const getAllInquiries = useCallback(async (signal) => {
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
        signal,
      });

      const safeInquiries = Array.isArray(response.data) ? response.data : [];

      setInquiries(safeInquiries);
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;

      console.error("Failed to fetch inquiries:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load inquiries. Please try again."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    getAllInquiries(controller.signal);

    return () => {
      controller.abort();
    };
  }, [getAllInquiries]);

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
    return (
      <LoadingState
        title="Loading inquiries..."
        message="We are loading incoming requests."
        fullPage
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load inquiries"
        message={error}
        onRetry={() => getAllInquiries()}
        actionLabel="Reload inquiries"
        fullPage
      />
    );
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

import { useState, useEffect, useMemo, useCallback } from "react";
import { DndProvider } from "react-dnd";

import { getDndConfig } from "../utils/getDndConfig";
import { inquiryApi } from "../services/inquiriApi";

import KanbanProvider from "../components/kanban/KanbanProvider";
import Columns from "../components/kanban/Columns";
import DragLayer from "../components/kanban/DragLayer";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

function getInquiryId(inquiry) {
  return inquiry?.id || inquiry?._id || null;
}

function InquiriesListPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dndConfig = useMemo(() => getDndConfig(), []);

  const getAllInquiries = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await inquiryApi.getAllAdmin({ signal });

      const safeInquiries = Array.isArray(data) ? data : [];

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
    const updatedInquiry = await inquiryApi.updateAdmin(id, updatedFields);

    setInquiries((prev) =>
      prev.map((inquiry) => {
        const inquiryId = getInquiryId(inquiry);

        if (inquiryId !== id) {
          return inquiry;
        }

        return {
          ...inquiry,
          ...updatedInquiry,
        };
      })
    );

    return updatedInquiry;
  };
  const handleDelete = async (id) => {
    await inquiryApi.deleteAdmin(id);

    setInquiries((prev) =>
      prev.filter((inquiry) => getInquiryId(inquiry) !== id)
    );
  };

  const handleRead = async (id) => {
    const inquiry = inquiries.find((item) => getInquiryId(item) === id);

    if (!inquiry || inquiry.isRead) return;

    await inquiryApi.updateAdmin(id, {
      isRead: true,
    });

    setInquiries((prev) =>
      prev.map((item) =>
        getInquiryId(item) === id ? { ...item, isRead: true } : item
      )
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

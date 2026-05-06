import { useState, useEffect, useMemo } from "react";
import axios from "axios";

import Modal from "../components/ui/Modal";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";

import DeleteIcon from "../components/kanban/Icons/DeleteIcon";

const API_URL = import.meta.env.VITE_API_URL;

const FILTERS = [
  { value: "all", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "expert", label: "Expert" },
  { value: "newsletter", label: "Newsletter" },
];

function formatDate(value) {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString();
}

function sortNewestFirst(messages) {
  return [...messages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("You are not authorized to view messages.");
          return;
        }

        const { data } = await axios.get(`${API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const safeMessages = Array.isArray(data) ? data : [];

        setMessages(sortNewestFirst(safeMessages));
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;

        console.error("Failed to load messages:", err);
        setError("Failed to load messages.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredMessages = useMemo(() => {
    if (filter === "all") return messages;

    return messages.filter((message) => message.formType === filter);
  }, [messages, filter]);

  const handleDeleteClick = (id) => {
    if (!id) return;

    setDeleteError("");
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setConfirmOpen(false);
    setToDeleteId(null);
    setDeleteError("");
  };

  const confirmDelete = async () => {
    if (!toDeleteId || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setDeleteError("You are not authorized to delete messages.");
        return;
      }

      await axios.delete(`${API_URL}/messages/${toDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m._id !== toDeleteId));

      setConfirmOpen(false);
      setToDeleteId(null);
    } catch (err) {
      console.error("Failed to delete:", err);

      setDeleteError(
        err?.response?.data?.message ||
          "Could not delete message. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <LoadingState
        type="default"
        title="Loading messages..."
        message="We are loading your admin messages."
        fullPage
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Could not load messages"
        message={error}
        onRetry={() => window.location.reload()}
        actionLabel="Reload page"
        fullPage
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-600">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            Messages
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review contact and expert request messages.
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {filteredMessages.length} of {messages.length} shown
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const isActive = filter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <article
              key={message._id}
              className="rounded-xl border border-red-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {message.formType || "unknown"}
                    </span>

                    <time className="text-xs text-gray-500">
                      {formatDate(message.createdAt)}
                    </time>
                  </div>

                  <p className="mt-2 break-words text-sm font-medium text-gray-900">
                    {message.email || "No email provided"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteClick(message._id)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700"
                  aria-label="Delete message"
                >
                  <DeleteIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                {message.formType === "contact" ? (
                  <>
                    <p>
                      <span className="font-semibold text-gray-900">
                        {[
                          message.salutation,
                          message.firstName,
                          message.lastName,
                        ]
                          .filter(Boolean)
                          .join(" ") || "Unknown contact"}
                      </span>
                      {message.country ? ` from ${message.country}` : ""}
                    </p>

                    {message.phone && <p>{message.phone}</p>}

                    <p className="whitespace-pre-line break-words">
                      {message.message || "No message text provided."}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold text-gray-900">
                        {message.name || "Unknown person"}
                      </span>
                      {message.company ? ` at ${message.company}` : ""}
                    </p>

                    {message.phone && <p>{message.phone}</p>}

                    <p className="whitespace-pre-line break-words">
                      {message.projectDetails ||
                        message.message ||
                        "No project details provided."}
                    </p>
                  </>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No messages to display.
          </div>
        )}
      </div>

      <Modal isOpen={confirmOpen} onClose={closeDeleteModal}>
        <div className="w-full max-w-md">
          <h3 className="mb-3 text-xl font-semibold text-gray-900">
            Delete message?
          </h3>

          <p className="mb-6 text-sm text-gray-600">
            Are you sure you want to permanently delete this message?
          </p>

          {deleteError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {deleteError}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={deleting}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default MessagesPage;

import { useState, useEffect, useMemo, useCallback } from "react";

import Modal from "../components/ui/Modal";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import DeleteIcon from "../components/kanban/Icons/DeleteIcon";

import { messageApi } from "../services/messageApi";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "contact", label: "Contact" },
  { value: "expert", label: "Expert" },
  { value: "newsletter", label: "Newsletter" },
];

function getMessageId(message) {
  return message?.id || message?._id || null;
}

function formatDate(value) {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString();
}

function sortNewestFirst(messages) {
  return [...messages].sort((a, b) => {
    const dateA = new Date(a?.createdAt || 0).getTime();
    const dateB = new Date(b?.createdAt || 0).getTime();

    return dateB - dateA;
  });
}

function getContactName(message) {
  return (
    [message.salutation, message.firstName, message.lastName]
      .filter(Boolean)
      .join(" ") || "Unknown contact"
  );
}

function MessageContent({ message }) {
  if (message.formType === "contact") {
    return (
      <>
        <p>
          <span className="font-semibold text-gray-900">
            {getContactName(message)}
          </span>
          {message.country ? ` from ${message.country}` : ""}
        </p>

        {message.phone && <p>{message.phone}</p>}

        <p className="whitespace-pre-line break-words">
          {message.message || "No message text provided."}
        </p>
      </>
    );
  }

  if (message.formType === "expert") {
    return (
      <>
        <p>
          <span className="font-semibold text-gray-900">
            {message.name || "Unknown person"}
          </span>
          {message.company ? ` at ${message.company}` : ""}
        </p>

        {message.phone && <p>{message.phone}</p>}

        <p className="whitespace-pre-line break-words">
          {message.projectDetails || "No project details provided."}
        </p>
      </>
    );
  }

  if (message.formType === "newsletter") {
    return (
      <>
        <p>
          <span className="font-semibold text-gray-900">
            {[message.firstName, message.lastName].filter(Boolean).join(" ") ||
              "Unknown subscriber"}
          </span>
        </p>

        {message.phone && <p>{message.phone}</p>}

        {Array.isArray(message.topics) && message.topics.length > 0 && (
          <p>
            <span className="font-semibold text-gray-900">Topics:</span>{" "}
            {message.topics.join(", ")}
          </p>
        )}

        <p>
          Communication consent: {message.agreeComm ? "Yes" : "No"}
          <br />
          Newsletter consent: {message.agreeNewsletter ? "Yes" : "No"}
        </p>
      </>
    );
  }

  return (
    <p className="whitespace-pre-line break-words">
      {message.message || message.projectDetails || "No message content."}
    </p>
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

  const fetchMessages = useCallback(async (signal) => {
    try {
      setLoading(true);
      setError("");

      const data = await messageApi.getAllAdmin({ signal });
      const safeMessages = Array.isArray(data) ? data : [];

      setMessages(sortNewestFirst(safeMessages));
    } catch (error) {
      if (error.code === "ERR_CANCELED") return;

      console.error("Failed to load messages:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load messages."
      );

      setMessages([]);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchMessages(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchMessages]);

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

    try {
      setDeleting(true);
      setDeleteError("");

      await messageApi.deleteAdmin(toDeleteId);

      setMessages((prev) =>
        prev.filter((message) => getMessageId(message) !== toDeleteId)
      );

      setConfirmOpen(false);
      setToDeleteId(null);
    } catch (error) {
      console.error("Failed to delete message:", error);

      setDeleteError(
        error?.response?.data?.message ||
          error?.message ||
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
        onRetry={() => fetchMessages()}
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
            Review contact, expert, and newsletter messages.
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
          filteredMessages.map((message) => {
            const messageId = getMessageId(message);

            if (!messageId) return null;

            return (
              <article
                key={messageId}
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
                    onClick={() => handleDeleteClick(messageId)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    aria-label="Delete message"
                  >
                    <DeleteIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <MessageContent message={message} />
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No messages to display.
          </div>
        )}
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={closeDeleteModal}
        ariaLabel="Delete message confirmation"
      >
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

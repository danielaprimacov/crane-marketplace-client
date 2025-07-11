import { useState, useEffect } from "react";
import axios from "axios";

import Modal from "../components/Modal";
import DeleteIcon from "../components/kanban/Icons/DeleteIcon";

const API_URL = import.meta.env.VITE_API_URL;

function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("authToken");
        const { data } = await axios.get(`${API_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // sort newest first
        setMessages(
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (err) {
        console.error(err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${API_URL}/messages/${toDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((m) => m._id !== toDeleteId));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Could not delete message. Please try again.");
    } finally {
      setConfirmOpen(false);
      setToDeleteId(null);
    }
  };

  const filtered = messages.filter((msg) =>
    filter === "all" ? true : msg.formType === filter
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-4">
        {["all", "contact", "expert"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`
              px-4 py-2 rounded  cursor-pointer
              ${
                filter === type
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }
              transition
            `}
          >
            {type === "all" ? "All" : type === "contact" ? "Contact" : "Expert"}
          </button>
        ))}
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading messages…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Message List */}
      {!loading && !error && (
        <ul className="space-y-4 max-h-[60vh] overflow-auto">
          {filtered.map((msg) => (
            <li
              key={msg._id}
              className="p-4 border border-red-600 rounded hover:shadow transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="uppercase text-xs font-semibold bg-gray-200 px-2 py-1 rounded">
                    {msg.formType}
                  </span>
                  <p className="mt-1 text-sm text-gray-600">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-800">{msg.email}</p>
                  <DeleteIcon
                    onClick={() => handleDeleteClick(msg._id)}
                    className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="mt-3 space-y-1 text-sm">
                {msg.formType === "contact" ? (
                  <>
                    <p>
                      <strong>
                        {msg.salutation} {msg.firstName} {msg.lastName}
                      </strong>{" "}
                      from {msg.country}
                    </p>
                    <p>{msg.phone}</p>
                    <p className="whitespace-pre-line">{msg.message}</p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>{msg.name}</strong> at {msg.company}
                    </p>
                    <p>{msg.phone}</p>
                    <p className="whitespace-pre-line">{msg.projectDetails}</p>
                  </>
                )}
              </div>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="text-center text-gray-500 py-4">
              No messages to display.
            </li>
          )}
        </ul>
      )}
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h3 className="text-xl font-semibold mb-4">Delete Message?</h3>
        <p className="mb-6">
          Are you sure you want to permanently delete this message?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 rounded border cursor-pointer hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-red-700 transition"
          >
            Yes, delete
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default MessagesPage;

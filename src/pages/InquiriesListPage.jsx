import { useState, useEffect } from "react";
import axios from "axios";
import InquiryCard from "../components/InquiryCard";

const API_URL = "http://localhost:5005";

function InquiriesListPage() {
  const [inquiries, setInquiries] = useState([]);

  const getAllInquiries = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(`${API_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setInquiries(response.data);
    } catch (error) {
      console.log("Failed to fetch inquiries", error);
    }
  };

  useEffect(() => {
    getAllInquiries();
  }, []);

  const handleUpdate = async (id, updatedFields) => {
    const token = localStorage.getItem("authToken");
    try {
      const { data: updated } = await axios.put(
        `${API_URL}/inquiries/${id}`,
        updatedFields,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInquiries((prev) =>
        prev.map((iq) =>
          iq._id === id
            ? {
                ...iq,
                status: updated.status,
                period: updated.period,
                isRead: updated.isRead ?? iq.isRead,
              }
            : iq
        )
      );
    } catch (error) {
      console.error("Update failed", error);
      alert("Could not update. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInquiries((prev) => prev.filter((iq) => iq._id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  const handleRead = async (id) => {
    // mark as read only if not already
    const inquiry = inquiries.find((iq) => iq._id === id);
    if (inquiry.isRead) return;

    const token = localStorage.getItem("authToken");
    try {
      await axios.put(
        `${API_URL}/inquiries/${id}`,
        { isRead: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInquiries((prev) =>
        prev.map((iq) => (iq._id === id ? { ...iq, isRead: true } : iq))
      );
    } catch (error) {
      console.error("Could not mark read", error);
    }
  };

  return (
    <div>
      {inquiries.map((inquiry) => (
        <InquiryCard
          key={inquiry._id}
          {...inquiry}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onRead={handleRead}
        />
      ))}
    </div>
  );
}

export default InquiriesListPage;

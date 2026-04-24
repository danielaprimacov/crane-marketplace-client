import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AddInquiryForm from "../components/forms/inquiry/AddInquiryForm";

const API_URL = import.meta.env.VITE_API_URL;

function NewInquiryPage() {
  const { craneId } = useParams();

  const [crane, setCrane] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCrane = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/cranes/${craneId}`);
        setCrane(data);
      } catch (err) {
        console.error("Could not load crane details:", err);
        setError("Could not load crane details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCrane();
  }, [craneId]);

  if (loading) {
    return (
      <div className="mt-20 mx-auto max-w-2xl px-4">
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 mx-auto max-w-2xl px-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4">
      <h1 className="text-2xl uppercase mx-auto mb-5 border-b pb-3 border-b-red-600 max-w-2xl text-center">
        Send Inquiry
      </h1>
      <AddInquiryForm craneId={craneId} crane={crane} />
    </div>
  );
}

export default NewInquiryPage;

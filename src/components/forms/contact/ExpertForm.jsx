import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function ExpertForm({ onClose }) {
  const initialState = {
    name: "",
    company: "",
    email: "",
    phone: "",
    projectDetails: "",
  };

  const [form, setForm] = useState(initialState);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_URL}/messages`, {
        formType: "expert",
        ...form,
      });

      setSuccess("✅ Your request has been sent!");
      setForm(initialState);
      // auto-close after 2 seconds
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error("Failed to send expert request:", err);
      setError(
        err.response?.data?.message ||
          "There was an error. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl mx-auto mt-4 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center tracking-widest">
        Expert Advice
      </h2>

      {/* success / error messages */}
      {success && <p className="text-green-600 text-center">{success}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Name */}
      <div className="relative mb-8">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6">
          Name *
        </label>
      </div>

      {/* Company */}
      <div className="relative mb-8">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6">
          Company
        </label>
      </div>

      {/* Email */}
      <div className="relative mb-8">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6">
          Email *
        </label>
      </div>

      {/* Phone */}
      <div className="relative mb-8">
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6">
          Phone
        </label>
      </div>

      {/* Project Details */}
      <div className="relative mb-8">
        <textarea
          name="projectDetails"
          rows={3}
          value={form.projectDetails}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6">
          Project details *
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="px-4 py-2 cursor-pointer rounded border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white cursor-pointer py-2 px-4 rounded uppercase hover:bg-orange-600 transition"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default ExpertForm;

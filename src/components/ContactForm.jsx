import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ContactForm({ onClose }) {
  const initialState = {
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
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
      // send to backend
      await axios.post(`${API_URL}/messages`, {
        formType: "contact",
        ...form,
      });

      // on success, close the modal
      setSuccess("✅ Your message was sent successfully!");
      setForm(initialState);
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(
        err.response?.data?.message ||
          "There was an error submitting the form. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      {/* show success */}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}
      {/* show error if any */}
      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
      {/* Salutation */}
      <div className="relative">
        <select
          name="salutation"
          value={form.salutation}
          onChange={handleChange}
          required
          placeholder=" "
          className="
            peer block w-full h-10 bg-transparent
            border-b border-b-black/20 mb-8
            focus:outline-none focus:border-black
            transition
          "
        >
          <option value="">Salutation *</option>
          <option>Mr.</option>
          <option>Ms.</option>
          <option>Dr.</option>
        </select>
        <label
          htmlFor="salutation"
          className="
            absolute left-0 -top-6 text-sm text-gray-500
            transition-all duration-300
            peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
            peer-focus:-top-6 peer-focus:text-sm
          "
        >
          Salutation *
        </label>
      </div>

      {/* First / Last Name */}
      <div className="flex gap-6">
        {["firstName", "lastName"].map((field, idx) => (
          <div key={field} className="relative flex-1">
            <input
              name={field}
              type="text"
              value={form[field]}
              onChange={handleChange}
              required
              placeholder=" "
              className="
                peer block w-full h-10 bg-transparent
                border-b border-b-black/20 mb-8
                focus:outline-none focus:border-black
                transition
              "
            />
            <label
              htmlFor={field}
              className={`
                absolute left-0 -top-6 text-sm text-gray-500
                transition-all duration-300
                peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
                peer-focus:-top-6 peer-focus:text-sm
              `}
            >
              {field === "firstName" ? "First name *" : "Last name *"}
            </label>
          </div>
        ))}
      </div>

      {/* Email */}
      <div className="relative">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder=" "
          className="
            peer block w-full h-10 bg-transparent
            border-b border-b-black/20 mb-8
            focus:outline-none focus:border-black
            transition
          "
        />
        <label
          htmlFor="email"
          className="
            absolute left-0 -top-6 text-sm text-gray-500
            transition-all duration-300
            peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
            peer-focus:-top-6 peer-focus:text-sm
          "
        >
          Mail *
        </label>
      </div>

      {/* Country */}
      <div className="relative">
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
          placeholder=" "
          className="
            peer block w-full h-10 bg-transparent
            border-b border-b-black/20 mb-8
            focus:outline-none focus:border-black
            transition
          "
        >
          <option value="">Country *</option>
          <option>USA</option>
          <option>Germany</option>
          <option>Poland</option>
        </select>
        <label
          htmlFor="country"
          className="
            absolute left-0 -top-6 text-sm text-gray-500
            transition-all duration-300
            peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
            peer-focus:-top-6 peer-focus:text-sm
          "
        >
          Country *
        </label>
      </div>

      {/* Phone */}
      <div className="relative">
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder=" "
          className="
            peer block w-full h-10 bg-transparent
            border-b border-b-black/20 mb-8
            focus:outline-none focus:border-black
            transition
          "
        />
        <label
          htmlFor="phone"
          className="
            absolute left-0 -top-6 text-sm text-gray-500
            transition-all duration-300
            peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
            peer-focus:-top-6 peer-focus:text-sm
          "
        >
          Phone
        </label>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          required
          placeholder=" "
          className="
            peer block w-full bg-transparent
            border-b border-b-black/20 mb-8
            focus:outline-none focus:border-black
            transition
          "
        />
        <label
          htmlFor="message"
          className="
            absolute left-0 -top-6 text-sm text-gray-500
            transition-all duration-300
            peer-placeholder-shown:top-0 peer-placeholder-shown:text-base
            peer-focus:-top-6 peer-focus:text-sm
          "
        >
          Message *
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="
            px-4 py-2 rounded border cursor-pointer
            hover:bg-gray-100 transition
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="
            bg-black text-white py-2 px-4 rounded cursor-pointer
            uppercase hover:bg-orange-600 transition
          "
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

import { useState } from "react";

function ContactForm({ onClose }) {
  const [form, setForm] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send to your API
    console.log("submit", form);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

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
          className="
            px-4 py-2 rounded border cursor-pointer
            hover:bg-gray-100 transition
          "
        >
          Cancel
        </button>
        <button
          type="submit"
          className="
            bg-black text-white py-2 px-4 rounded cursor-pointer
            uppercase hover:bg-orange-600 transition
          "
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default ContactForm;

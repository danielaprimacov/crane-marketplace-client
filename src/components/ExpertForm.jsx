import { useState } from "react";

function ExpertForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectDetails: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send data to your API
    console.log("Expert advice request:", form);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-2xl mx-auto mt-4 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center tracking-widest">
        Expert Advice
      </h2>

      {/* Name */}
      <div className="relative">
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
      <div className="relative">
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
      <div className="relative">
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
      <div className="relative">
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
      <div className="relative">
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
          className="px-4 py-2 cursor-pointer rounded border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black text-white cursor-pointer py-2 px-4 rounded uppercase hover:bg-orange-600 transition"
        >
          Send
        </button>
      </div>
    </form>
  );
}

export default ExpertForm;

function InquiryContactFields({ form, updateField }) {
  return (
    <>
      <div className="relative mb-8">
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={form.customerName}
          onChange={(event) => updateField("customerName", event.target.value)}
          required
          minLength={2}
          placeholder=" "
          className="peer block h-10 w-full border-b border-b-black/20 bg-transparent transition focus:border-black focus:outline-none"
        />
        <label
          htmlFor="customerName"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Your Name
        </label>
      </div>

      <div className="relative mb-8">
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          placeholder=" "
          className="peer block h-10 w-full border-b border-b-black/20 bg-transparent transition focus:border-black focus:outline-none"
        />
        <label
          htmlFor="email"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Email Address
        </label>
      </div>

      <div className="relative mb-5">
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          minLength={5}
          rows={3}
          placeholder=" "
          className="peer block w-full resize-none border-b border-b-black/20 bg-transparent transition focus:border-black focus:outline-none"
        />
        <label
          htmlFor="message"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Message
        </label>
      </div>
    </>
  );
}

export default InquiryContactFields;

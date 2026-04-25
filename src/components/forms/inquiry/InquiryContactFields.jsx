function InquiryContactFields({ form, updateField }) {
  return (
    <>
      <div className="relative mb-8 pt-4">
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
          className={`absolute left-0 transition-all duration-200 ${
            form.customerName
              ? "-top-1 text-sm text-gray-500"
              : "top-6 text-base text-gray-500"
          } peer-focus:-top-1 peerfocus:text-sm`}
        >
          Your Name
        </label>
      </div>

      <div className="relative mb-8 pt-4">
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
          className={`absolute left-0 transition-all duration-200 ${
            form.email
              ? "-top-1 text-sm text-gray-500"
              : "top-6 text-base text-gray-500"
          } peer-focus:-top-1 peerfocus:text-sm`}
        >
          Email Address
        </label>
      </div>

      <div className="relative mb-5 pt-4">
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
          className={`absolute left-0 transition-all duration-200 ${
            form.message
              ? "-top-1 text-sm text-gray-500"
              : "top-6 text-base text-gray-500"
          } peer-focus:-top-1 peerfocus:text-sm`}
        >
          Message
        </label>
      </div>
    </>
  );
}

export default InquiryContactFields;

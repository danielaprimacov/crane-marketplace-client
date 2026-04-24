function InquiryAddressField({ address, updateField, required = false }) {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(event) => updateField("address", event.target.value)}
        required={required}
        placeholder=" "
        className="peer block h-10 w-full border-b border-b-black/20 bg-transparent transition focus:border-black focus:outline-none"
      />
      <label
        htmlFor="address"
        className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
      >
        Address
      </label>
    </div>
  );
}

export default InquiryAddressField;

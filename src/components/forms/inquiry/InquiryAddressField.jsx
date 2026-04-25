function InquiryAddressField({ address, updateField, required = false }) {
  return (
    <div className="relative mb-8 pt-4">
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
        className={`absolute left-0 transition-all duration-200 ${
          address
            ? "-top-1 text-sm text-gray-500"
            : "top-6 text-base text-gray-500"
        } peer-focus:-top-1 peerfocus:text-sm`}
      >
        Address
      </label>
    </div>
  );
}

export default InquiryAddressField;

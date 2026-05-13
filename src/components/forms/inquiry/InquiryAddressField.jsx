import { FloatingInput } from "../../ui/form/FloatingFields";

function InquiryAddressField({ address = "", updateField, required = false }) {
  return (
    <div className="mb-8 pt-4">
      <FloatingInput
        id="address"
        name="address"
        type="text"
        label="Address"
        value={address}
        onChange={(event) => updateField("address", event.target.value)}
        required={required}
        maxLength={500}
      />
    </div>
  );
}

export default InquiryAddressField;

import { FloatingInput, FloatingTextarea } from "../../ui/form/FloatingFields";

function InquiryContactFields({ form, updateField }) {
  return (
    <>
      <div className="mb-8 pt-4">
        <FloatingInput
          id="customerName"
          name="customerName"
          type="text"
          label="Your Name"
          value={form.customerName || ""}
          onChange={(event) => updateField("customerName", event.target.value)}
          required
          minLength={2}
          maxLength={100}
          autoComplete="name"
        />
      </div>

      <div className="mb-8 pt-4">
        <FloatingInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={form.email || ""}
          onChange={(event) => updateField("email", event.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div className="mb-5 pt-4">
        <FloatingTextarea
          id="message"
          name="message"
          label="Message"
          value={form.message || ""}
          onChange={(event) => updateField("message", event.target.value)}
          required
          minLength={5}
          maxLength={3000}
          rows={3}
          textareaClassName="resize-none"
        />
      </div>
    </>
  );
}

export default InquiryContactFields;

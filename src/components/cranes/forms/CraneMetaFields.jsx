import { ChevronDown } from "lucide-react";

import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../ui/form/FloatingFields";

const STATUS_OPTIONS = [
  { value: "for sale", label: "For Sale" },
  { value: "for rent", label: "For Rent" },
];

function CraneMetaFields({ form, updateField }) {
  return (
    <>
      <div className="relative mb-8">
        <FloatingTextarea
          id="description"
          name="description"
          label="Description"
          value={form.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          maxLength={5000}
        />
      </div>

      <div className="relative mb-8">
        <FloatingInput
          id="location"
          name="location"
          label="Location"
          value={form.location || ""}
          onChange={(e) => updateField("location", e.target.value)}
          required
          maxLength={255}
        />
      </div>

      <div className="relative mb-8">
        <FloatingSelect
          id="status"
          name="status"
          label="Status"
          value={form.status || ""}
          onChange={(e) => updateField("status", e.target.value)}
          options={STATUS_OPTIONS}
          placeholder="-- Select Status --"
          required
        />
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
    </>
  );
}

export default CraneMetaFields;

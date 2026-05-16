import { ChevronDown } from "lucide-react";

import { FloatingInput, FloatingSelect } from "../../ui/form/FloatingFields";

const RENT_INTERVAL_OPTIONS = [
  { value: "hour", label: "Hour" },
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

function CranePricingFields({ form, updateField }) {
  if (form.status === "for sale") {
    return (
      <div className="relative mb-8">
        <FloatingInput
          id="salePrice"
          name="salePrice"
          type="number"
          label="Sale Price (€)"
          value={form.salePrice || ""}
          onChange={(e) => updateField("salePrice", e.target.value)}
          required
          inputClassName="h-11"
        />
      </div>
    );
  }

  if (form.status === "for rent") {
    return (
      <>
        <div className="relative mb-8">
          <FloatingInput
            id="rentAmount"
            name="rentAmount"
            type="number"
            label="Rent Amount (€)"
            value={form.rentAmount || ""}
            onChange={(e) => updateField("rentAmount", e.target.value)}
            required
            inputClassName="h-11"
          />
        </div>

        <div className="relative mb-8">
          <FloatingSelect
            id="rentInterval"
            name="rentInterval"
            label="Interval"
            value={form.rentInterval || "day"}
            onChange={(e) => updateField("rentInterval", e.target.value)}
            options={RENT_INTERVAL_OPTIONS}
            placeholder="-- Interval --"
            required
            selectClassName="h-11"
          />
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-500">
            <ChevronDown className="h-4 w-4" />
          </span>
        </div>
      </>
    );
  }
}

export default CranePricingFields;

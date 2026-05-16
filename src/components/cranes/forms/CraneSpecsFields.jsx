import { FloatingInput } from "../../ui/form/FloatingFields";

function CraneSpecsFields({ form, updateField }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
        <FloatingInput
          id="producer"
          name="producer"
          type="text"
          label="Producer"
          value={form.producer ?? ""}
          onChange={(e) => updateField("producer", e.target.value)}
          required
          maxLength={100}
          inputClassName="h-10"
        />
        <FloatingInput
          id="seriesCode"
          name="seriesCode"
          type="text"
          label="Series Code"
          value={form.seriesCode ?? ""}
          onChange={(e) => updateField("seriesCode", e.target.value)}
          required
          maxLength={100}
          inputClassName="h-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
        <FloatingInput
          id="capacityClassNumber"
          name="capacityClassNumber"
          type="number"
          label="Class Capacity (t)"
          value={form.capacityClassNumber ?? ""}
          onChange={(e) => updateField("capacityClassNumber", e.target.value)}
          required
          min={0}
          inputClassName="h-10"
        />

        <FloatingInput
          id="capacity"
          name="capacity"
          type="number"
          label="Max Capacity (t)"
          value={form.capacity ?? ""}
          onChange={(e) => updateField("capacity", e.target.value)}
          min={0}
          step="0.1"
          inputClassName="h-10"
        />
      </div>

      <div className="relative mb-8">
        <FloatingInput
          id="height"
          name="height"
          type="number"
          label="Max Height (m)"
          value={form.height ?? ""}
          onChange={(e) => updateField("height", e.target.value)}
          required
          min={0}
          step="0.1"
          inputClassName="h-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
        <FloatingInput
          id="variantRevision"
          name="variantRevision"
          type="text"
          label="Variant / Revision"
          value={form.variantRevision ?? ""}
          onChange={(e) => updateField("variantRevision", e.target.value)}
          maxLength={100}
          inputClassName="h-10"
        />

        <FloatingInput
          id="radius"
          name="radius"
          type="number"
          label="Max Radius (m)"
          value={form.radius ?? ""}
          onChange={(e) => updateField("radius", e.target.value)}
          required
          min={0}
          step="0.1"
          inputClassName="h-10"
        />
      </div>
    </>
  );
}

export default CraneSpecsFields;

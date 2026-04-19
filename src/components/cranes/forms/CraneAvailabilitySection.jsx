import AvailabilityRange from "../AvailabilityRange";

function CraneAvailabilitySection({ form, setForm }) {
  return (
    <>
      <div className="flex items-start mb-6 sm:items-center">
        <input
          type="checkbox"
          id="isAvailable"
          checked={form.isAvailable}
          onChange={(e) => {
            const checked = e.target.checked;

            setForm((prev) => ({
              ...prev,
              isAvailable: checked,
              availability: checked
                ? prev.availability
                : { availabilityStart: "", availabilityEnd: "" },
            }));
          }}
          className="mt-0.5 sm:mt-0 h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
        <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
          Is Available?
        </label>
      </div>

      {/* ── only show when checked ── */}
      {form.isAvailable && (
        <div className="mb-8">
          <AvailabilityRange
            field="availability"
            values={form.availability}
            setValues={(value) =>
              setForm((prev) => ({ ...prev, availability: value }))
            }
            label="Available"
          />
        </div>
      )}
    </>
  );
}

export default CraneAvailabilitySection;

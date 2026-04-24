import AvailabilityRange from "../../cranes/AvailabilityRange";

function InquiryOptionsSection({ form, setForm }) {
  return (
    <>
      <div className="mb-6">
        <AvailabilityRange
          field="period"
          values={form.period}
          setValues={(updater) =>
            setForm((prev) => ({
              ...prev,
              period:
                typeof updater === "function" ? updater(prev.period) : updater,
            }))
          }
          label="Period"
        />
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.needsTransport}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                needsTransport: e.target.checked,
              }))
            }
            className="h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">I need transportation</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.needsInstallation}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                needsInstallation: e.target.checked,
              }))
            }
            className="h-5 w-5 text-blue-600"
          />
          <span className="text-gray-700">
            I need installation / disassembly
          </span>
        </label>
      </div>
    </>
  );
}

export default InquiryOptionsSection;

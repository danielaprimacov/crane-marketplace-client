import AvailabilityRange from "../../cranes/AvailabilityRange";

function InquiryOptionsSection({ form, setForm }) {
  const updateCheckbox = (field, checked) => {
    setForm((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  return (
    <>
      <div className="mb-6">
        <AvailabilityRange
          field="period"
          values={form.period || {}}
          setValues={(updater) =>
            setForm((prev) => ({
              ...prev,
              period:
                typeof updater === "function"
                  ? updater(prev.period || {})
                  : updater,
            }))
          }
          label="Period"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex items-start gap-3 rounded-xl border border-black/10 p-4 transition hover:bg-gray-50">
          <input
            type="checkbox"
            checked={form.needsTransport}
            onChange={(event) =>
              updateCheckbox("needsTransport", event.target.checked)
            }
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
          />
          <span className="text-sm text-gray-700 sm:text-base">
            I need transportation
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-xl border border-black/10 p-4 transition hover:bg-gray-50">
          <input
            type="checkbox"
            checked={form.needsInstallation}
            onChange={(event) =>
              updateCheckbox("needsInstallation", event.target.checked)
            }
            className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
          />
          <span className="text-sm text-gray-700 sm:text-base">
            I need installation / disassembly
          </span>
        </label>
      </div>
    </>
  );
}

export default InquiryOptionsSection;

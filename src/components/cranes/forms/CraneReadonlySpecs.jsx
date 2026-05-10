function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  return value;
}

function CraneReadonlySpecs({ form = {} }) {
  const items = [
    {
      label: "Producer",
      value: form.producer,
    },
    {
      label: "Series Code",
      value: form.seriesCode,
    },
    {
      label: "Class Capacity",
      value: form.capacityClassNumber,
      suffix: "t",
    },
    {
      label: "Max Capacity",
      value: form.capacity,
      suffix: "t",
    },
    {
      label: "Max Height",
      value: form.height,
      suffix: "m",
    },
    {
      label: "Variant / Revision",
      value: form.variantRevision,
    },
    {
      label: "Max Radius",
      value: form.radius,
      suffix: "m",
    },
  ];
  return (
    <section className="rounded-2xl border border-black/10 bg-gray-50 p-5 sm:p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-600">
        Crane Specs
      </h2>

      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
        {items.map(({ label, value, suffix }) => {
          const formattedValue = formatValue(value);

          return (
            <div key={label}>
              <dt className="text-xs uppercase tracking-wide text-gray-500">
                {label}
              </dt>

              <dd className="mt-1 font-medium text-gray-900">
                {formattedValue}
                {formattedValue !== "—" && suffix ? ` ${suffix}` : ""}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export default CraneReadonlySpecs;

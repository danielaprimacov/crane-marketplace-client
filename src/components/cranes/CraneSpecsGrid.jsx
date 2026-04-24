function CraneSpecsGrid({ crane }) {
  const specs = [
    ["Class Cap. (t)", crane.capacityClassNumber],
    ["Max Cap. (t)", crane.capacity],
    ["Max Hgt. (m)", crane.height],
    ["Max Rng. (m)", crane.radius],
    ["Variant", crane.variantRevision || "–"],
  ];

  return (
    <dl className="mt-5 mb-3 grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-cols-5">
      {specs.map(([label, value]) => (
        <div
          key={label}
          className="rounded-xl border border-black/8 bg-gray-50 px-4 py-3"
        >
          <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
            {label}
          </dt>
          <dd className="mt-2 text-base font-semibold leading-tight text-gray-900">
            {value ?? "–"}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default CraneSpecsGrid;

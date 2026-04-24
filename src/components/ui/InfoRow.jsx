function InfoRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
      <dt className="w-auto shrink-0 font-semibold text-gray-700 sm:w-24">
        {label}
      </dt>
      <dd className="text-gray-600">{children}</dd>
    </div>
  );
}

export default InfoRow;

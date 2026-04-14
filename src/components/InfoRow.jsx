function InfoRow({ label, children }) {
  return (
    <div className="flex items-start gap-3">
      <dt className="w-24 shrink-0 font-semibold text-gray-700">{label}</dt>
      <dd className="text-gray-600">{children}</dd>
    </div>
  );
}

export default InfoRow;

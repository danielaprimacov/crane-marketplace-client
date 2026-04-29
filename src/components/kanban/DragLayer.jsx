import { useDragLayer } from "react-dnd";

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return { display: "none" };
  }
  const { x, y } = currentOffset;

  return {
    position: "fixed",
    pointerEvents: "none",
    top: 0,
    left: 0,
    transform: `translate(${x + 14}px, ${y + 14}px) scale(1.03)`,
    zIndex: 1000,
  };
}

function DragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset) {
    return null;
  }

  const statusBorderMap = {
    new: "#98DC9A",
    in_progress: "#FF975B",
    resolved: "#FF754F",
  };

  const statusTextMap = {
    new: "#1B5E20",
    in_progress: "#BF360C",
    resolved: "#B71C1C",
  };

  const borderColor = statusBorderMap[item.status] || "#ced4da";
  const titleColor = statusTextMap[item.status] || "#343a40";

  return (
    <div style={getItemStyles(currentOffset)}>
      <div
        className="flex h-28 w-[280px] flex-col justify-center rounded-md border-2 bg-white p-3 shadow-lg sm:w-80"
        style={{ opacity: 0.97, borderColor }}
      >
        <h3
          className="mb-2 line-clamp-2 text-center text-sm font-semibold"
          style={{ color: titleColor }}
        >
          {item.title}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="truncate text-sm">{item.customerName}</p>
          <p className="truncate text-xs text-gray-700">{item.email}</p>
        </div>
      </div>
    </div>
  );
}

export default DragLayer;

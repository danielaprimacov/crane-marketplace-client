import { useDragLayer } from "react-dnd";

import {
  INQUIRY_STATUS_BORDER_COLORS,
  INQUIRY_STATUS_TEXT_COLORS,
} from "../../constants/inquiryStatus";

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
    transform: `translate(${x}px, ${y}px) scale(1.02)`,
    zIndex: 1000,
  };
}

function DragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset) {
    return null;
  }

  const borderColor = INQUIRY_STATUS_BORDER_COLORS[item.status] || "#ced4da";
  const titleColor = INQUIRY_STATUS_TEXT_COLORS[item.status] || "#343a40";

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
          {item.title || "Untitled inquiry"}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="truncate text-sm">
            {item.customerName || "Unknown customer"}
          </p>
          <p className="truncate text-xs text-gray-700">
            {item.email || "No email"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DragLayer;

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
    transform: `translate(${x}px, ${y}px)`,
    zIndex: 100,
  };
}

function DragLayer() {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item) {
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
        className="w-88 h-24 cursor-pointer rounded-md p-2.5 mb-2.5 flex flex-col justify-center"
        style={{ opacity: 0.7, border: `2px solid ${borderColor}` }}
      >
        <h3
          className={`mb-2 flex justify-between items-center ${
            {
              new: "gradient-low",
              in_progress: "gradient-medium",
              resolved: "gradient-high",
            }[item.status] || ""
          }`}
          style={{ color: titleColor }}
        >
          <div className="cursor-pointer"></div>
          {item.title}
          <div className="cursor-pointer"></div>
        </h3>
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm">{item.customerName}</p>
          <p className="text-xs text-gray-700">{item.email}</p>
        </div>
      </div>
    </div>
  );
}

export default DragLayer;

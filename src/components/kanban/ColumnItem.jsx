import { useRef } from "react";
import { useDrop } from "react-dnd";

import Tasks from "./Tasks";

function ColumnItem({ column, moveTask }) {
  const dropZoneRef = useRef(null);
  const extendedMargin = 40;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      moveTask(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(dropZoneRef);

  const borderColorClass =
    {
      new: "border-green-600",
      in_progress: "border-orange-400",
      resolved: "border-red-600",
    }[column.id] || "border-gray-300";

  return (
    <div
      ref={dropZoneRef}
      style={{
        paddingBottom: extendedMargin,
        marginBottom: -extendedMargin,
      }}
      className="w-full"
    >
      <div
        className={`flex min-h-[200px] flex-col rounded-md border p-2.5 sm:min-h-[220px] ${borderColorClass} ${
          isOver && canDrop ? "bg-white/30" : "bg-transparent"
        }`}
      >
        <div className="mx-1 mb-5 border-b border-b-orange-300 py-2 text-center text-base font-semibold tracking-widest text-gray-700 sm:text-lg">
          <h2>{column.title}</h2>
        </div>

        <Tasks tasks={column.tasks} />
      </div>
    </div>
  );
}

export default ColumnItem;

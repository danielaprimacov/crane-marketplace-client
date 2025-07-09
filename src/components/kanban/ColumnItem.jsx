import { useRef } from "react";
import { useDrop } from "react-dnd";

import Tasks from "./Tasks";

function ColumnItem({ column, moveTask, deleteTask }) {
  const dropZoneRef = useRef(null);
  const extendedMargin = 100;

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
    >
      <div
        className={`flex flex-col min-w-[370px] flex-[0_1_370px] p-2.5 mr-2.5 rounded-md border  ${borderColorClass}
                  ${isOver && canDrop ? "bg-white/30" : "bg-transparent"}`}
      >
        <div className="text-lg font-semibold tracking-widest text-center text-gray-700 mb-5 py-2 mx-1  border-b border-b-orange-300">
          <h2>{column.title}</h2>
        </div>

        <Tasks tasks={column.tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default ColumnItem;

import { useRef } from "react";
import { useDrop } from "react-dnd";

import Tasks from "./Tasks";
import { INQUIRY_COLUMN_BORDER_CLASSES } from "../../constants/inquiryStatus";

const EXTENDED_DROP_MARGIN = 40;

function ColumnItem({ column, moveTask }) {
  const dropZoneRef = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (!item?.id) return;
      moveTask(item.id, column.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(dropZoneRef);

  const borderColorClass =
    INQUIRY_COLUMN_BORDER_CLASSES[column.id] || "border-gray-300";

  return (
    <div
      ref={dropZoneRef}
      style={{
        paddingBottom: EXTENDED_DROP_MARGIN,
        marginBottom: -EXTENDED_DROP_MARGIN,
      }}
      className="w-[calc(100vw-2rem)] max-w-[360px] shrink-0 lg:w-auto lg:max-w-none lg:min-w-0"
    >
      <div
        className={`flex min-h-[320px] flex-col rounded-md border p-3 transition-colors ${borderColorClass} ${
          isOver && canDrop ? "bg-white/30" : "bg-transparent"
        }`}
      >
        <div className="mx-1 mb-4 select-none border-b border-b-orange-300 py-2 text-center text-lg font-semibold tracking-widest text-gray-700">
          <h2>{column.title}</h2>
        </div>

        <Tasks tasks={column.tasks} />
      </div>
    </div>
  );
}

export default ColumnItem;

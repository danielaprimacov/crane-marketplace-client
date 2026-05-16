import { useContext, useRef } from "react";

import KanbanContext from "./KanbanContext";
import ColumnItem from "./ColumnItem";

import useDragAutoScroll from "../../hooks/useDragAutoScroll";

function Columns() {
  const { columns, moveTask } = useContext(KanbanContext);
  const boardRef = useRef(null);

  useDragAutoScroll(boardRef);

  return (
    <div ref={boardRef} className="kanban-board mt-6 overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex min-w-max gap-4 px-4 sm:px-0 lg:grid lg:min-w-0 lg:grid-cols-3 lg:gap-6">
        {columns.map((column) => (
          <ColumnItem key={column.id} column={column} moveTask={moveTask} />
        ))}
      </div>
    </div>
  );
}

export default Columns;

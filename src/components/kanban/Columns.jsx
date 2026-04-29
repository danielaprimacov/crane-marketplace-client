import { useContext } from "react";
import KanbanContext from "./KanbanContext";
import ColumnItem from "./ColumnItem";

function Columns() {
  const { columns, moveTask } = useContext(KanbanContext);

  return (
    <>
      <div className="mt-6 overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-4 px-4 sm:px-0 lg:grid lg:min-w-0 lg:grid-cols-3 lg:gap-6">
          {columns.map((column) => (
            <ColumnItem key={column.id} column={column} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Columns;

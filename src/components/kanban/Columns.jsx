import { useContext } from "react";
import KanbanContext from "./KanbanContext";
import ColumnItem from "./ColumnItem";

function Columns() {
  const { columns, moveTask } = useContext(KanbanContext);

  return (
    <>
      <div className="mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {columns.map((column) => (
            <ColumnItem key={column.id} column={column} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Columns;

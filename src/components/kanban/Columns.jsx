import { useContext } from "react";
import KanbanContext from "./KanbanContext";
import ColumnItem from "./ColumnItem";

function Columns() {
  const { columns, moveTask, deleteTask } = useContext(KanbanContext);

  return (
    <>
      <div className="flex justify-center mt-10">
        <div className="flex flex-nowrap gap-10">
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Columns;

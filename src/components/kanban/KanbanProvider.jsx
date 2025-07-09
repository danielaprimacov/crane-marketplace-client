import { useState, useEffect } from "react";
import KanbanContext from "./KanbanContext";

const columnsConfig = [
  { id: "new", title: "New" },
  { id: "in_progress", title: "In Progress" },
  { id: "resolved", title: "Resolved" },
];

const KanbanProvider = ({
  initialTasks = [],
  onMoveTask,
  onDeleteTask,
  onUpdateTask,
  onRead,
  children,
}) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(
      initialTasks.map(({ _id, ...rest }) => ({
        id: _id,
        ...rest,
      }))
    );
  }, [initialTasks]);

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const grouped = tasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    const newCols = columnsConfig.map(({ id, title }) => ({
      id,
      title,
      tasks: (grouped[id] || []).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ),
    }));
    setColumns(newCols);
  }, [tasks]);

  // Move a task from one column to another
  const moveTask = (taskId, targetStatus) => {
    const full = tasks.find((t) => t.id === taskId);

    // build a complete update object
    const updatedFields = {
      status: targetStatus,
      period: full.period,
      isRead: full.isRead,
      customerName: full.customerName,
      email: full.email,
      message: full.message,
      crane: full.crane,
      address: full.address,
    };

    onMoveTask(taskId, updatedFields);

    // update local state immediately
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  // Delete a task locally
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Update a task’s fields locally
  const updateTask = (id, updatedFields) => {
  if (typeof onUpdateTask === "function") {
    onUpdateTask(id, updatedFields);
  }

  setTasks(prev =>
    prev.map(t =>
      t.id === id ? { ...t, ...updatedFields } : t
    )
  );
};

  const contextValue = {
    columns,
    moveTask,
    deleteTask,
    updateTask,
    markRead: onRead,
  };

  return (
    <KanbanContext.Provider value={contextValue}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanProvider;

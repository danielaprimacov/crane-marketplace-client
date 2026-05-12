import { useState, useEffect, useMemo } from "react";

import KanbanContext from "./KanbanContext";
import { INQUIRY_COLUMNS } from "../../constants/inquiryStatus";

function normalizeTask(task) {
  if (!task) return null;

  return {
    ...task,
    id: task.id || task._id,
  };
}

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
    const normalizedTasks = Array.isArray(initialTasks)
      ? initialTasks.map(normalizeTask).filter((task) => task?.id)
      : [];

    setTasks(normalizedTasks);
  }, [initialTasks]);

  const columns = useMemo(() => {
    const grouped = tasks.reduce((acc, task) => {
      const status = task.status || "new";

      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});

    return INQUIRY_COLUMNS.map(({ id, title }) => ({
      id,
      title,
      tasks: (grouped[id] || []).sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      ),
    }));
  }, [tasks]);

  // Move a task from one column to another
  const moveTask = async (taskId, targetStatus) => {
    const fullTask = tasks.find((t) => t.id === taskId);

    if (!fullTask || fullTask.status === targetStatus) return;

    const previousStatus = fullTask.status;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: targetStatus } : task
      )
    );

    try {
      await onMoveTask?.(taskId, {
        status: targetStatus,
      });
    } catch (error) {
      console.error("Move task failed:", error);

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: previousStatus } : task
        )
      );
    }
  };

  // Delete a task locally
  const deleteTask = async (taskId) => {
    const previousTasks = tasks;

    setTasks((prev) => prev.filter((task) => task.id !== taskId));

    try {
      await onDeleteTask?.(taskId);
    } catch (error) {
      console.error("Delete task failed:", error);
      setTasks(previousTasks);
      throw error;
    }
  };

  // Update a task’s fields locally
  const updateTask = async (id, updatedFields) => {
    const previousTasks = tasks;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );

    try {
      await onUpdateTask?.(id, updatedFields);
    } catch (error) {
      console.error("Update task failed:", error);
      setTasks(previousTasks);
      throw error;
    }
  };

  const markRead = async (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task || task.isRead) return;

    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, isRead: true } : item
      )
    );

    try {
      await onRead?.(taskId);
    } catch (error) {
      console.error("Mark read failed:", error);

      setTasks((prev) =>
        prev.map((item) =>
          item.id === taskId ? { ...item, isRead: false } : item
        )
      );
    }
  };

  return (
    <KanbanContext.Provider
      value={{ columns, moveTask, deleteTask, updateTask, markRead }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanProvider;

import { motion } from "framer-motion";
import TaskItem from "./TaskItem";

function Tasks({ tasks = [] }) {
  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          layout="position"
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="w-full"
        >
          <TaskItem task={task} />
        </motion.div>
      ))}
    </div>
  );
}

export default Tasks;

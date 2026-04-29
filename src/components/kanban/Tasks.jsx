import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "./TaskItem";

function Tasks({ tasks = [] }) {
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout="position"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full"
          >
            <TaskItem task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default Tasks;

import { motion } from "motion/react";
import Task from "./Task";
export default function SearchResults({ searchValue, tasks, setTasks }) {
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    /* aslında bu aşağıdaki yere blur yapsak güzel olabilir */
    <div className="absolute top-5 rounded-2xl bg-sky-900 border-1 border-white/30 w-full h-auto backdrop-blur-3xl p-3 z-50">
      <div>
        {searchValue !== ""
          ? searchedTasks.length !== 0
            ? searchedTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Task
                    setTasks={setTasks}
                    tasks={tasks}
                    task={task}
                    title={task.title}
                  />
                </motion.div>
              ))
            : "No results."
          : "Type the title of the task, and it will show up here."}
      </div>
    </div>
  );
}

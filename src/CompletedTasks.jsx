import { useState } from "react";
import Task from "./Task";
import { motion, AnimatePresence } from "motion/react";
import { div } from "motion/react-client";

export default function CompletedTasks({ tasks, setTasks }) {
  const [isOpen, setIsOpen] = useState(false);
  const doneTasks = tasks.filter((task) => task.done === true);
  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer select-none flex flex-row items-center"
      >
        <div className="inline">
          <AnimatePresence>
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#FFFFFF"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </motion.div>
          </AnimatePresence>
        </div>
        <div>Completed tasks</div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }} /* burayı auto yapınca açılış kapanış güzel oluyo, claude sonnet öğretti */
            exit={{ opacity: 0, height: 0 }}
          >
            {doneTasks.length !== 0 ? (
              doneTasks.map((task) => (
                <Task
                  key={task.id}
                  setTasks={setTasks}
                  tasks={tasks}
                  task={task}
                  title={task.title}
                  isCompletedMenuOpen={isOpen}
                />
              ))
            ) : (
              <div className="mt-2">You haven't completed any tasks yet.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

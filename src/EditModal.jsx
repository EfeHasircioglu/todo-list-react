import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
export default function EditModal({
  task,
  tasks,
  setTasks,
  isEditMode,
  setIsEditMode,
}) {
  const [tempTitle, setTempTitle] = useState(task.title);
  const [tempDesc, setTempDesc] = useState(task.description);
  const [tempDate, setTempDate] = useState(task.dueDate);
  function saveEdit(taskId) {
    const updatedTasks = tasks.map((t) =>
      t.id === taskId
        ? { ...t, title: tempTitle, description: tempDesc, dueDate: tempDate }
        : t
    );
    setTasks(updatedTasks);
    setIsEditMode(false);
  }
  return (
    <div className="absolute z-10000">
      {" "}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="fixed top-0 left-0 flex w-screen h-screen bg-black/40 backdrop-blur-lg">
            {/* modalın divi */}
            <div className="relative p-5 rounded-xl shadow-2xl bg-gray-800 w-[80%] h-[80%] sm:w-[50%] sm:h-[50%] mx-auto my-auto">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <head-x className="p-1 text-xl">Edit Task</head-x>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="m177-120-57-57 184-183H200v-80h240v240h-80v-104L177-120Zm343-400v-240h80v104l183-184 57 57-184 183h104v80H520Z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <span className="text-sm pl-1 block py-1">Title</span>
                  <input
                    className="backdrop-blur-md bg-gray-700/30 w-full rounded-xl h-min p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
                    type="text"
                    placeholder="Task Title"
                    value={tempTitle}
                    onChange={(e) =>
                      setTempTitle(e.target.value)
                    } /* description inputunun değerini alıyoruz */
                  />
                </div>
                <div>
                  <span className="text-sm pl-1 block py-1">Description</span>
                  <input
                    className="backdrop-blur-md bg-gray-700/30 w-full rounded-xl h-min p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
                    type="text"
                    placeholder="Task Description"
                    value={tempDesc}
                    onChange={(e) =>
                      setTempDesc(e.target.value)
                    } /* description inputunun değerini alıyoruz */
                  />
                </div>
                <div>
                  <span className="text-sm pl-1 block py-1">Title</span>
                  <input
                    className="backdrop-blur-md bg-gray-700/30 w-full rounded-xl h-min p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
                    type="datetime-local"
                    placeholder="Due Date"
                    value={tempDate}
                    onChange={(e) =>
                      setTempDate(e.target.value)
                    } /* date inputunun değerini alıyoruz */
                  />
                </div>
              </div>
              <div className="flex flex-col my-3">
                <button
                  onClick={() => saveEdit(task.id)}
                  className="w-fit p-2 h-fit mb-auto bg-gray-900/50 hover:bg-white/10 active:bg-white/15 rounded-xl transition cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

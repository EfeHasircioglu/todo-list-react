import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function TaskMenu({ tasks, setTasks, setIsTaskMenuOpen }) {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState("");
  const [titleError, setTitleError] = useState("");

  function addTask() {
    if (titleInput.trim() !== "") {
      const newTask = {
        id: crypto.randomUUID(),
        title: titleInput,
        description: descInput,
        dueDate: dateInput,
        done: false,
      };
      setTasks([...tasks, newTask]);
      console.log(tasks);
      setTitleInput("");
      setDescInput("");
      setIsTaskMenuOpen(false);
    } else {
      setTitleError("Title cannot be empty");
    }
  }
  /* eğer title input boş değilse o zaman error'u kaldırıyoruz */
  useEffect(() => {
    if (titleInput !== "") {
      setTitleError("");
    }
  }, [titleInput]);
  return (
    <div className="absolute top-20 right-5 rounded-xl bg-sky-900 border-1 shadow-lg border-white/10 w-55 h-auto transition">
      <div className="flex flex-row h-full justify-self-center gap-0.5 my-2">
        <div className="flex flex-col items-center justify-center">
          <input
            className="backdrop-blur-md w-40 rounded-xl h-fit p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
            type="text"
            placeholder="Task Title"
            value={titleInput}
            onChange={(e) =>
              setTitleInput(e.target.value)
            } /* title inputunun değerini alıyoruz */
          />
          <span className="text-xs text-red-500 text-shadow-white self-start pl-2">
            {titleError}
          </span>
          <button
            onClick={() => setIsDetailsOpen((prev) => !prev)}
            className="cursor-pointer self-start p-2 select-none flex flex-row items-center"
          >
            <div className="inline">
              <AnimatePresence>
                <motion.div
                  animate={{ rotate: isDetailsOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#FFFFFF"
                  >
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-sm">More</div>
          </button>
          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <input
                    className="backdrop-blur-md w-40 rounded-xl h-min p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
                    type="text"
                    placeholder="Task Description"
                    value={descInput}
                    onChange={(e) =>
                      setDescInput(e.target.value)
                    } /* description inputunun değerini alıyoruz */
                  />
                  <input
                    className="backdrop-blur-md w-40 rounded-xl h-fit p-2 border-0 hover:bg-white/5 active:bg-white/10 transition"
                    type="datetime-local"
                    placeholder="Due Date"
                    value={dateInput}
                    onChange={(e) =>
                      setDateInput(e.target.value)
                    } /* date inputunun değerini alıyoruz */
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={addTask}
          className="w-fit p-2 h-fit mb-auto hover:bg-white/10 active:bg-white/15 rounded-xl transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

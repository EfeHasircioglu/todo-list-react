import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./App.css";
import Searchbar from "./Searchbar";
import TaskMenu from "./TaskMenu";
import Task from "./Task";
import CompletedTasks from "./CompletedTasks";
import FilterDropdown from "./FilterDropdown";
// TODO: filtre yerinin ve task ekleme yerinin dışına basınca o menülerin kapanması ve task detaylarının görünümüne iyileştirme ve edit yerinin exit animasyonununun oynamamasını ve diğer şeylerini düzeltme
function App() {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [filterDropdownShown, setFilterDropdownShown] = useState(false);
  //filterDropdown'a gönderilecekler
  const [filterMode, setFilterMode] = useState("normal");
  // Load tasks from localStorage on component mount
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("todoTasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);
  function openTaskMenu() {
    setIsTaskMenuOpen((prev) => !prev);
  }
  return (
    <div className="bg-sky-950 p-5 min-h-screen h-full">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <Searchbar
            tasks={tasks}
            setTasks={setTasks}
            isSearchShown={isSearchShown}
            setIsSearchShown={setIsSearchShown}
          ></Searchbar>
          <button
            onClick={() => openTaskMenu()}
            title="Add Task"
            className="p-3 mx-1 w-fit hover:bg-white/10 active:bg-white/15 rounded-xl transition ease-linear cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z" />
            </svg>
          </button>
          <button
            onClick={() => setFilterDropdownShown((prev) => !prev)}
            className="p-3 mx-1 w-fit hover:bg-white/10 active:bg-white/15 rounded-xl transition ease-linear cursor-poi</svg>nter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" />
            </svg>
          </button>
          <AnimatePresence>
            {filterDropdownShown && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FilterDropdown
                  setFilterMode={setFilterMode}
                  filterMode={filterMode}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isTaskMenuOpen ? (
              <motion.div
                className="z-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TaskMenu
                  setIsTaskMenuOpen={setIsTaskMenuOpen}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              </motion.div>
            ) : (
              ""
            )}
          </AnimatePresence>
        </div>
        <CompletedTasks tasks={tasks} setTasks={setTasks}></CompletedTasks>
        <div>
          <AnimatePresence>
            {filterMode === "normal" &&
              tasks
                .filter((task) => task.done === false)
                .map((task) => (
                  <motion.div
                    layout
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
                ))}
            {filterMode === "closestdue" &&
              tasks
                .filter((task) => task.done === false && task.dueDate)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .map((task) => (
                  <motion.div
                    layout
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
                ))}
            {filterMode === "farthestdue" &&
              tasks
                .filter((task) => task.done === false && task.dueDate)
                .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                .map((task) => (
                  <motion.div
                    layout
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
                ))}
            {filterMode === "alphabetic" &&
              tasks
                .filter((task) => task.done === false)
                .sort((a, b) =>
                  a.title.localeCompare(b.title)
                ) /* bunun ile alphabetic sorting oluyor */
                .map((task) => (
                  <motion.div
                    layout
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
                ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;

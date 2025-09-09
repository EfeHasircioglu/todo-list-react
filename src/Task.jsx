import { useEffect, useState } from "react";
import DeleteConfirmation from "./DeleteConfirmation";
import EditModal from "./EditModal";
import { AnimatePresence, motion } from "motion/react";
import { div } from "motion/react-client";
export default function Task({ task, setTasks, tasks }) {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [buttonBgColor, setButtonBgColor] = useState("");
  const [buttonTickColor, setButtonTickColor] = useState("#fff");
  const [isTickActive, setIsTickActive] = useState(task.done);
  const [isLineThru, setIsLineThru] = useState(task.done);
  //edit modalı açık mı değil mi
  const [isEditMode, setIsEditMode] = useState("");
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  /* task detayları görüntülenirken date ve time'nin düzgün şekilde görünmesi için */
  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return "Invalid date";
    /* eğer bugün ise direk bugün olduğunu belirteceğiz */
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    /* eğer yarın ise bu sefer de yarın diyeceğiz, tomorrow yani */
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = date.toDateString() === tomorrow.toDateString();

    /* formatting */
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    /* formatted stringi döndürüyoruz */
    if (isToday) {
      return `Today at ${date.toLocaleTimeString("tr-TR", timeOptions)}`;
    } else if (isTomorrow) {
      return `Tomorrow at ${date.toLocaleTimeString("tr-TR", timeOptions)}`;
    } else {
      const formattedDate = date.toLocaleDateString("tr-TR", dateOptions);
      const formattedTime = date.toLocaleTimeString("tr-TR", timeOptions);
      return `${formattedDate} at ${formattedTime}`;
    }
  }
  useEffect(() => {
    if (isTickActive) {
      /* eğer tikliyse, yani görev yapılıysa */
      setButtonBgColor("bg-green-500");
      setButtonTickColor("oklch(95% 0.052 163.051)");
      setTimeout(() => {
        setTasks(
          tasks.map((t) => (t.id === task.id ? { ...t, done: true } : t))
        );
      }, 500);

      setIsLineThru(true);
      console.log(tasks);
    } else {
      /* görev henüz yapılı değil */
      setButtonBgColor("bg-transparent");
      setButtonTickColor("#fff");
      if (task.done) {
        setTasks(
          tasks.map((t) => (t.id === task.id ? { ...t, done: false } : t))
        );
      }
      setIsLineThru(false);
    }
  }, [isTickActive]);
  /* her taskın görüntüleneceği yer */

  return (
    <>
      <div className="p-3 relative group w-full border-1 rounded-xl border-white/30 bg-white/5 hover:bg-white/10 mx-0 my-2">
        <div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <button
                onClick={() => setIsTickActive((prev) => !prev)}
                title="Mark as Done"
                className={`w-fit ${buttonBgColor} hover:bg-white/20 active:bg-white/25 cursor-pointer rounded-lg`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill={`${buttonTickColor}`}
                >
                  <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" />
                </svg>
              </button>
              <div
                className={`w-fit break-words ${
                  isLineThru ? "line-through" : ""
                }`}
              >
                {task.title}
              </div>
            </div>
            <div className="flex gap-3">
              {task.dueDate || task.description ? (
                <button
                  title="Task Details"
                  onClick={() => setDetailsOpen((prev) => !prev)}
                  className="hover:bg-white/10 p-1 -m-1 active:bg-white/15 rounded-xl cursor-pointer select-none hidden group-hover:inline"
                >
                  <div className="inline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="m298-262-56-56 121-122H80v-80h283L242-642l56-56 218 218-218 218Zm222-18v-80h360v80H520Zm0-320v-80h360v80H520Zm120 160v-80h240v80H640Z" />
                    </svg>
                  </div>
                </button>
              ) : (
                ""
              )}

              <button
                title="Edit Task"
                className="hidden cursor-pointer group-hover:inline hover:bg-white/10 p-1 -m-1 active:bg-white/15 rounded-xl"
                onClick={() => setIsEditMode((prev) => !prev)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </button>
              <button
                title="Delete Task"
                onClick={() => setIsConfirmationOpen((prev) => !prev)}
                className="hidden cursor-pointer group-hover:inline p-1 -m-1 hover:bg-white/10 active:bg-white/15 rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#FFFFFF"
                >
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
              </button>
            </div>
          </div>
          <AnimatePresence>
            {isDetailsOpen && (
              <motion.div
                style={{ overflow: "hidden" }}
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
              >
                <div className="flex flex-col gap-0 z-0">
                  <div
                    className={`${
                      task.dueDate !== null
                        ? `pt-2 pl-1 py-1 text-sm inline-block`
                        : "hidden"
                    }`}
                  >
                    <div className="flex flex-row gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#FFFFFF"
                      >
                        <path d="M200-640h560v-80H200v80Zm0 0v-80 80Zm0 560q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v227q-19-9-39-15t-41-9v-43H200v400h252q7 22 16.5 42T491-80H200Zm520 40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm67-105 28-28-75-75v-112h-40v128l87 87Z" />
                      </svg>
                      <div>{formatDateTime(task.dueDate)}</div>
                    </div>
                  </div>
                  <div
                    className={`${
                      task.description !== null
                        ? `py-1 pb-2 pl-1 text-sm flex break-words`
                        : "hidden"
                    }`}
                  >
                    {/* uzun yazılarda break-words çalışmıyor!! */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#FFFFFF"
                      className="flex-shrink-0"
                    >
                      <path d="M160-200v-80h400v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Zm0-160v-80h640v80H160Z" />
                    </svg>
                    <div className="inline-block">{task.description}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {isEditMode && (
          <EditModal
            tasks={tasks}
            setTasks={setTasks}
            setIsEditMode={setIsEditMode}
            task={task}
          ></EditModal>
        )}

        <AnimatePresence>
          {isConfirmationOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DeleteConfirmation
                isEditMode={isEditMode}
                setIsConfirmationOpen={setIsConfirmationOpen}
                setTasks={setTasks}
                tasks={tasks}
                task={task}
              />
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

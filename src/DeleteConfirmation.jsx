export default function DeleteConfirmation({
  setTasks,
  tasks,
  task,
  setIsConfirmationOpen,
}) {
  /* task silme fonksiyonu */
  function deleteTask() {
    setTasks(tasks.filter((t) => t.id !== task.id));
  }

  return (
    <div className="absolute right-0 top-12.5 z-500">
      <div className="px-4 py-4 border-1 border-gray-800 backdrop-blur-lg rounded-xl bg-black/30 flex flex-col gap-3">
        <span>Are you sure to delete this task?</span>
        <div className="flex flex-row gap-4">
          <button
            onClick={deleteTask}
            className="w-full bg-red-800/50 hover:bg-red-700/50 text-red-500 rounded-full py-2 cursor-pointer"
          >
            Delete
          </button>
          <button
            onClick={() => setIsConfirmationOpen(false)}
            className="w-full bg-gray-500/50 hover:bg-gray-400/50 backdrop-blur-lg rounded-full py-1 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

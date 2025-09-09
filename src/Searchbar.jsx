import { useState } from "react";
import SearchResults from "./SearchResults";
import { AnimatePresence, motion } from "motion/react";
export default function Searchbar({
  isSearchShown,
  setIsSearchShown,
  tasks,
  setTasks,
}) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="relative w-full backdrop-blur-md rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition z-100">
      <input
        onFocus={() => setIsSearchShown((prev) => !prev)}
        onBlur={() => setIsSearchShown((prev) => !prev)}
        onChange={(e) => setSearchValue(e.target.value)}
        name="Search"
        type="text"
        className="p-3 w-full border-1 border-white/30 rounded-xl"
        placeholder="Search"
        value={searchValue}
      />

      <AnimatePresence>
        {isSearchShown && (
          <motion.div
            transition={{ duration: 0.2, ease: "easeIn" }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 2 }}
            exit={{ opacity: 0, y: -2 }}
          >
            <SearchResults
              tasks={tasks}
              setTasks={setTasks}
              searchValue={searchValue}
            ></SearchResults>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
/* burada search bar functionality olacak */

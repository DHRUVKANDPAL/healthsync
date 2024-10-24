import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center justify-end flex-1">
      {/* Mobile Search (Expandable) */}
      <div className="sm:hidden relative flex items-center justify-end w-full">
        <button
          onClick={() => setIsExpanded(true)}
          className={`
            relative z-10 p-2 
            hover:bg-slate-200 dark:hover:bg-slate-700 
            rounded-full transition-colors duration-200 
            focus:outline-none
            ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          aria-label="Toggle search"
        >
          <Search className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        </button>

        <div
          className={`
          absolute right-0 flex items-center
          transition-all duration-300 ease-in-out
          ${
            isExpanded
              ? "w-full opacity-100"
              : "w-0 opacity-0 pointer-events-none"
          }
        `}
        >
          <div className="w-full relative">
            <input
              type="search"
              placeholder="Search..."
              className="
                w-full h-9 pl-8 pr-10
                bg-white dark:bg-slate-800
                border border-slate-300 dark:border-slate-600
                rounded-full
                text-sm text-slate-900 dark:text-slate-100
                placeholder:text-slate-400 dark:placeholder:text-slate-500
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
              "
              autoFocus
            />
            <Search
              className="
                absolute left-2.5 top-1/2 -translate-y-1/2
                h-4 w-4 text-slate-400 dark:text-slate-500
                pointer-events-none
              "
            />
            <button
              onClick={() => setIsExpanded(false)}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 
                rounded-full transition-colors duration-200
              "
            >
              <svg
                className="h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Search (Always Visible) */}
      <div className="hidden sm:flex items-center relative">
        <input
          type="search"
          placeholder="Search..."
          className="
            w-64 md:w-80 h-9 pl-8 pr-4
            bg-white dark:bg-slate-800
            border border-slate-300 dark:border-slate-600
            rounded-full
            text-sm text-slate-900 dark:text-slate-100
            placeholder:text-slate-400 dark:placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
            transition-all duration-200
          "
        />
        <Search
          className="
            absolute left-2.5 top-1/2 -translate-y-1/2
            h-4 w-4 text-slate-400 dark:text-slate-500
            pointer-events-none
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;

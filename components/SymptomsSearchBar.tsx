import React, { useState, useEffect } from "react";
import {
  Search,
  ThermometerSnowflake,
  Pill,
  Brain,
  Heart,
  Frown,
  Stethoscope,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import useDebounce from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { useLatLong } from "@/hooks/useLatLong";
import { Button } from "@/components/ui/button";

interface Symptom {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  urgency?: "low" | "medium" | "high";
}

const commonSymptoms: Symptom[] = [
  {
    id: "1",
    name: "Fever",
    icon: <ThermometerSnowflake className="h-4 w-4 text-red-500" />,
    category: "General",
    urgency: "medium",
  },
  {
    id: "2",
    name: "Headache",
    icon: <Brain className="h-4 w-4 text-purple-500" />,
    category: "Neurological",
    urgency: "low",
  },
  {
    id: "3",
    name: "Shortness of breath",
    icon: <Stethoscope className="h-4 w-4 text-blue-500" />,
    category: "Respiratory",
    urgency: "high",
  },
  {
    id: "4",
    name: "Chest pain",
    icon: <Heart className="h-4 w-4 text-red-600" />,
    category: "Cardiovascular",
    urgency: "high",
  },
  {
    id: "5",
    name: "Nausea",
    icon: <Frown className="h-4 w-4 text-green-500" />,
    category: "Digestive",
    urgency: "medium",
  },
  {
    id: "6",
    name: "Joint pain",
    icon: <Pill className="h-4 w-4 text-amber-500" />,
    category: "Musculoskeletal",
    urgency: "low",
  },
];

interface SymptomSearchBarProps {
  className?: string;
  inputClassName?: string;
  isSearchOpen?: boolean;
  onSearchSubmit?: (e: React.FormEvent) => void;
  searchQuery?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerWidth?: string;
  searchButtonClassName?: string;
  variant?: "hero" | "header";
}

const SymptomSearchBar = ({
  className,
  inputClassName,
  isSearchOpen = true, // Default to true for hero variant
  onSearchSubmit,
  searchQuery: externalSearchQuery,
  onSearchChange,
  containerWidth,
  searchButtonClassName,
  variant = "hero", // Default to hero variant
}: SymptomSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Symptom[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const debouncedQuery = useDebounce(query, 200);
  const { latitude, longitude } = useLatLong();
  const router = useRouter();

  useEffect(() => {
    if (!isFocused) {
      setResults([]);
      return;
    }

    if (!debouncedQuery) {
      setResults(commonSymptoms);
      return;
    }

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    const filteredSymptoms = commonSymptoms.filter((symptom) => {
      return (
        symptom.name.toLowerCase().includes(normalizedQuery) ||
        symptom.category.toLowerCase().includes(normalizedQuery)
      );
    });

    setResults(filteredSymptoms);
  }, [debouncedQuery, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearchChange?.(e);
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(e);
    } else {
      // Default hero behavior
      router.push(
        `/search?searchQuery=${encodeURIComponent(
          query
        )}&latitude=${latitude}&longitude=${longitude}`
      );
    }
  };

  const handleSymptomSelect = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
    setQuery(symptom.name);
    onSearchChange?.({
      target: { value: symptom.name },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-center gap-2",
          className
        )}
      >
        <div className="relative w-full">
          <form onSubmit={handleLocalSubmit}>
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-700/20">
              <Input
                type="text"
                placeholder="Search for symptoms..."
                value={externalSearchQuery || query}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className={cn(
                  "pr-5 pl-14 py-3 h-14 text-sm rounded-lg focus-visible:ring-offset-0 border-none bg-transparent text-slate-700 dark:text-slate-200",
                  inputClassName
                )}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5">
                <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
          </form>

          <AnimatePresence>
            {isFocused && results.length > 0 && !selectedSymptom && (
              <motion.div
                className="absolute w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Suggested Symptoms
                  </h3>
                </div>
                <ul className="py-2">
                  {results.map((symptom) => (
                    <li
                      key={symptom.id}
                      className="px-4 py-1 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      onClick={() => handleSymptomSelect(symptom)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm">
                          {symptom.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {symptom.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-l-md hidden md:block"
        >
          <Button
            type="submit"
            onClick={handleLocalSubmit}
            size="lg"
            className={cn(
              "h-14 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 hover:from-emerald-600 hover:to-teal-700 text-white text-lg rounded-e-full rounded-tl-2xl shadow-lg hover:shadow-xl transition-all duration-300",
              searchButtonClassName
            )}
          >
            Search
          </Button>
        </motion.div>
      </div>
    );
  }

  // Header variant
  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleLocalSubmit}>
        <div
          className={cn(
            "transition-all duration-300 ease-in-out overflow-hidden",
            isSearchOpen ? containerWidth || "w-48" : "w-0"
          )}
        >
          <Input
            type="search"
            placeholder="Search symptoms..."
            value={externalSearchQuery || query}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className={cn(
              "bg-white dark:bg-slate-800 dark:text-teal-50 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-teal-500 m-1",
              inputClassName
            )}
          />
        </div>
      </form>

      <AnimatePresence>
        {isFocused &&
          results.length > 0 &&
          !selectedSymptom &&
          isSearchOpen && (
            <motion.div
              className={cn("absolute w-64 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-50",inputClassName)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ul className="max-h-64 overflow-auto py-2">
                {results.map((symptom) => (
                  <li
                    key={symptom.id}
                    className="px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-2"
                    onClick={() => handleSymptomSelect(symptom)}
                  >
                    <div className="p-1">{symptom.icon}</div>
                    <span className="text-sm text-slate-900 dark:text-slate-100">
                      {symptom.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomSearchBar;

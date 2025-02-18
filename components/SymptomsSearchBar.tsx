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
import { Button } from "./ui/button";

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

const SymptomSearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Symptom[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  // Added from integration code
  const [searchQuery, setSearchQuery] = useState("");
  const { latitude, longitude } = useLatLong();
  const router = useRouter();
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };
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
    // Update searchQuery for form submission
    handleSearchChange(e);
  };

  // Added from integration code
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/search?searchQuery=${encodeURIComponent(
        searchQuery
      )}&latitude=${latitude}&longitude=${longitude}`
    );
  };

  // Added from integration code
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: {
          duration: 0.4,
        },
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: {
          duration: 0.3,
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.1,
      },
    },
  };

  const handleFocus = () => {
    setSelectedSymptom(null);
    setIsFocused(true);
  };

  const getUrgencyColor = (urgency?: "low" | "medium" | "high") => {
    switch (urgency) {
      case "high":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "medium":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
      case "low":
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    }
  };

  // Wrap the input in a form with onSubmit handler
  return (
    <div className="w-[110%] max-w-5xl mx-auto flex flex-col md:flex-row md:items-start justify-center gap-2">
      <div className={cn("relative", className)}>
        <form onSubmit={handleSearchSubmit}>
          <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-700/20">
            <Input
              type="text"
              placeholder="Search for symptoms..."
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pr-5 pl-14 py-3 h-14 text-sm rounded-lg focus-visible:ring-offset-0 border-none bg-transparent text-slate-700 dark:text-slate-200"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key="search"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </form>

        <div className="absolute w-full mt-1 z-50">
          <AnimatePresence>
            {isFocused && results.length > 0 && !selectedSymptom && (
              <motion.div
                className="w-full border rounded-md shadow-lg overflow-hidden bg-white dark:bg-slate-800 dark:border-slate-700"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.div className="p-3 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Suggested Symptoms
                  </h3>
                </motion.div>
                <motion.ul className="py-2">
                  {results.map((symptom) => (
                    <motion.li
                      key={symptom.id}
                      className="px-4 py-1 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                      variants={item}
                      layout
                      onClick={() => {
                        setSelectedSymptom(symptom);
                        setSearchQuery(symptom.name);
                        setQuery(symptom.name);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-sm">
                          {symptom.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-100 flex justify-start">
                            {symptom.name}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-2 px-4 py-3 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Type to refine your search</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-l-md overflow-hidden hidden md:block"
      >
        <Button
          size="lg"
          className="h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg  rounded-e-full rounded-tl-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={handleSearchSubmit}
        >
          Search
        </Button>
      </motion.div>
    </div>
  );
};

export default SymptomSearchBar;

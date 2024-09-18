import React from "react";
import { FileText } from "lucide-react";

const Documents = () => {
  // This is a placeholder. In a real application, you'd fetch and display actual documents.
  const documents = [
    { id: 1, name: "Medical Report - June 2023", date: "2023-06-15" },
    { id: 2, name: "Lab Results - May 2023", date: "2023-05-20" },
    { id: 3, name: "Prescription - April 2023", date: "2023-04-10" },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">
        Documents
      </h2>
      <ul className="space-y-2">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center space-x-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <FileText size={20} className="text-blue-500" />
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                {doc.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {doc.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;

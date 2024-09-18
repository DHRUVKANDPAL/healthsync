"use client";

import React from "react";
import { FileText } from "lucide-react";
import { PatientData } from "@/components/SamplePatientData";
const documents = PatientData.documents;
const Documents = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">
        Documents
      </h2>
      <ul className="space-y-2">
        {documents.map(({ document, index }: any) => (
          <li
            key={document.id}
            className="flex items-center space-x-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <FileText size={20} className="text-blue-500" />
            <div>
              <p className="font-medium text-slate-800 dark:text-white">
                {document.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {document.date}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;

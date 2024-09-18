import React from "react";
import { FileText } from "lucide-react";

const HealthRecords = ({ records }: any) => {
  return (
    <div className="space-y-4">
      {records.map(({ record, index }: any) => (
        <div key={index} className="flex items-center space-x-2">
          <FileText className="text-gray-500" size={20} />
          <div>
            <p className="font-semibold">{record.title}</p>
            <p className="text-sm text-gray-600">{record.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthRecords;

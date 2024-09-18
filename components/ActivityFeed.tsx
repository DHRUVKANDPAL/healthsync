import React from "react";

const ActivityFeed = ({ medHis }: any) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
        Activity Feed
      </h3>
      <div className="space-y-4">
        {medHis.map(({ record, index }: any) => (
          <div
            key={index}
            className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg"
          >
            <h4 className="font-semibold text-slate-800 dark:text-white">
              {record.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              {record.description}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {new Date(record.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;

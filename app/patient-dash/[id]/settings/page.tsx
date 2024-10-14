import React from "react";

const Settings = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 h-[calc(100vh-200px)]">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-white">
        Settings
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            Notifications
          </h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-slate-600 dark:text-slate-300">
              Receive email notifications
            </span>
          </label>
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-800 dark:text-white">
            Privacy
          </h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox" />
            <span className="text-slate-600 dark:text-slate-300">
              Make profile visible to other users
            </span>
          </label>
        </div>
        {/* Add more settings options as needed */}
      </div>
    </div>
  );
};

export default Settings;

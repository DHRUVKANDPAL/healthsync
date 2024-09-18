import React from "react";
import { Bell } from "lucide-react";

const NotificationCenter = ({ notifications }: any) => {
  return (
    <div className="space-y-4">
      {notifications.map(({ notification, index }: any) => (
        <div key={index} className="flex items-start space-x-2">
          <Bell className="text-yellow-500 mt-1" size={20} />
          <div>
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-gray-600">{notification.message}</p>
            <p className="text-xs text-gray-500">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;

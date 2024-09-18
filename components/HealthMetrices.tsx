import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HealthMetrics = ({ metrics = {} }: any) => {
  // Set default values for properties
  const {
    bloodPressure = "",
    heartRate = 0,
    weight = 0,
    progressData = [],
    healthGoals = [], // Default to an empty array
  } = metrics;

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Vital Stats</h3>
        <ul className="space-y-2">
          <li>Blood Pressure: {bloodPressure}</li>
          <li>Heart Rate: {heartRate} bpm</li>
          <li>Weight: {weight} kg</li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Progress Chart</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
            <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Health Goals</h3>
        <ul className="space-y-2">
          {healthGoals.map(({ goal, index }: any) => (
            <li key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={goal.achieved}
                readOnly
                className="mr-2"
              />
              <span className={goal.achieved ? "line-through" : ""}>
                {goal.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HealthMetrics;

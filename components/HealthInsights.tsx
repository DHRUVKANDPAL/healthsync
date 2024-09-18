import React from "react";
import { Lightbulb } from "lucide-react";

const HealthInsights = ({ insights = [] }: any) => {
  // Ensure insights is an array
  if (!Array.isArray(insights)) {
    return <p>Insights data is not available.</p>;
  }

  return (
    <div className="space-y-4">
      {insights.map(({ insight, index }: any) => (
        <div key={index} className="flex items-start space-x-2">
          <Lightbulb className="text-yellow-500 mt-1" size={20} />
          <div>
            <h3 className="font-semibold">{insight.title}</h3>
            <p className="text-sm text-gray-600">{insight.description}</p>
            {insight.recommendation && (
              <p className="text-sm font-medium mt-1">
                Recommendation: {insight.recommendation}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthInsights;

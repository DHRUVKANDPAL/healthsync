import React from "react";
import { Smile, Frown, Meh } from "lucide-react";

const MentalWellbeing = ({ wellbeing }: any) => {
  const getMoodIcon = (mood: any) => {
    switch (mood) {
      case "good":
        return <Smile className="text-green-500" size={24} />;
      case "neutral":
        return <Meh className="text-yellow-500" size={24} />;
      case "bad":
        return <Frown className="text-red-500" size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span>Today's Mood:</span>
        {getMoodIcon(wellbeing.mood)}
      </div>
      <div>
        <h3 className="font-semibold">
          Stress Level: {wellbeing.stressLevel}/10
        </h3>
        <progress
          className="w-full"
          value={wellbeing.stressLevel}
          max="10"
        ></progress>
      </div>
      <div>
        <h3 className="font-semibold">
          Sleep Quality: {wellbeing.sleepQuality}/10
        </h3>
        <progress
          className="w-full"
          value={wellbeing.sleepQuality}
          max="10"
        ></progress>
      </div>
      <p>Latest Journal Entry: {wellbeing.latestJournalEntry}</p>
    </div>
  );
};

export default MentalWellbeing;

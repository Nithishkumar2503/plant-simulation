

import React, { useState } from "react";
import type { SimulationStep } from "../store/simulation.store";

interface TimelineProps {
  data: SimulationStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="card flex items-center justify-center h-64">
        <p className="text-gray-400 text-center">
          Run a simulation to see timeline
        </p>
      </div>
    );
  }

  const interval = Math.max(1, Math.floor(data.length / 10));
  const displayedDays = data.filter(
    (_, i) => i % interval === 0 || i === data.length - 1
  );

  const getHealthEmoji = (health: string): string => {
    switch (health) {
      case "Healthy":
        return "🌿";
      case "Stressed":
        return "😔";
      case "Rotting":
        return "💀";
      case "Recovering":
        return "💪";
      default:
        return "🌱";
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-plant-700 mb-6">
         Plant Timeline
      </h2>

      <div className="space-y-4">
        {displayedDays.map((step) => (
          <div
            key={step.day} 
            onClick={() =>
              setSelectedDay(selectedDay === step.day ? null : step.day)
            }
            className="cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Dot */}
              <div
                className={`w-4 h-4 rounded-full transition-all ${
                  step.health === "Healthy"
                    ? "bg-green-500"
                    : step.health === "Stressed"
                    ? "bg-yellow-500"
                    : step.health === "Rotting"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    Day {step.day}
                  </span>
                  <span className="text-xl">
                    {getHealthEmoji(step.health)}
                  </span>
                </div>

                {/* Expand section */}
                {selectedDay === step.day && (
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Growth</p>
                      <p className="font-semibold text-plant-600">
                        {step.growth.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Stress</p>
                      <p className="font-semibold text-yellow-600">
                        {step.stressLevel.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Disease</p>
                      <p className="font-semibold text-red-600">
                        {step.diseaseLevel.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bars */}
              <div className="hidden md:flex gap-2">
                <div className="text-right text-xs text-gray-600">
                  <p>{step.health}</p>
                </div>
                <div className="w-16 flex flex-col gap-1">
                  <div
                    className="h-1 bg-green-300 rounded"
                    style={{ width: `${step.growth}%` }}
                  />
                  <div
                    className="h-1 bg-yellow-300 rounded"
                    style={{ width: `${step.stressLevel}%` }}
                  />
                  <div
                    className="h-1 bg-red-300 rounded"
                    style={{ width: `${step.diseaseLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
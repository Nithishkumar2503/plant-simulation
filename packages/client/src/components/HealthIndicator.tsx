

import React from "react";
import type { SimulationStep } from "../store/simulation.store";

interface HealthIndicatorProps {
  latestStep: SimulationStep | null;
}

const getHealthColor = (
  health: "Healthy" | "Stressed" | "Rotting" | "Recovering"
): string => {
  switch (health) {
    case "Healthy":
      return "bg-green-100 text-green-800 border-green-300";
    case "Stressed":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Rotting":
      return "bg-red-100 text-red-800 border-red-300";
    case "Recovering":
      return "bg-blue-100 text-blue-800 border-blue-300";
    default:
      return "";
  }
};

const getHealthEmoji = (
  health: "Healthy" | "Stressed" | "Rotting" | "Recovering"
): string => {
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


export const HealthIndicator: React.FC<HealthIndicatorProps> = ({
  latestStep,
}) => {
  // ✅ Safe check
  if (!latestStep) {
    return (
      <div className="card">
        <p className="text-gray-400 text-center">
          Run a simulation to see health status
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-4">
      <h2 className="text-2xl font-bold text-plant-700">
        📊 Plant Status
      </h2>

      {/* Health Badge */}
      <div className="flex items-center gap-4">
        <span className="text-4xl">
          {getHealthEmoji(latestStep.health)}
        </span>
        <div>
          <p className="text-sm text-gray-600">Current Health</p>
          <span
            className={`inline-block px-4 py-2 rounded-full font-semibold border ${getHealthColor(
              latestStep.health
            )}`}
          >
            {latestStep.health}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        {/* Growth */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Growth Level</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${latestStep.growth}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            {latestStep.growth.toFixed(1)}%
          </p>
        </div>

        {/* Stress */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Stress Level</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${latestStep.stressLevel}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            {latestStep.stressLevel.toFixed(1)}%
          </p>
        </div>

        {/* Disease */}
        <div>
          <p className="text-sm text-gray-600 mb-1">Disease Level</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${latestStep.diseaseLevel}%` }}
            />
          </div>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            {latestStep.diseaseLevel.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Day */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">Final Day</p>
        <p className="text-3xl font-bold text-plant-600">
          Day {latestStep.day}
        </p>
      </div>
    </div>
  );
};
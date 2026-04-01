

import React from "react";
import { useSimulationStore } from "../store/simulation.store"; // ✅ FIXED PATH

interface ControlPanelProps {
  onRun: () => void;
  isLoading: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onRun,
  isLoading,
}) => {
  const {
    sunlight,
    water,
    days,
    setSunlight,
    setWater,
    setDays,
    reset,
  } = useSimulationStore();

  return (
    <div className="card space-y-6">
      <h2 className="text-2xl font-bold text-plant-700">
        Simulation Controls
      </h2>

      {/* Sunlight */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
           Sunlight Level
        </label>
        <select
          value={sunlight}
          onChange={(e) =>
            setSunlight(e.target.value as "Low" | "Medium" | "High")
          }
          disabled={isLoading}
          className="input-field"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Water */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Water Level
        </label>
        <select
          value={water}
          onChange={(e) =>
            setWater(e.target.value as "Low" | "Medium" | "High")
          }
          disabled={isLoading}
          className="input-field"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Days */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
           Simulation Days:{" "}
          <span className="text-plant-600">{days}</span>
        </label>
        <input
          type="range"
          min="1"
          max="365"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          disabled={isLoading}
          className="w-full h-2 bg-plant-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 day</span>
          <span>365 days</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={onRun}
          disabled={isLoading}
          className="btn-primary flex-1"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Running...
            </>
          ) : (
            <> Run Simulation</>
          )}
        </button>

        <button
          onClick={reset}
          disabled={isLoading}
          className="btn-secondary"
        >
          ↻ Reset
        </button>
      </div>
    </div>
  );
};
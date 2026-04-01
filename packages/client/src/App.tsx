

import { ControlPanel } from "./components/ControlPanel";
import { GrowthChart } from "./components/GrowthChart";
import { HealthIndicator } from "./components/HealthIndicator";
import { Timeline } from "./components/Timeline";
import { useSimulationStore } from "./store/simulation.store"; // ✅ FIXED IMPORT
import { runSimulation } from "./api/client";
import "./styles/global.css";

function App() {
  const {
    sunlight,
    water,
    days,
    results,
    isLoading,
    error,
    setResults,
    setLoading,
    setError,
  } = useSimulationStore();

  const handleRunSimulation = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await runSimulation({
        sunlight,
        water,
        days,
      });


      setResults(result?.steps || []);
    } catch (err) {
      console.error("Error running simulation:", err);

      const errorMessage =
        err instanceof Error ? err.message : "Failed to run simulation";

      setError(errorMessage);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const latestStep =
    results && results.length > 0 ? results[results.length - 1] : null;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
             Plant Simulation Engine
          </h1>
          <p className="text-gray-600">
            Watch your plant grow under different environmental conditions
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <p className="font-semibold">❌ Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-1">
            <ControlPanel onRun={handleRunSimulation} isLoading={isLoading} />
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-8">
            <HealthIndicator latestStep={latestStep} />

            {/* Safe rendering */}
            <GrowthChart data={results || []} />
            <Timeline data={results || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
import { createContext, useContext, useState } from "react";

export interface SimulationStep {
  day: number;
  growth: number;
  health: "Healthy" | "Stressed" | "Rotting" | "Recovering";
  stressLevel: number;
  diseaseLevel: number;
}

export interface SimulationState {
  sunlight: "Low" | "Medium" | "High";
  water: "Low" | "Medium" | "High";
  days: number;

  results: SimulationStep[] | null;
  isLoading: boolean;
  error: string | null;

  setSunlight: (value: "Low" | "Medium" | "High") => void;
  setWater: (value: "Low" | "Medium" | "High") => void;
  setDays: (value: number) => void;
  setResults: (results: SimulationStep[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  sunlight: "Medium" as const,
  water: "Medium" as const,
  days: 30,
  results: null,
  isLoading: false,
  error: null,
};

const SimulationContext = createContext<SimulationState | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: React.ReactNode }) => {
  const [sunlight, setSunlight] = useState<"Low" | "Medium" | "High">(initialState.sunlight);
  const [water, setWater] = useState<"Low" | "Medium" | "High">(initialState.water);
  const [days, setDaysState] = useState<number>(initialState.days);

  const [results, setResults] = useState<SimulationStep[] | null>(initialState.results);
  const [isLoading, setLoading] = useState<boolean>(initialState.isLoading);
  const [error, setError] = useState<string | null>(initialState.error);

  const setDays = (value: number) => {
    const safeValue = Math.max(1, Math.min(365, value));
    setDaysState(safeValue);
  };

  const reset = () => {
    setSunlight(initialState.sunlight);
    setWater(initialState.water);
    setDaysState(initialState.days);
    setResults(null);
    setLoading(false);
    setError(null);
  };

  return (
    <SimulationContext.Provider
      value={{
        sunlight,
        water,
        days,
        results,
        isLoading,
        error,
        setSunlight,
        setWater,
        setDays,
        setResults,
        setLoading,
        setError,
        reset,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulationStore = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulationStore must be used within SimulationProvider");
  }
  return context;
};
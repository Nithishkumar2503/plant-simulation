import type { PlantState } from "./types";


export const createInitialState = (): PlantState => ({
  growthLevel: 10,
  health: "Healthy",
  stressLevel: 0,
  diseaseLevel: 0,
  recoveryPhase: 0,
  timestamp: Date.now(),
});

export const cloneState = (state: PlantState): PlantState => ({
  ...state,
});


const clamp = (value: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));


export const setGrowthLevel = (
  state: PlantState,
  growth: number
): PlantState => ({
  ...state,
  growthLevel: clamp(growth),
});

export const setStressLevel = (
  state: PlantState,
  stress: number
): PlantState => ({
  ...state,
  stressLevel: clamp(stress),
});


export const setDiseaseLevel = (
  state: PlantState,
  disease: number
): PlantState => ({
  ...state,
  diseaseLevel: clamp(disease),
});


export const setRecoveryPhase = (
  state: PlantState,
  recovery: number
): PlantState => ({
  ...state,
  recoveryPhase: clamp(recovery),
});

export const updateHealthStatus = (state: PlantState): PlantState => {
  let health = state.health;

  if (state.diseaseLevel > 50) {
    health = "Rotting";
  } else if (state.recoveryPhase > 0 && state.diseaseLevel < 30) {
    health = "Recovering";
  } else if (state.stressLevel > 60) {
    health = "Stressed";
  } else {
    health = "Healthy";
  }

  return {
    ...state,
    health,
  };
};

export const incrementDay = (state: PlantState): PlantState => ({
  ...state,
  timestamp: state.timestamp + 1,
});
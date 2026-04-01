

import { setDiseaseLevel, setGrowthLevel, setRecoveryPhase, setStressLevel } from "../core/state-manager";
import type { Rule, PlantState, EnvironmentFactors } from "../core/types";


export const waterStressRule: Rule = {
  name: "water-stress",
  description: "Low water causes stress and growth reduction",
  priority: 100,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return env.water === "Low";
  },
  effect: (state: PlantState) => {
    let newState = setStressLevel(state, state.stressLevel + 15);
    // Reduce growth by 5 points
    newState = setGrowthLevel(
      newState,
      newState.growthLevel - 5
    );
    return newState;
  },
};


export const sunlightDeficiencyRule: Rule = {
  name: "sunlight-deficiency",
  description: "Low sunlight severely reduces growth",
  priority: 100,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return env.sunlight === "Low";
  },
  effect: (state: PlantState) => {
    // Severely reduce growth
    let newState = setGrowthLevel(
      state,
      state.growthLevel - 8
    );
    // Add stress
    newState = setStressLevel(state, state.stressLevel + 10);
    return newState;
  },
};

export const optimalGrowthRule: Rule = {
  name: "optimal-growth",
  description: "Good conditions promote plant growth",
  priority: 90,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return (
      (env.sunlight === "Medium" || env.sunlight === "High") &&
      (env.water === "Medium" || env.water === "High")
    );
  },
  effect: (state: PlantState) => {
    // Healthy growth
    let newState = setGrowthLevel(
      state,
      state.growthLevel + 12
    );
    // Reduce stress
    newState = setStressLevel(
      newState,
      Math.max(0, state.stressLevel - 5)
    );
    // Slight disease reduction
    newState = setDiseaseLevel(
      newState,
      Math.max(0, state.diseaseLevel - 2)
    );
    return newState;
  },
};


export const diseaseDevelopmentRule: Rule = {
  name: "disease-development",
  description: "Prolonged stress leads to disease",
  priority: 80,
  condition: (state: PlantState) => {
    return state.stressLevel > 70;
  },
  effect: (state: PlantState) => {
    let newState = setDiseaseLevel(
      state,
      state.diseaseLevel + 8
    );
    // Disease further reduces growth
    newState = setGrowthLevel(
      newState,
      Math.max(0, newState.growthLevel - 3)
    );
    return newState;
  },
};

export const diseaseProgressionRule: Rule = {
  name: "disease-progression",
  description: "Established disease continues to damage plant",
  priority: 85,
  condition: (state: PlantState) => {
    return state.diseaseLevel > 30;
  },
  effect: (state: PlantState) => {
    // Disease progresses
    let newState = setDiseaseLevel(
      state,
      Math.min(100, state.diseaseLevel + 5)
    );
    // Growth declines
    newState = setGrowthLevel(
      newState,
      Math.max(0, newState.growthLevel - 6)
    );
    return newState;
  },
};

export const recoveryInitiationRule: Rule = {
  name: "recovery-initiation",
  description: "Good conditions can initiate recovery from disease",
  priority: 95,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return (
      state.diseaseLevel > 10 &&
      state.diseaseLevel < 60 &&
      env.sunlight === "High" &&
      env.water === "High"
    );
  },
  effect: (state: PlantState) => {
    let newState = setRecoveryPhase(
      state,
      state.recoveryPhase + 15
    );
    // Disease slowly reduces with recovery
    newState = setDiseaseLevel(
      newState,
      Math.max(0, state.diseaseLevel - 8)
    );
    return newState;
  },
};


export const recoveryProgressionRule: Rule = {
  name: "recovery-progression",
  description: "Recovery continues with good conditions",
  priority: 80,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return (
      state.recoveryPhase > 0 &&
      (env.sunlight === "Medium" || env.sunlight === "High") &&
      (env.water === "Medium" || env.water === "High")
    );
  },
  effect: (state: PlantState) => {
    // Continue recovery
    let newState = setRecoveryPhase(
      state,
      Math.min(100, state.recoveryPhase + 10)
    );
    // Reduce disease
    newState = setDiseaseLevel(
      newState,
      Math.max(0, state.diseaseLevel - 5)
    );
    // Modest growth
    newState = setGrowthLevel(
      newState,
      state.growthLevel + 3
    );
    return newState;
  },
};

export const recoveryCompletionRule: Rule = {
  name: "recovery-completion",
  description: "Plant fully recovers when recovery phase completes",
  priority: 70,
  condition: (state: PlantState) => {
    return state.recoveryPhase >= 80 && state.diseaseLevel < 10;
  },
  effect: (state: PlantState) => {
    let newState = setRecoveryPhase(newState, 0);
    // Reset disease
    newState = setDiseaseLevel(newState, 0);
    return newState;
  },
};

export const stressRecoveryRule: Rule = {
  name: "stress-recovery",
  description: "Good conditions reduce stress over time",
  priority: 75,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return (
      state.stressLevel > 0 &&
      env.sunlight !== "Low" &&
      env.water !== "Low"
    );
  },
  effect: (state: PlantState) => {
    return setStressLevel(
      state,
      Math.max(0, state.stressLevel - 8)
    );
  },
};

export const extremeConditionsRule: Rule = {
  name: "extreme-conditions",
  description: "Extreme neglect causes severe damage",
  priority: 110,
  condition: (state: PlantState, env: EnvironmentFactors) => {
    return env.water === "Low" && env.sunlight === "Low";
  },
  effect: (state: PlantState) => {
    let newState = setStressLevel(
      state,
      Math.min(100, state.stressLevel + 20)
    );
    newState = setGrowthLevel(
      newState,
      Math.max(0, newState.growthLevel - 10)
    );
    newState = setDiseaseLevel(
      newState,
      Math.min(100, newState.diseaseLevel + 10)
    );
    return newState;
  },
};


export function getDefaultRules(): Rule[] {
  return [
    waterStressRule,
    sunlightDeficiencyRule,
    optimalGrowthRule,
    diseaseDevelopmentRule,
    diseaseProgressionRule,
    recoveryInitiationRule,
    recoveryProgressionRule,
    recoveryCompletionRule,
    stressRecoveryRule,
    extremeConditionsRule,
  ];
}

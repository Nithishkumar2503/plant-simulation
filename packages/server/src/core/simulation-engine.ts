import { createInitialState,updateHealthStatus,incrementDay } from "./state-manager";
import type {
  EnvironmentFactors,
  PlantState,
  SimulationResult,
  SimulationStep,
} from "./types.js";

type RuleExecutor = (
  state: PlantState,
  environment: EnvironmentFactors
) => PlantState;

export const createSimulationEngine = (ruleExecutor: RuleExecutor) => {
  let stateHistory: PlantState[] = [];

  return {
    simulate(
      days: number,
      environment: EnvironmentFactors
    ): SimulationResult {
      stateHistory = [];

      let currentState = createInitialState();
      stateHistory.push(currentState);

      const steps: SimulationStep[] = [];

      // Simulation loop
      for (let day = 1; day <= days; day++) {
        // Apply rules
        currentState = ruleExecutor(currentState, environment);

        // Update health
        currentState = updateHealthStatus(currentState);

        // Increment day
        currentState = incrementDay(currentState);

        // Save history
        stateHistory.push(currentState);

        // Record step
        steps.push({
          day,
          growth: currentState.growthLevel,
          health: currentState.health,
          stressLevel: currentState.stressLevel,
          diseaseLevel: currentState.diseaseLevel,
        });
      }

      return {
        steps,
        finalState: currentState,
      };
    },

    getStateHistory(): PlantState[] {
      return [...stateHistory];
    },

    getStateAtDay(day: number): PlantState | undefined {
      return stateHistory[day];
    },

    clearHistory(): void {
      stateHistory = [];
    },
  };
};
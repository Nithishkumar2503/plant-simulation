
export type EnvironmentInput = "Low" | "Medium" | "High";

export type HealthStatus = "Healthy" | "Stressed" | "Rotting" | "Recovering";

export interface EnvironmentFactors {
  sunlight: EnvironmentInput;
  water: EnvironmentInput;
}

export interface PlantState {
  growthLevel: number;
  health: HealthStatus;
  stressLevel: number;
  diseaseLevel: number; 
  recoveryPhase: number;
  timestamp: number;
}

export interface SimulationStep {
  day: number;
  growth: number;
  health: HealthStatus;
  stressLevel: number;
  diseaseLevel: number;
}

export interface SimulationResult {
  steps: SimulationStep[];
  finalState: PlantState;
}

export interface RuleCondition {
  (state: PlantState, environment: EnvironmentFactors): boolean;
}

export interface RuleEffect {
  (state: PlantState): PlantState;
}

export interface Rule {
  name: string;
  description: string;
  condition: RuleCondition;
  effect: RuleEffect;
  priority: number; 
}

export interface RuleEngineConfig {
  rules: Rule[];
}

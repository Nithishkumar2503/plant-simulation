import { createSimulationEngine } from "../core/simulation-engine.js";
import { createRuleEngine } from "../core/rule-engine.js";
import { getDefaultRules } from "../rules/plant-growth.rules.js";
import type { EnvironmentFactors } from "../core/types.js";

const setupRuleEngine = () => {
  const engine = createRuleEngine();
  engine.registerBatch(getDefaultRules());
  return engine;
};

export const runSimulation = (
  days: number,
  environment: EnvironmentFactors
) => {
  const ruleEngine = setupRuleEngine();

  const simulationEngine = createSimulationEngine(
    ruleEngine.execute
  );

  const result = simulationEngine.simulate(days, environment);

  return {
    steps: result.steps,
    finalState: result.finalState,
  };
};


export const getRules = () => {
  const ruleEngine = setupRuleEngine();

  return ruleEngine.getRules().map((rule) => ({
    name: rule.name,
    description: rule.description,
    priority: rule.priority,
  }));
};

export const healthCheck = () => ({
  status: "ok",
  timestamp: new Date().toISOString(),
});
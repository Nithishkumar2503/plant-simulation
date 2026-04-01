import type { Rule, PlantState, EnvironmentFactors } from "./types";

export const createRuleEngine = () => {
  let rules: Rule[] = [];

  const sortByPriority = () => {
    rules.sort((a, b) => b.priority - a.priority);
  };

  return {
    // Register a single rule
    register(rule: Rule): void {
      rules.push(rule);
      sortByPriority();
    },

    // Register multiple rules
    registerBatch(newRules: Rule[]): void {
      rules.push(...newRules);
      sortByPriority();
    },

    // Remove rule by name
    unregister(ruleName: string): boolean {
      const initialLength = rules.length;
      rules = rules.filter((rule) => rule.name !== ruleName);
      return rules.length < initialLength;
    },

    // Get all rules (immutable)
    getRules(): Rule[] {
      return [...rules];
    },

    // Execute rules
    execute(
      state: PlantState,
      environment: EnvironmentFactors
    ): PlantState {
      let newState = state;

      for (const rule of rules) {
        if (rule.condition(newState, environment)) {
          newState = rule.effect(newState);
        }
      }

      return newState;
    },

    // Get applicable rules
    getApplicableRules(
      state: PlantState,
      environment: EnvironmentFactors
    ): Rule[] {
      return rules.filter((rule) =>
        rule.condition(state, environment)
      );
    },

    // Clear all rules
    clear(): void {
      rules = [];
    },
  };
};
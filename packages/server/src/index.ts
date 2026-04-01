import express from "express";
import cors from "cors";

import { createSimulationEngine } from "./core/simulation-engine.js";
import { createRuleEngine } from "./core/rule-engine.js";
import { getDefaultRules } from "./rules/plant-growth.rules.js";
import { SimulationInputSchema } from "./validators/simulation.validator.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const setupSimulation = () => {
  const ruleEngine = createRuleEngine();
  ruleEngine.registerBatch(getDefaultRules());

  const simulationEngine = createSimulationEngine(
    ruleEngine.execute
  );

  return simulationEngine;
};

app.post("/simulate", (req, res) => {
  try {
    const input = SimulationInputSchema.parse(req.body);

    const simulationEngine = setupSimulation();

    const result = simulationEngine.simulate(input.days, {
      sunlight: input.sunlight,
      water: input.water,
    });


    res.json(result);
  } catch (err: any) {
    console.error(err);

    res.status(400).json({
      error: err.message || "Invalid request",
    });
  }
});

app.get("/rules", (req, res) => {
  const ruleEngine = createRuleEngine();
  ruleEngine.registerBatch(getDefaultRules());

  res.json(
    ruleEngine.getRules().map((rule) => ({
      name: rule.name,
      description: rule.description,
      priority: rule.priority,
    }))
  );
});

app.get("/health", (req, res) => {
  
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
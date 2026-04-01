/**
 * Input Validation Schemas
 * Using Zod for runtime type safety
 */

import { z } from "zod";

export const EnvironmentInputSchema = z.enum(["Low", "Medium", "High"]);

export const SimulationInputSchema = z.object({
  sunlight: EnvironmentInputSchema,
  water: EnvironmentInputSchema,
  days: z.number().int().min(1).max(365),
});

export const SimulationStepSchema = z.object({
  day: z.number().int(),
  growth: z.number().min(0).max(100),
  health: z.enum(["Healthy", "Stressed", "Rotting", "Recovering"]),
  stressLevel: z.number().min(0).max(100),
  diseaseLevel: z.number().min(0).max(100),
});

export const SimulationResultSchema = z.object({
  steps: z.array(SimulationStepSchema),
  finalState: z.object({
    growthLevel: z.number(),
    health: z.enum(["Healthy", "Stressed", "Rotting", "Recovering"]),
    stressLevel: z.number(),
    diseaseLevel: z.number(),
    recoveryPhase: z.number(),
    timestamp: z.number(),
  }),
});

export type SimulationInput = z.infer<typeof SimulationInputSchema>;
export type SimulationResult = z.infer<typeof SimulationResultSchema>;

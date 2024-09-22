import * as Joi from "joi";
import { ModuleStructure } from "./types";

export const moduleSchema = Joi.object<ModuleStructure>().pattern(
  Joi.string(),
  Joi.object({
    domain: Joi.object({
      entity: Joi.object({
        aggregate: Joi.array().items(Joi.string()),
        "value-object": Joi.array().items(Joi.string()),
      }),
      repository: Joi.array().items(Joi.string()),
    }),
    application: Joi.object({
      service: Joi.object({
        command: Joi.array().items(Joi.string()),
        query: Joi.array().items(Joi.string()),
      }),
    }),
    infrastructure: Joi.object({
      repository: Joi.array().items(Joi.string()),
    }),
    interface: Joi.object({
      graphql: Joi.array().items(Joi.string()),
    }),
  })
);
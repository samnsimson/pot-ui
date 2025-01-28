import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { HTTPValidationError } from "./common";
import { ValidationError } from "./common";

const AppOutSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    secret: z.string(),
    is_active: z.boolean(),
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
  })
  .passthrough();

export const schemas = {
  AppOutSchema,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/apps",
    alias: "get_apps_get",
    requestFormat: "json",
    response: z.unknown(),
  },
  {
    method: "post",
    path: "/apps",
    alias: "create_app_apps_post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ name: z.string() }).passthrough(),
      },
    ],
    response: AppOutSchema,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const AppsApi = new Zodios("http://localhost:8000/api/v1", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

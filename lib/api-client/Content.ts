import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { HTTPValidationError } from "./common";
import { ValidationError } from "./common";

type ContentOutSchema = {
  id: string;
  key: string;
  value?: ((unknown | null) | Array<unknown | null>) | undefined;
  app_id: string;
  parent_id?: ((string | null) | Array<string | null>) | undefined;
  created_at: string;
  updated_at: string;
  children?: Array<ContentOutSchema> | undefined;
};

const ContentOutSchema: z.ZodType<ContentOutSchema> = z.lazy(() =>
  z
    .object({
      id: z.string().uuid(),
      key: z.string(),
      value: z.union([z.unknown(), z.null()]).optional(),
      app_id: z.string().uuid(),
      parent_id: z.union([z.string(), z.null()]).optional(),
      created_at: z.string().datetime({ offset: true }),
      updated_at: z.string().datetime({ offset: true }),
      children: z.array(ContentOutSchema).optional().default([]),
    })
    .passthrough()
);
const ContentCreateSchema = z
  .object({
    key: z.string(),
    value: z.union([z.unknown(), z.null()]).optional(),
    parent_id: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();

export const schemas = {
  ContentOutSchema,
  ContentCreateSchema,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/content/:app_id",
    alias: "create_content_content__app_id__post",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ContentCreateSchema,
      },
      {
        name: "app_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: ContentOutSchema,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/content/:app_id",
    alias: "get_content_content__app_id__get",
    requestFormat: "json",
    parameters: [
      {
        name: "app_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.array(ContentOutSchema),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const ContentApi = new Zodios("http://localhost:8000/api/v1", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

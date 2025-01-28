import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

import { HTTPValidationError } from "./common";
import { ValidationError } from "./common";
import { DomainCreateSchema } from "./common";

type UserOutSchema = {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: Role;
  created_at: string;
  updated_at: string;
};
type UserCreateSchema = {
  username: string;
  email: string;
  phone: string;
  password: string;
  domain?:
    | ((DomainCreateSchema | null) | Array<DomainCreateSchema | null>)
    | undefined;
};
type Role = {
  id?: string | undefined;
  name: RoleEnum;
};
type RoleEnum = "user" | "admin" | "super_admin";

const RoleEnum = z.enum(["user", "admin", "super_admin"]);
const Role: z.ZodType<Role> = z
  .object({ id: z.string().optional(), name: RoleEnum })
  .passthrough();
const UserCreateSchema: z.ZodType<UserCreateSchema> = z
  .object({
    username: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6).max(16),
    domain: z.union([DomainCreateSchema, z.null()]).optional(),
  })
  .passthrough();
const UserOutSchema: z.ZodType<UserOutSchema> = z
  .object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    phone: z.string(),
    role: Role,
    created_at: z.string().datetime({ offset: true }),
    updated_at: z.string().datetime({ offset: true }),
  })
  .passthrough();
const LoginResponseSchema = z
  .object({ access_token: z.string(), token_type: z.string() })
  .passthrough();
const Body_login = z
  .object({
    grant_type: z.union([z.string(), z.null()]).optional(),
    username: z.string(),
    password: z.string(),
    scope: z.string().optional().default(""),
    client_id: z.union([z.string(), z.null()]).optional(),
    client_secret: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();

export const schemas = {
  RoleEnum,
  Role,
  UserCreateSchema,
  UserOutSchema,
  LoginResponseSchema,
  Body_login,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/auth/login",
    alias: "login",
    requestFormat: "form-url",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: Body_login,
      },
    ],
    response: LoginResponseSchema,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "post",
    path: "/auth/register",
    alias: "signup",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UserCreateSchema,
      },
    ],
    response: UserOutSchema,
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
    path: "/auth/token/refresh",
    alias: "refresh_token_auth_token_refresh_get",
    requestFormat: "json",
    response: LoginResponseSchema,
  },
]);

export const AuthApi = new Zodios("http://localhost:8000/api/v1", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}

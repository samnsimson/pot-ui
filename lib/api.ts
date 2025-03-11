import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

type AuthResponseSchema = {
    status: string;
    user_id: string;
    host: string;
    role: RoleEnum;
    redirect_url: (string | null) | Array<string | null>;
    access_token: string;
    refresh_token: string;
    token_type: string;
    token_max_age: number;
};
type RoleEnum = "user" | "admin" | "super_admin";
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
type HTTPValidationError = Partial<{
    detail: Array<ValidationError>;
}>;
type ValidationError = {
    loc: Array<(string | number) | Array<string | number>>;
    msg: string;
    type: string;
};
type UserCreateSchema = {
    username: string;
    email: string;
    phone: string;
    password: string;
    domain: DomainCreateSchema;
};
type DomainCreateSchema = {
    name: string;
    host: string;
};

const Body_login = z
    .object({
        grant_type: z.union([z.string(), z.null()]).optional(),
        username: z.string(),
        password: z.string(),
        scope: z.string().optional().default(""),
        client_id: z.union([z.string(), z.null()]).optional(),
        client_secret: z.union([z.string(), z.null()]).optional(),
    })
    .strict()
    .passthrough();
const RoleEnum = z.enum(["user", "admin", "super_admin"]);
const AuthResponseSchema: z.ZodType<AuthResponseSchema> = z
    .object({
        status: z.string(),
        user_id: z.string(),
        host: z.string(),
        role: RoleEnum,
        redirect_url: z.union([z.string(), z.null()]),
        access_token: z.string(),
        refresh_token: z.string(),
        token_type: z.string(),
        token_max_age: z.number(),
    })
    .strict()
    .passthrough();
const ValidationError: z.ZodType<ValidationError> = z
    .object({ loc: z.array(z.union([z.string(), z.number()])), msg: z.string(), type: z.string() })
    .strict()
    .passthrough();
const HTTPValidationError: z.ZodType<HTTPValidationError> = z
    .object({ detail: z.array(ValidationError) })
    .partial()
    .strict()
    .passthrough();
const DomainCreateSchema: z.ZodType<DomainCreateSchema> = z
    .object({ name: z.string().min(1), host: z.string() })
    .strict()
    .passthrough();
const UserCreateSchema: z.ZodType<UserCreateSchema> = z
    .object({ username: z.string(), email: z.string().email(), phone: z.string(), password: z.string().min(6).max(16), domain: DomainCreateSchema })
    .strict()
    .passthrough();
const UserOutSchema = z
    .object({
        id: z.string().uuid(),
        username: z.string(),
        email: z.string().email(),
        phone: z.string(),
        created_at: z.string().datetime({ offset: true }),
        updated_at: z.string().datetime({ offset: true }),
    })
    .strict()
    .passthrough();
const RefreshBody = z.object({ token: z.string() }).strict().passthrough();
const AppOutSchema = z
    .object({
        id: z.string().uuid(),
        name: z.string(),
        slug: z.string(),
        secret: z.string(),
        is_active: z.boolean(),
        created_at: z.string().datetime({ offset: true }),
        updated_at: z.string().datetime({ offset: true }),
    })
    .strict()
    .passthrough();
const AppCreateSchema = z.object({ name: z.string() }).strict().passthrough();
const key = z.union([z.string(), z.string()]);
const AppDeleteOutSchema = z.object({ id: z.string().uuid(), status: z.string() }).strict().passthrough();
const ContentCreateSchema = z
    .object({ key: z.string(), value: z.union([z.unknown(), z.null()]).optional(), parent_id: z.union([z.string(), z.null()]).optional() })
    .strict()
    .passthrough();
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
        .strict()
        .passthrough()
);
const DomainOutSchema = z
    .object({
        id: z.string().uuid(),
        name: z.string().min(1),
        host: z.string(),
        created_at: z.string().datetime({ offset: true }),
        updated_at: z.string().datetime({ offset: true }),
    })
    .strict()
    .passthrough();

export const schemas = {
    Body_login,
    RoleEnum,
    AuthResponseSchema,
    ValidationError,
    HTTPValidationError,
    DomainCreateSchema,
    UserCreateSchema,
    UserOutSchema,
    RefreshBody,
    AppOutSchema,
    AppCreateSchema,
    key,
    AppDeleteOutSchema,
    ContentCreateSchema,
    ContentOutSchema,
    DomainOutSchema,
};

const endpoints = makeApi([
    {
        method: "get",
        path: "/apps",
        alias: "list_apps",
        requestFormat: "json",
        response: z.array(AppOutSchema),
    },
    {
        method: "post",
        path: "/apps",
        alias: "create_app",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ name: z.string() }).strict().passthrough(),
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
    {
        method: "delete",
        path: "/apps/:id",
        alias: "delete_app",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.string().uuid(),
            },
        ],
        response: AppDeleteOutSchema,
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
        path: "/apps/:id/users",
        alias: "get_app_users",
        requestFormat: "json",
        parameters: [
            {
                name: "id",
                type: "Path",
                schema: z.string().uuid(),
            },
        ],
        response: z.array(UserOutSchema),
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
        path: "/apps/:key",
        alias: "get_app_by_id_or_slug",
        requestFormat: "json",
        parameters: [
            {
                name: "key",
                type: "Path",
                schema: key,
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
        response: AuthResponseSchema,
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
        method: "post",
        path: "/auth/token/refresh",
        alias: "refresh_token",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: z.object({ token: z.string() }).strict().passthrough(),
            },
        ],
        response: AuthResponseSchema,
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
        path: "/content/:app_id",
        alias: "create_content",
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
        alias: "get_content",
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
    {
        method: "post",
        path: "/domain",
        alias: "create_domain",
        requestFormat: "json",
        parameters: [
            {
                name: "body",
                type: "Body",
                schema: DomainCreateSchema,
            },
        ],
        response: DomainOutSchema,
        errors: [
            {
                status: 422,
                description: `Validation Error`,
                schema: HTTPValidationError,
            },
        ],
    },
]);

export const api = new Zodios("http://localhost:8000/api/v1", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}

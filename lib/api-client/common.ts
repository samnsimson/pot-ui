import { z } from "zod";

export type HTTPValidationError = Partial<{
  detail: Array<ValidationError>;
}>;
export type ValidationError = {
  loc: Array<(string | number) | Array<string | number>>;
  msg: string;
  type: string;
};
export type DomainCreateSchema = {
  name: string;
  host: string;
};

export const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
export const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();
export const DomainCreateSchema = z
  .object({ name: z.string().min(1), host: z.string() })
  .passthrough();

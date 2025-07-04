import type { AxiosError } from "axios";
import { z } from "zod";
import type { SigninFormSchema, SignupFormSchema } from "./model/formSchema";

type FieldsKeys =
  | keyof z.infer<typeof SigninFormSchema>
  | keyof z.infer<typeof SignupFormSchema>;

export type FormFieldsTypes = {
  [k in FieldsKeys]?: string[];
};

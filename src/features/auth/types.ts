import { z } from "zod";
import type { SigninFormSchema, SignupFormSchema } from "./model/formSchema";

type FormFieldsKeys = keyof z.infer<typeof SignupFormSchema>;

export type ValidationFormFieldsTypes = {
  [k in FormFieldsKeys]?: string[];
};

export interface BaseFormLayoutProps {
  schema: typeof SigninFormSchema | typeof SignupFormSchema;
  confirmField?: boolean;
  serverValidationErrors: ValidationFormFieldsTypes | null;
}

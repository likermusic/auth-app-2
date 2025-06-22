import { z } from "zod";

const formShemaConst = {
  emailMin: 6,
  passwordMin: 4,
  passwordMax: 20,
} as const;

export const BaseFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(
      formShemaConst.emailMin,
      `Email must be at least ${formShemaConst.emailMin} characters.`,
    ),
  password: z
    .string()
    .min(
      formShemaConst.passwordMin,
      `Password must not be less than ${formShemaConst.passwordMin} characters.`,
    )
    .max(
      formShemaConst.passwordMax,
      `Password must not be more than ${formShemaConst.passwordMax} characters.`,
    )
    .regex(/[A-Z]/, "Password must contain capital characters.")
    .regex(/[a-z]/, "Password must contain small characters.")
    .regex(/[0-9]/, "Password must contain numeric characters."),
});

export const SignupFormSchema = BaseFormSchema.extend({
  confirmPassword: z
    .string()
    .min(
      formShemaConst.passwordMin,
      `Password must not be less than ${formShemaConst.passwordMin} characters.`,
    )
    .max(
      formShemaConst.passwordMax,
      `Password must not be more than ${formShemaConst.passwordMax} characters.`,
    )
    .regex(/[A-Z]/, "Password must contain capital characters.")
    .regex(/[a-z]/, "Password must contain small characters.")
    .regex(/[0-9]/, "Password must contain numeric characters."),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const SigninFormSchema = BaseFormSchema;

export type SignupFormData = z.infer<typeof SignupFormSchema>;
export type SigninFormData = z.infer<typeof SigninFormSchema>;

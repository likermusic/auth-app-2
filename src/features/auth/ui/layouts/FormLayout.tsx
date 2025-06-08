import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailMin = 6;
const passwordMin = 4;
const passwordMax = 20;

const FormSchema = z.object({
  email: z
    .string()
    .email()
    .min(emailMin, `Email must be at least ${emailMin} characters.`),
  password: z
    .string()
    .min(
      passwordMin,
      `Password must not be less than ${passwordMin} characters.`,
    )
    .max(
      passwordMax,
      `Password must not be more than ${passwordMax} characters.`,
    )
    .regex(/[A-Z]/, "Password must contain capital characters.")
    .regex(/[a-z]/, "Password must contain small characters.")
    .regex(/[0-9]/, "Password must contain numeric characters."),

  confirmPassword: z
    .string()
    .min(
      passwordMin,
      `Password must not be less than ${passwordMin} characters.`,
    )
    .max(
      passwordMax,
      `Password must not be more than ${passwordMax} characters.`,
    )
    .regex(/[A-Z]/, "Password must contain capital characters.")
    .regex(/[a-z]/, "Password must contain small characters.")
    .regex(/[0-9]/, "Password must contain numeric characters.")
    .optional(),
});

interface FormLayoutProps {
  title: string;
  onSubmit: (data: FormData) => void;
  confirmField?: boolean;
}

type FormData = z.infer<typeof FormSchema>;

export const FormLayout = ({
  title,
  onSubmit,
  confirmField,
}: FormLayoutProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  // const onSubmit = () => {
  //   console.log("Sumbit");
  // };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className="relative text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="text-white"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 text-gray-500" />
                      ) : (
                        <Eye className="h-3 w-3 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {confirmField && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Password</FormLabel> */}
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Confirm password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="text-white"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-3 w-3 text-gray-500" />
                        ) : (
                          <Eye className="h-3 w-3 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button className="border border-zinc-500 rounded-xl" type="submit">
            {title}
          </Button>
        </form>
      </Form>
    </div>
  );
};

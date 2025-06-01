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
import React from "react";
import { useForm } from "react-hook-form";

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
});

export const SigninForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = () => {
    console.log("Sumbit");
  };

  return (
    <div>
      <label htmlFor="">SigninForm</label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

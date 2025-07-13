import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { useState } from "react";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

const jwt_secret = process.env.JWT_SECRET;

const formSchemaConst = {
  emailMin: 6,
  passwordMin: 4,
  passwordMax: 20,
};

const passwordSchema = z
  .string()
  .min(
    formSchemaConst.passwordMin,
    `Password must not be less than ${formSchemaConst.passwordMin} characters.`,
  )
  .max(
    formSchemaConst.passwordMax,
    `Password must not be more than ${formSchemaConst.passwordMax} characters.`,
  )
  .regex(/[A-Z]/, "Password must contain capital characters.")
  .regex(/[a-z]/, "Password must contain small characters.")
  .regex(/[0-9]/, "Password must contain numeric characters.");

const BaseFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(
      formSchemaConst.emailMin,
      `Email must be at least ${formSchemaConst.emailMin} characters.`,
    ),
  password: passwordSchema,
});

export const SigninFormSchema = BaseFormSchema;

export const SignupFormSchema = BaseFormSchema.extend({
  confirmPassword: passwordSchema.optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

app.get("/", (req, resp) => {
  console.log(12345);

  resp.status(200).json({
    id: 2,
    name: "Alex",
  });
});

app.post("/signin", async (req, resp) => {
  const result = SigninFormSchema.safeParse(req.body);
  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return resp.status(401).json({ error: "Email is not correct" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return resp.status(401).json({ error: "Password is not correct" });
  }

  const token = jwt.sign({ id: user.id }, jwt_secret, {
    expiresIn: "1h",
  });

  return resp
    .status(200)
    .json({ token, user: { id: user.id, email: user.email } });
});

app.post("/signup", async (req, resp) => {
  // return resp.status(400).json({ error: result.error.flatten().fieldErrors });

  // return resp.status(400).json({ error: "Email is already exist" });

  // console.log(jwt_secret);

  // req.body = {
  //   email: "sda.ru",
  //   password: "124",
  //   confirmPassword: "124",
  // };
  const result = SignupFormSchema.safeParse(req.body);

  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { email, password } = result.data;

  const isUserExists = await prisma.user.findUnique({ where: { email } });
  if (isUserExists) {
    return resp.status(400).json({ error: "Email is already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  if (newUser) {
    const token = jwt.sign({ id: newUser.id }, jwt_secret, {
      expiresIn: "1h",
    });

    return resp
      .status(201)
      .json({ token, user: { id: newUser.id, email: newUser.email } });
  } else {
    return resp.status(500).json({ error: "Server error" });
  }
});

app.listen(4000, () => console.log("Server started"));

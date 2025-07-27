import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { useState } from "react";
import cookieParser from "cookie-parser";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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

const generateTockens = (id, email) => {
  const token = jwt.sign({ id, email }, jwt_secret, {
    expiresIn: "1h",
  });

  return { token };
};

app.post("/api/signin", async (req, resp) => {
  // const randomBit = Math.round(Math.random());
  // if (randomBit === 0) {
  //   req.body = {
  //     email: "sda.ru",
  //     password: "124",
  //     confirmPassword: "124",
  //   };
  // }
  const result = SigninFormSchema.safeParse(req.body);
  if (!result.success) {
    return resp.status(400).json({ error: result.error.flatten().fieldErrors });
  }

  const { email, password } = result.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return resp.status(401).json({ error: "Email is not correct" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return resp.status(401).json({ error: "Password is not correct" });
    }

    console.log(111);
    const { token } = generateTockens(user.id, user.email);

    // return resp
    //   .status(200)
    //   .json({ token, user: { id: user.id, email: user.email } });

    return resp
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: { id: user.id, email: user.email } });
  } catch (err) {
    return resp.status(500).json({ error: "Server error" });
  }
});

app.post("/api/signup", async (req, resp) => {
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

  try {
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
      const { token } = generateTockens(newUser.id, newUser.email);

      return resp
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
          maxAge: 60 * 60 * 1000,
        })
        .status(201)
        .json({ user: { id: user.id, email: user.email } });
    } else {
      throw new Error();
    }
  } catch {
    return resp.status(500).json({ error: "Server error" });
  }
});

const checkAuth = (req, resp, next) => {
  const messages = {
    notFoundToken: "Token is not found",
    invalidToken: "Invalid token",
  };

  try {
    const token = req.cookies.token;

    if (!token) {
      throw new Error(messages.notFoundToken);
    }

    jwt.verify(token, jwt_secret, (err, user) => {
      if (err) {
        // return resp.status(401).json({ error: "Invalid token" });
        throw new Error(messages.invalidToken);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return resp.status(401).json({ error: error.message });
  }

  // next();
};

app.get("/api/protected", checkAuth, async (req, resp) => {
  return resp
    .status(200)
    .json({ user: { id: req.user.id, email: req.user.email } });
});

app.listen(4000, () => console.log("Server started"));

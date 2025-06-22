import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, resp) => {
  console.log(12345);

  resp.status(200).json({
    id: 2,
    name: "Alex",
  });
});

app.post("/signin", (req, resp) => {
  if (!req.body.email || !req.body.password) {
    return resp
      .status(400)
      .json({ error: "Вы должны передать email и password" });
  }
  const { email, password } = req.body;
  const users = [
    { email: "admin@mail.ru", password: "Pdsd676" },
    { email: "user@mail.ru", password: "1234" },
  ];
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );
  if (user) {
    resp.status(200).json({ message: "Вы успешно авторизованы" });
  } else {
    resp.status(401).json({ error: "Пользователь не найден" });
  }
});

app.post("/signup", async (req, resp) => {
  console.log("SIGNUP");

  // if (!req.body.email || !req.body.password) {
  //   return resp
  //     .status(400)
  //     .json({ error: "Вы должны передать email и password" });
  // }
  // const { email, password } = req.body;
  const email = "sda@mail.ru";
  const password = "1232HJhn";

  const isUserExists = await prisma.user.findUnique({ where: { email } });
  if (isUserExists) {
    return resp.status(400).json({ error: "Login is already exist" });
  }

  await prisma.user.create({
    data: {
      email,
      password,
    },
  });
  return resp.status(200).json({ message: "OK" });

  // const users = [
  //   { email: "admin@mail.ru", password: "1234" },
  //   { email: "user@mail.ru", password: "1234" },
  // ];
  // const user = users.some(
  //   (user) => user.email === email && user.password === password,
  // );
  // if (user) {
  //   resp.status(400).json({ error: "Пользователь уже существует" });
  // } else {
  //   users.push({ email, password });
  //   resp.status(201).json({ message: "Вы успешно зарегистрировались" });
  // }
});

app.listen(4000, () => console.log("Server started"));

import express from "express";
import cors from "cors";

const app = express();
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
    { email: "admin@mail.ru", password: "1234" },
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

app.post("/signup", (req, resp) => {
  if (!req.body.email || !req.body.password) {
    return resp
      .status(400)
      .json({ error: "Вы должны передать email и password" });
  }
  const { email, password } = req.body;
  const users = [
    { email: "admin@mail.ru", password: "1234" },
    { email: "user@mail.ru", password: "1234" },
  ];
  const user = users.some(
    (user) => user.email === email && user.password === password,
  );
  if (user) {
    resp.status(400).json({ error: "Пользователь уже существует" });
  } else {
    users.push({ email, password });
    resp.status(201).json({ message: "Вы успешно зарегистрировались" });
  }
});

app.listen(4000, () => console.log("Server started"));

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

app.listen(4000, () => console.log("Server started"));

import express from "express";
import handleError from "./middleware/error.middleware";
import { authenticate } from "./middleware/auth.middleware";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });

  return;
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Proctected!" });

  return;
});

app.use(handleError);

app.listen(PORT, () => {
  return console.log(`Express is listening at https://localhost:${PORT}`);
});

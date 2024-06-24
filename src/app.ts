import express from "express";
import handleError from "./middleware/error.middleware";
import { authenticate } from "./middleware/auth.middleware";
import usersRouter from "./users/users.controller";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });

  return;
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Proctected!" });

  return;
});

app.use("/users", usersRouter);

app.use(handleError);

export default app;

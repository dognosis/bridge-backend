import express from "express";
import cors from "cors";
import handleError from "./middleware/error.middleware";
import { authenticate } from "./middleware/auth.middleware";
import usersRouter from "./users/users.controller";
import dogsRouter from "./dogs/dogs.controller";

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });

  return;
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Proctected!" });

  return;
});

app.use("/users", usersRouter);
app.use("/dogs", dogsRouter);

app.use(handleError);

export default app;

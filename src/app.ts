import "express-async-errors";
import "./sentry";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import handleError from "./middleware/error.middleware";
import { authenticate } from "./middleware/auth.middleware";
import usersRouter from "./users/users.controller";
import dogsRouter from "./dogs/dogs.controller";
import sessionsRouter from "./sessions/sessions.controller";
import runsRouter from "./runs/runs.controller";
import sniffsRouter from "./sniffs/sniffs.controller";
import sampleSetRouter from "./sample-set/sample-set.controller";
import bodyParser from "body-parser";
import { createServer } from "http";
import socket from "./socket";
import loggerMiddleware from "./middleware/logger.middleware";

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(loggerMiddleware);

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
app.use("/sample-set", sampleSetRouter);
app.use("/sessions", sessionsRouter);
app.use("/runs", runsRouter);
app.use("/sniffs", sniffsRouter);

app.locals.activeSessionId = "";

app.use(handleError);

const server = createServer(app);
socket.connect(server);

export default server;

import { Router } from "express";
import validateData from "../middleware/validate.middleware";
import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import { authenticate } from "../middleware/auth.middleware";
import SessionsRepository from "./sessions.repository";
import prisma from "../database";
import SessionsService from "./sessions.service";

const router = Router();
router.use(authenticate);

const sessionsRepository = new SessionsRepository(prisma);
const sessionsService = new SessionsService(sessionsRepository);

router.post("/", validateData(CreateSessionDto), async (req, res) => {
  const trainerId = req.user?.id as string;
  const data = req.body as CreateSessionDto;

  const session = await sessionsService.startNewSession(trainerId, data);
  res.status(201).json(session);
  return;
});

router.patch(
  "/:sessionId/end",
  validateData(EndSessionDto),
  async (req, res) => {
    const { sessionId } = req.params;
    const data = req.body as EndSessionDto;

    const session = await sessionsService.endSession(sessionId, data);
    res.status(200).json(session);
    return;
  }
);

router.get("/:sessionId/run-count", async (req, res) => {
  const { sessionId } = req.params;

  const runCount = await sessionsService.getRunCount(sessionId);
  res.status(200).json({ runCount });
  return;
});

export default router;

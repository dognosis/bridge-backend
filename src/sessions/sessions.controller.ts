import { Router } from "express";
import validateData from "../middleware/validate.middleware";
import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import { authenticate } from "../middleware/auth.middleware";
import SessionsRepository from "./sessions.repository";
import prisma from "../database";
import SessionsService from "./sessions.service";
import SampleSetService from "../sample-set/sample-set.service";
import SampleSetRepository from "../sample-set/sample-set.repository";

const router = Router();
router.use(authenticate);

const sessionsRepository = new SessionsRepository(prisma);

const sampleSetRepository = new SampleSetRepository(prisma);
const sampleSetService = new SampleSetService(sampleSetRepository);
const sessionsService = new SessionsService(
  sessionsRepository,
  sampleSetService
);

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

export default router;

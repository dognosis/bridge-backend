import { Router } from "express";
import validateData from "../middleware/validate.middleware";
import { CreateRunDto, EndRunDto, UpdateRunDto } from "./runs.dto";
import { authenticate } from "../middleware/auth.middleware";
import RunsRepository from "./runs.repository";
import prisma from "../database";
import RunsService from "./runs.service";

const router = Router();
router.use(authenticate);

const runsRepository = new RunsRepository(prisma);
const runsService = new RunsService(runsRepository);

router.post("/", validateData(CreateRunDto), async (req, res) => {
  const data = req.body as CreateRunDto;

  const run = await runsService.startNewRun(data);
  res.status(201).json(run);
  return;
});

router.patch("/:runId", validateData(UpdateRunDto), async (req, res) => {
  const { runId } = req.params;
  const data = req.body as UpdateRunDto;

  const run = await runsService.editRun(runId, data);
  res.status(200).json(run);
  return;
});

router.patch("/:runId/end", validateData(EndRunDto), async (req, res) => {
  const { runId } = req.params;
  const data = req.body as EndRunDto;

  const run = await runsService.endRun(runId, data);
  res.status(200).json(run);
  return;
});

export default router;

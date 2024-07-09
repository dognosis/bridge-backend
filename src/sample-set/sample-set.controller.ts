import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import SampleSetRepository from "./sample-set.repository";
import SampleSetService from "./sample-set.service";
import prisma from "../database";
import validateData from "../middleware/validate.middleware";
import { SampleSetDto } from "./sample-set.dto";

const router = Router();
router.use(authenticate);

const sampleSetRepository = new SampleSetRepository(prisma);
const sampleSetService = new SampleSetService(sampleSetRepository);

router.post("/", validateData(SampleSetDto), async (req, res) => {
  const data = req.body as SampleSetDto;

  const sampleSet = await sampleSetService.createSampleSet(data);
  res.status(201).json(sampleSet);
  return;
});

export default router;

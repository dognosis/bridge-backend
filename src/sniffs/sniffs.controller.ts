import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import SniffsRepository from "./sniffs.repository";
import prisma from "../database";
import SniffsService from "./sniffs.service";
import RunsRepository from "../runs/runs.repository";
import validateData from "../middleware/validate.middleware";
import { CreateSniffDto, UpdateSniffDto } from "./sniffs.dto";

const router = Router();
router.use(authenticate);

const runsRepository = new RunsRepository(prisma);
const sniffsRepository = new SniffsRepository(prisma);
const sniffsService = new SniffsService(sniffsRepository, runsRepository);

router.post("/", validateData(CreateSniffDto), async (req, res) => {
  const data = req.body as CreateSniffDto;

  const sniff = await sniffsService.logSniff(data);

  res.status(201).json(sniff);
  return;
});

router.patch("/:sniffId", validateData(UpdateSniffDto), async (req, res) => {
  const { sniffId } = req.params;
  const data = req.body as UpdateSniffDto;

  const sniff = await sniffsService.updateSniff(sniffId, data);
  res.status(200).json(sniff);
  return;
});

router.delete("/:sniffId", async (req, res) => {
  const { sniffId } = req.params;

  const sniff = await sniffsService.deleteSniff(sniffId);
  res.status(200).json(sniff);
  return;
});

export default router;

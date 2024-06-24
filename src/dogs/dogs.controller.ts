import { Router } from "express";
import prisma from "../database";
import DogsRepository from "./dogs.repository";
import DogsService from "./dogs.service";

const router = Router();

const dogsRepository = new DogsRepository(prisma);
const dogsService = new DogsService(dogsRepository);

router.get("/", async (req, res) => {
  const dogs = await dogsService.listAll();

  return res.json(dogs);
});

export default router;

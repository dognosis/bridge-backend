import { Router } from "express";
import prisma from "../database";
import UsersRepository from "./users.repository";
import UsersService from "./users.service";

const router = Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);

router.get("/", async (req, res) => {
  const users = await usersService.listAll();

  return res.json(users);
});

export default router;

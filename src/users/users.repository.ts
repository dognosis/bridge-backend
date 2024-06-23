import { PrismaClient, User, Prisma } from "@prisma/client";
import { Repository } from "../interfaces/repository";

class UsersRepository implements Repository<User> {
  constructor(private prisma: PrismaClient) {}

  async getAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }
}

export default UsersRepository;

import { Dog, PrismaClient } from "@prisma/client";
import { Repository } from "../interfaces/repository";

class DogsRepository implements Repository<Dog> {
  constructor(private prisma: PrismaClient) {}

  async getAll() {
    const dogs = await this.prisma.dog.findMany();

    return dogs;
  }
}

export default DogsRepository;

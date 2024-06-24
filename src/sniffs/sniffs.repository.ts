import { PrismaClient, Sniff } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import { CreateSniffWithResultDto } from "./sniffs.dto";

class SniffsRepository implements Repository<Sniff> {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSniffWithResultDto) {
    const sniff = await this.prisma.sniff.create({
      data: data,
    });

    return sniff;
  }
}

export default SniffsRepository;

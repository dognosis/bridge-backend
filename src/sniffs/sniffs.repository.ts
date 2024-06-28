import { PrismaClient, Sniff } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import {
  CreateSniffWithResultDto,
  UpdateSniffWithResultDto,
} from "./sniffs.dto";

class SniffsRepository implements Repository<Sniff> {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSniffWithResultDto) {
    const sniff = await this.prisma.sniff.create({
      data: data,
    });

    return sniff;
  }

  async get(id: string) {
    const sniff = await this.prisma.sniff.findUnique({
      where: {
        id: id,
      },
    });

    return sniff;
  }

  async update(id: string, data: UpdateSniffWithResultDto) {
    const sniff = await this.prisma.sniff.update({
      where: {
        id: id,
      },
      data: data,
    });

    return sniff;
  }

  async delete(id: string) {
    const sniff = await this.prisma.sniff.delete({
      where: {
        id: id,
      },
    });

    return sniff;
  }
}

export default SniffsRepository;

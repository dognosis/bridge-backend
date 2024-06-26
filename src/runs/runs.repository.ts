import { PrismaClient, Run } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import { CreateRunDto, UpdateRunDbDto } from "./runs.dto";

class RunsRepository implements Repository<Run> {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateRunDto) {
    const dbData = {
      ...data,
      sample_battery: {
        create: data["sample_battery"],
      },
    };

    const run = await this.prisma.run.create({
      data: dbData,
    });

    return run;
  }

  async get(id: string) {
    const run = await this.prisma.run.findUnique({
      where: {
        id: id,
      },
    });

    return run;
  }

  async update(id: string, data: UpdateRunDbDto) {
    const dbData = {
      ...data,
      sample_battery: {
        create: data["sample_battery"],
      },
    };

    const run = await this.prisma.run.update({
      where: {
        id: id,
      },
      data: dbData,
    });

    return run;
  }
}

export default RunsRepository;

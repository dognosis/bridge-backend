import { PrismaClient, SampleSet } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import { SampleSetDbDto } from "./sample-set.dto";

class SampleSetRepository implements Repository<SampleSet> {
  constructor(private prisma: PrismaClient) {}

  async create(data: SampleSetDbDto): Promise<SampleSet> {
    const sampleSet = await this.prisma.sampleSet.create({
      data: data,
    });

    return sampleSet;
  }

  async getByDate(date: string) {
    const sampleSet = await this.prisma.sampleSet.findUnique({
      where: {
        date: date,
      },
    });

    return sampleSet;
  }
}

export default SampleSetRepository;

import { PrismaClient, Session } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import {
  CreateSessionWithTrainerIdDto,
  UpdateSessionDbDto,
} from "./sessions.dto";

class SessionsRepository implements Repository<Session> {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSessionWithTrainerIdDto) {
    const session = await this.prisma.session.create({
      data: data,
    });

    return session;
  }

  async update(id: string, data: UpdateSessionDbDto) {
    const session = await this.prisma.session.update({
      where: {
        id: id,
      },
      data: data,
    });

    return session;
  }

  async getRunCount(id: string): Promise<Number> {
    const runsCount = await this.prisma.session.findUnique({
      where: {
        id: id,
      },
      select: {
        _count: {
          select: { runs: true },
        },
      },
    });

    return runsCount?._count.runs ?? 0;
  }
}

export default SessionsRepository;

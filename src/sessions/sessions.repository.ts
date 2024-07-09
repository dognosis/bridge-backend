import { PrismaClient, Session } from "@prisma/client";
import { Repository } from "../interfaces/repository";
import { CreateSessionDbDto, UpdateSessionDbDto } from "./sessions.dto";

class SessionsRepository implements Repository<Session> {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateSessionDbDto) {
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
}

export default SessionsRepository;

import { emit } from "../socket";
import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import SessionsRepository from "./sessions.repository";

class SessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  async startNewSession(trainer_id: string, data: CreateSessionDto) {
    const { ir_mode, ...dbData } = data;
    const session = await this.sessionsRepository.create({
      trainer_id,
      ...dbData,
    });

    emit("session_start", { ...session, ir_mode });

    return { ...session, ir_mode };
  }

  async endSession(id: string, data: EndSessionDto) {
    const session = await this.sessionsRepository.update(id, data);

    emit("session_end", session);

    return session;
  }

  async getRunCount(id: string) {
    const runCount = await this.sessionsRepository.getRunCount(id);

    return runCount;
  }
}

export default SessionsService;

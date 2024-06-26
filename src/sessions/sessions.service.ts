import { emit } from "../socket";
import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import SessionsRepository from "./sessions.repository";

class SessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  async startNewSession(trainer_id: string, data: CreateSessionDto) {
    const session = await this.sessionsRepository.create({
      trainer_id,
      ...data,
    });

    emit("session_start", session);

    return session;
  }

  async endSession(id: string, data: EndSessionDto) {
    const session = await this.sessionsRepository.update(id, data);

    emit("session_end", session);

    return session;
  }
}

export default SessionsService;

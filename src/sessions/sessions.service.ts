import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import SessionsRepository from "./sessions.repository";

class SessionsService {
  constructor(private sessionsRepository: SessionsRepository) {}

  async startNewSession(trainer_id: string, data: CreateSessionDto) {
    const session = await this.sessionsRepository.create({
      trainer_id,
      ...data,
    });

    return session;
  }

  async endSession(id: string, data: EndSessionDto) {
    const session = await this.sessionsRepository.update(id, data);

    return session;
  }
}

export default SessionsService;

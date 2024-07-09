import HttpExpception from "../exceptions/HttpException";
import SampleSetService from "../sample-set/sample-set.service";
import { emit } from "../socket";
import { CreateSessionDto, EndSessionDto } from "./sessions.dto";
import SessionsRepository from "./sessions.repository";

class SessionsService {
  constructor(
    private sessionsRepository: SessionsRepository,
    private sampleSetService: SampleSetService
  ) {}

  async startNewSession(trainer_id: string, data: CreateSessionDto) {
    const date = data.start_time.split("T")[0];
    const sampleSet = await this.sampleSetService.getSampleSetByDate(date);

    if (sampleSet === null) {
      throw new HttpExpception(
        400,
        "Please create a sample set for today before starting a session"
      );
    }

    const session = await this.sessionsRepository.create({
      ...data,
      trainer_id,
      sample_set_id: sampleSet.id,
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

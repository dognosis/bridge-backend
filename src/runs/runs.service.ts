import { emit } from "../socket";
import { CreateRunDto, EndRunDto, UpdateRunDto } from "./runs.dto";
import RunsRepository from "./runs.repository";

class RunsService {
  constructor(private runsRepository: RunsRepository) {}

  async startNewRun(data: CreateRunDto) {
    const run = await this.runsRepository.create(data);

    emit("run_start", run);

    return run;
  }

  async editRun(id: string, data: UpdateRunDto) {
    const run = await this.runsRepository.update(id, data);

    return run;
  }

  async endRun(id: string, data: EndRunDto) {
    const run = await this.runsRepository.update(id, data);

    emit("run_end", run);

    return run;
  }
}

export default RunsService;

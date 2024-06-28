import HttpExpception from "../exceptions/HttpException";
import RunsRepository from "../runs/runs.repository";
import { emit } from "../socket";
import { CreateSniffDto, UpdateSniffDto } from "./sniffs.dto";
import SniffsRepository from "./sniffs.repository";

class SniffsService {
  constructor(
    private sniffsRepository: SniffsRepository,
    private runsRepository: RunsRepository
  ) {}

  async logSniff(data: CreateSniffDto) {
    const runId = data.run_id;

    const run = await this.runsRepository.get(runId);

    if (!run) {
      throw new HttpExpception(500, "Something went wrong");
    }

    const positiveStations: string[] = JSON.parse(run.positive_stations);

    const result = this.getSniffResult(
      positiveStations,
      data.station,
      data.is_positive_indication
    );

    const sniff = await this.sniffsRepository.create({ result, ...data });

    emit("sniff", sniff);

    return sniff;
  }

  async updateSniff(id: string, data: UpdateSniffDto) {
    const oldSniff = await this.sniffsRepository.get(id);
    if (!oldSniff) {
      throw new HttpExpception(404, "Sniff not found");
    }

    const run = await this.runsRepository.get(oldSniff?.run_id);
    if (!run) {
      throw new HttpExpception(500, "Something went wrong");
    }

    const positiveStations: string[] = JSON.parse(run.positive_stations);
    const result = this.getSniffResult(
      positiveStations,
      oldSniff.station,
      data.is_positive_indication
    );

    const sniff = await this.sniffsRepository.update(id, { result, ...data });

    emit("sniff", sniff);

    return sniff;
  }

  async deleteSniff(id: string) {
    const sniff = await this.sniffsRepository.delete(id);

    emit("sniff_delete", sniff);

    return sniff;
  }

  private getSniffResult(
    positive_stations: string[],
    station: string,
    is_positive_indication: boolean
  ): string {
    if (is_positive_indication && positive_stations.includes(station)) {
      return "true_positive";
    } else if (is_positive_indication && !positive_stations.includes(station)) {
      return "false_positive";
    } else if (!is_positive_indication && positive_stations.includes(station)) {
      return "false_negative";
    } else {
      return "true_negative";
    }
  }
}

export default SniffsService;

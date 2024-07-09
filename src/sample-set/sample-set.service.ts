import { SampleSetDto } from "./sample-set.dto";
import SampleSetRepository from "./sample-set.repository";

class SampleSetService {
  constructor(private sampleSetRepository: SampleSetRepository) {}

  async createSampleSet(data: SampleSetDto) {
    const sampleSet = await this.sampleSetRepository.create({
      ...data,
      sample_ehr_uids: JSON.stringify(data.sample_ehr_uids),
      date: data.date_time.split("T")[0],
    });

    return sampleSet;
  }

  async getSampleSetByDate(date: string) {
    const sampleSet = await this.sampleSetRepository.getByDate(date);

    return sampleSet;
  }
}

export default SampleSetService;

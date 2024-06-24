import DogsRepository from "./dogs.repository";

class DogsService {
  constructor(private dogsRepository: DogsRepository) {}

  async listAll() {
    const users = this.dogsRepository.getAll();

    return users;
  }
}

export default DogsService;

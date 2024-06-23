import UsersRepository from "./users.repository";

class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async listAll() {
    const users = this.usersRepository.getAll();

    return users;
  }
}

export default UsersService;

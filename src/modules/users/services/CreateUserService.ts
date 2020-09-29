import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email adrres already used.');
    }

    const hasherdPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hasherdPassword,
    });

    return user;
  }
}

export default CreateUserService;

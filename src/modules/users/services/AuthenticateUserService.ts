import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const passwordMathed = await compare(password, user.password);
    if (!passwordMathed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expireIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expireIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;

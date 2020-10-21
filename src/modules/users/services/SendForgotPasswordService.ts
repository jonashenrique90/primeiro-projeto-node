import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import User from '@modules/users/infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) { }

  public async execute({ email }: Request): Promise<void> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);
    if (!checkUsersExists) {
      throw new AppError('User does not exists.');
    }
    const { token } = await this.usersTokensRepository.generate(
      checkUsersExists.id,
    );
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: checkUsersExists.name,
        email: checkUsersExists.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: checkUsersExists.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordService;

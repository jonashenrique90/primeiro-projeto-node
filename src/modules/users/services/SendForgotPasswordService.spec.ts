import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository';
import SendForgotPasswordService from './SendForgotPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let sendForgotPassword: SendForgotPasswordService;

describe('SendForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();

    sendForgotPassword = new SendForgotPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokensRepository,
    );
  });
  it('should be able to send recober the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'jondoe@jon.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPassword.execute({
        email: 'jondoe@jon.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    await sendForgotPassword.execute({
      email: 'jondoe@jon.com',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

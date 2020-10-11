import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authUserService: AuthenticateUserService;

describe('AuthenticationUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('shold be able to authenticate a user', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    const response = await authUserService.execute({
      email: 'jondoe@jon.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to authenticate with non existing user', async () => {
    await expect(
      authUserService.execute({
        email: 'jondoe@jon.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate a user with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    await expect(
      authUserService.execute({
        email: 'jondoe@jon.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

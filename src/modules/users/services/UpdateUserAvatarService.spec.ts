import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update a userAvatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar.jpg',
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update a userAvatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        fileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be able to delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jondoe@jon.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar2.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});

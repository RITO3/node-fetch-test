// node-fetchをモック化.
import fetchMock from 'jest-fetch-mock';
jest.setMock('node-fetch', fetchMock);

import { TestApi } from './test-api';
import { User } from './user';
describe('TestApi', () => {
  let api: TestApi;

  const URL = 'http://localhost:3000';

  beforeEach(() => {
    api = new TestApi(URL);
  });

  describe('getUsers', () => {
    it('[正常系]ユーザ(複数)を取得できる.', async () => {
      const mockUsers: User[] = [];
      for (let i = 0; i < 3; i++) {
        const user = new User();
        user.id = i + 1;
        user.name = `ユーザ${i + 1}`;
        mockUsers.push(user);
      }

      fetchMock.mockResponse(JSON.stringify(mockUsers), { status: 200 });

      const users = await api.getUsers();
      expect(users.length).toBe(mockUsers.length);
    });

    it('[異常系]ユーザ(複数)を取得できない.', async () => {
      fetchMock.mockResponse('エラー', { status: 400 });
      await expect(api.getUsers()).rejects.toThrow();
    });
  });

  describe('getUser', () => {
    it('[正常系]ユーザ(単体)を取得できる.', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.name = 'ユーザあああ';

      fetchMock
        .mockIf(`${URL}/users/1`)
        .mockResponse(JSON.stringify(mockUser), { status: 200 });

      const user = await api.getUser(1);
      expect(user.id).toBe(mockUser.id);
      expect(user.name).toBe(mockUser.name);
    });

    it('[異常系]ユーザ(単体)を取得できない.', async () => {
      fetchMock
        .mockIf(`${URL}/users/1`)
        .mockResponse('エラー', { status: 400 });

      await expect(api.getUser(1)).rejects.toThrow();
    });
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });
});

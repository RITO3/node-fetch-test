import { default as fetch } from 'node-fetch';
import { User } from './user';

export class TestApi {
  constructor(private url: string) {}

  public async getUsers(): Promise<User[]> {
    const res = await fetch(`${this.url}/users`);
    if (res.status != 200) {
      throw new Error(`エラー:${res.status}`);
    }

    const users: User[] = await res.json();

    return users;
  }

  public async getUser(userId: number): Promise<User> {
    const res = await fetch(`${this.url}/users/${userId}`);
    if (res.status != 200) {
      throw new Error(`エラー:${res.status}`);
    }
    const user: User = await res.json();
    return user;
  }
}

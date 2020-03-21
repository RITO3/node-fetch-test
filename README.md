# node-fetchのテスト方法

node-fetchのテスト方法についてまとめる.

## 環境構築

TypeScript、Jestをインストールする.

```sh
npm install --save-dev typescript
npm install --save-dev @types/node
npm install --save-dev ts-jest
npm install --save-dev jest-html-reporters
npm install --save-dev jest-junit
```

ESLintのインストール.

```sh
npm install --save-dev eslint
npm install --save-dev prettier
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
npm install --save-dev @typescript-eslint/eslint-plugin
npm install --save-dev @typescript-eslint/parser
```

jscpdのインストール.

```sh
npm install --save-dev jscpd
npm install --save-dev jscpd-badge-reporter
```

clocのインストール.

```sh
npm install --save-dev cloc
```

node-fetchのインストール.

```sh
npm install --save node-fetch
npm install --save-dev @types/node-fetch
```

## 書き方

テストコードの先頭に以下のコードを記載する.

```typescript
// node-fetchをモック化.
import fetchMock from 'jest-fetch-mock';
jest.setMock('node-fetch', fetchMock);
```

node-fetchを使用したときのモックは以下のように記述する.

```typescript
fetchMock.mockResponse(JSON.stringify(mockUsers), { status: 200 });
```

これにより、node-fetchで```fetch```関数を呼び出したときには上で記述したレスポンスが返される.

通信するURLによって、返すレスポンスの内容を指定したい場合には```mockIf```を使用する.

```typescript
const URL = 'http://localhost:3000';
const mockUser = new User();
mockUser.id = 1;
mockUser.name = 'あああ';
fetchMock.mockIf(`${URL}/users/1`).mockResponse(JSON.stringify(mockUser), { status: 200 });
```

これにより、```http://localhost:3000/users/1```に対してfetchした場合に、```mockUser```の値がレスポンスとして返される.

## 参考URL

以下のURLを参考にしました.

- Jest unit testing with components that use node-fetch
  - <https://medium.com/@mattiaerre/jest-unit-testing-with-components-that-use-node-fetch-711f8e9a0337>
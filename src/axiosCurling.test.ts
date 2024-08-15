import { describe, it } from 'vitest';
import server, { SERVER_ADDRESS } from './mocks/server';
import axiosCurling from '.';
import axios from 'axios';

server.listen();

describe('axiosCurling', () => {
  // TODO: Test by spying on console.log
  it('should log curl command for GET request', async () => {
    const instance = axios.create();
    axiosCurling(instance);
    await instance.get(SERVER_ADDRESS.DATA);
  });
});

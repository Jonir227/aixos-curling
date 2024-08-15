import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const BASE_URL = 'https://test.com';

export const SERVER_ADDRESS = {
  DATA: `${BASE_URL}/data`,
};

const handlers = [
  http.get(SERVER_ADDRESS.DATA, () => {
    return HttpResponse.json({
      data: 'this is data',
    });
  }),
  http.post(SERVER_ADDRESS.DATA, (data) => {
    return HttpResponse.json({
      headers: data.request.headers,
      body: data.request.body,
    });
  }),
];

const server = setupServer(...handlers);

export default server;

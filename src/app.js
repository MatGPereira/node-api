import { toJson } from './middlewares/to-json.js';
import { routes } from './routes.js';

async function app(req, res) {
  await toJson(req, res);

  const { method, url } = req;
  const route = routes.find(
    route => route.method === method && route.path === url,
  );

  if (route) {
    route.handler(req, res);
  }

  return res
    .writeHead(404)
    .end(JSON.stringify({ errorCode: 404, message: 'Not found!' }));
}

export { app };

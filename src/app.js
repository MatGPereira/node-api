import { toJson } from './middlewares/to-json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-routes.js';

async function app(req, res) {
  await toJson(req, res);

  const { method, url } = req;
  const route = routes.find(
    route => route.method === method && route.path.test(url),
  );

  if (route) {
    const routeParams = url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res
    .writeHead(404)
    .end(JSON.stringify({ errorCode: 404, message: 'Not found!' }));
}

export { app };

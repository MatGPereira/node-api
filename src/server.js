import { randomUUID } from 'node:crypto';
import http from 'node:http';

import { toJson } from './middlewares/to-json.js';
import { Database } from './database/database.js';

const database = new Database();
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await toJson(req, res);

  if (method === 'GET' && url === '/tasks') {
    return res.writeHead(200).end(JSON.stringify(database));
  }

  if (method === 'POST' && url === '/tasks') {
    const { title, description } = req.body;
    const task = database.insert('tasks', {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      completed_at: null,
      updated_at: null,
    });

    return res.writeHead(201).end(JSON.stringify(task));
  }

  return res
    .writeHead(404)
    .end(JSON.stringify({ errorCode: 404, message: 'Not found!' }));
});

server.listen(3333);

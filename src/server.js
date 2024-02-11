import { randomUUID } from 'node:crypto';
import http from 'node:http';

const database = [];
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/tasks') {
    return res.writeHead(200).end(JSON.stringify(database));
  }

  if (method === 'POST' && url === '/tasks') {
    const task = {
      id: randomUUID(),
      title: 'Example title',
      description: 'Example description',
      completed_at: null,
      created_at: new Date(),
      updated_at: null,
    };
    database.push(task);

    return res.writeHead(201).end(JSON.stringify(task));
  }

  return res
    .writeHead(404)
    .end(JSON.stringify({ errorCode: 404, message: 'Not found!' }));
});

server.listen(3333);

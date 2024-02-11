import { randomUUID } from 'node:crypto';

import { Database } from './database/database.js';
import { buildRoute } from './utils/build-route-path.js';

const database = new Database();
const routes = [
  {
    method: 'GET',
    path: buildRoute('/tasks'),
    handler(req, res) {
      const { title, description } = req.query;
      const tasks = database.select(
        'tasks',
        title || description ? { title, description } : null,
      );

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoute('/tasks'),
    handler(req, res) {
      const { title, description } = req.body;

      const tasks = database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: null,
        completed_at: null,
      });

      return res.writeHead(201).end(JSON.stringify(tasks));
    },
  },
];

export { routes };

import { Database } from './database/database.js';

const database = new Database();
const routes = [
  {
    method: 'GET',
    path: '/tasks',
    async handler(_, res) {
      const tasks = database.selectAll('tasks');

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    async handler(_, res) {
      const tasks = database.selectAll('tasks');

      return res.writeHead(201).end(JSON.stringify(tasks));
    },
  },
];

export { routes };

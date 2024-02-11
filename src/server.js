import http from 'node:http';

import { app } from './app.js';

const server = http.createServer(async (req, res) => await app(req, res));

server.listen(3333);

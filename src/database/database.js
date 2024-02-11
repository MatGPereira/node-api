import fs from 'node:fs/promises';

import { DATABASE_PATH } from '../env.js';

class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, 'utf-8')
      .then(data => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  selectAll(table) {
    const tableData = this.#database[table] ?? [];

    return tableData;
  }

  insert(table, data) {
    const doesTableExists = Array.isArray(this.#database[table]);

    if (doesTableExists) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}

export { Database };

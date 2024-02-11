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

  select(table, queryParams) {
    const tableData = this.#database[table] ?? [];

    if (queryParams) {
      return tableData.filter(
        row =>
          row.title === queryParams.title ||
          row.description === queryParams.description ||
          (row.title === queryParams.title &&
            row.description === queryParams.description &&
            queryParams !== null),
      );
    }

    return tableData;
  }

  findById(table, id) {
    const task = this.#database[table].find(row => {
      return row.id === id;
    });

    return task;
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

  deleteById(table, id) {
    const rowIndex = this.#database[table].findIndex(row => {
      return row.id === id;
    });

    this.#database[table].splice(rowIndex, 1);
    this.#persist();
  }
}

export { Database };

import { randomUUID } from 'node:crypto';

class InMemoryTasksRepository {
  items = [];

  create(task) {
    const newTask = {
      id: task.id ?? randomUUID(),
      title: task.title,
      description: task.description,
      created_at: new Date(),
      updated_at: null,
      completed_at: null,
    };

    this.items.push(newTask);

    return newTask;
  }

  fetchTasksWith(params) {
    return this.items.filter(row => {
      if (!params) return this.items;
      return (
        row.title === params.title || row.description === params.description
      );
    });
  }
}

export { InMemoryTasksRepository };

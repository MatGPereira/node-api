import { expect, describe, it, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository.js';
import { FetchTasksUseCase } from './fetch-tasks-use-case.js';
import { CreateTasksUseCase } from './create-task-use-case.js';

let sut;
let inMemoryTasksRepository;
// eslint-disable-next-line no-unused-vars
let createTasksUseCase;

describe(`#${FetchTasksUseCase.name}`, () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    createTasksUseCase = new CreateTasksUseCase(inMemoryTasksRepository);
    sut = new FetchTasksUseCase(inMemoryTasksRepository);
  });

  it('should fetch a tasks', () => {
    for (let i = 0; i < 21; i++) {
      createTasksUseCase.execute({
        title: `Example-${i}`,
        description: faker.lorem.paragraph(),
      });
    }

    const { tasks } = sut.execute();

    expect(tasks).toHaveLength(21);
  });

  it('should fetch a tasks with params', () => {
    for (let i = 0; i < 21; i++) {
      createTasksUseCase.execute({
        title: `Example-${i}`,
        description: faker.lorem.paragraph(),
      });
    }

    const { tasks } = sut.execute({ title: 'Example-1' });

    expect(tasks).toHaveLength(1);
    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'Example-1',
        description: expect.any(String),
      }),
    ]);
  });
});

import { expect, describe, it, beforeEach } from 'vitest';
import { faker } from '@faker-js/faker';

import { CreateTasksUseCase } from './create-task-use-case.js';
import { InMemoryTasksRepository } from '../repositories/in-memory/in-memory-tasks-repository.js';

let sut;
let inMemoryTasksRepository;

describe(`#${CreateTasksUseCase.name}`, () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    sut = new CreateTasksUseCase(inMemoryTasksRepository);
  });

  it('should create a task', () => {
    const { task } = sut.execute({
      title: faker.lorem.word(),
      description: faker.lorem.paragraph(),
    });

    expect(task.id).toBeTruthy();
    expect(task).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        created_at: expect.any(Date),
        completed_at: null,
        updated_at: null,
      }),
    );
  });

  it('should not create a task when title and description are empty or non-existent', () => {
    expect(() => sut.execute({})).toThrow();
  });
});

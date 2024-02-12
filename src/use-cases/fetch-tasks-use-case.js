class FetchTasksUseCase {
  constructor(tasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  execute(query) {
    const tasks = this.tasksRepository.fetchTasksWith(query);

    return { tasks };
  }
}

export { FetchTasksUseCase };

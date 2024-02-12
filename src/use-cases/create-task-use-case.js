class CreateTasksUseCase {
  constructor(taskRepository) {
    this.tasksRepository = taskRepository;
  }

  execute({ title, description }) {
    if (!(title || description)) {
      throw new Error('The title and description fields need to be filled in');
    }

    const task = this.tasksRepository.create({ title, description });

    return { task };
  }
}

export { CreateTasksUseCase };

import { v4 as uuid } from 'uuid';

class Task {
  id = '';
  desc = '';
  completedAt = null;

  constructor(description) {
    this.desc = description;
    this.id = uuid();
    this.completedAt = null;
  }
}

export default Task;

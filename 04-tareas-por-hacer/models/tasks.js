/**
 * _list:
 *     { 'uuid-12345-23453-2': {id:12, desc: asd, completedAt: 12345}}
 *
 */

import Task from './task.js';

class Tasks {
  _list = {};

  get listToArr() {
    const newList = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      newList.push(task);
    });
    return newList;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });

    return this._list;
  }

  createTask(description = '') {
    const task = new Task(description);
    this._list[task.id] = task;

    return this._list[task.id];
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  listCompletedTasks() {
    // this.listToArr.forEach((task, i) => {
    //   const idx = `${i + 1}`.green;
    //   const { desc, completedAt } = task;
    //   const state = completedAt ? 'Completed'.green : 'Pending'.red;

    //   return console.log(`${idx} ${desc} :: ${state}`);
    // });
    return this.filterTaskBy('completed');
  }

  listPendingTask() {
    return this.filterTaskBy('pending');
  }

  toggleCompletedTasks(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listToArr.forEach(({ id }) => {
      if (!ids.includes(id)) {
        this._list[id].completedAt = null;
      }
    });
  }

  filterTaskBy(state = 'completed') {
    let counter = 1;

    return this.listToArr
      .filter(({ completedAt }) => {
        if (state === 'completed') return completedAt;
        if (state === 'pending') return !completedAt;
      })
      .forEach((item) => {
        const { completedAt, desc } = item;

        const currentState = completedAt
          ? `completed at ${completedAt}`.green
          : 'pending'.red;

        const message = `${(counter + '.').green} ${desc} :: ${currentState}`;

        if (state === 'completed') {
          if (completedAt) {
            counter++;
            return console.log(message);
          }
        } else {
          if (!completedAt) {
            counter++;
            return console.log(message);
          }
        }
      });
  }
}

export default Tasks;

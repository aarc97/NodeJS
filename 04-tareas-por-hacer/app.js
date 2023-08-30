import {
  confirmAction,
  inquirerMenu,
  listDeletedTasks,
  pause,
  readInput,
  showChecklistTasks,
} from './helpers/inquirer.js';
import { readDB, saveDB } from './helpers/saveFile.js';
import Tasks from './models/tasks.js';
// const { showMenu, pauseCli } = require('./helpers/messages');

console.clear();

const main = async () => {
  let option = '';
  const tasks = new Tasks();
  const taskDB = readDB();

  if (taskDB) {
    tasks.loadTasksFromArray(taskDB);
  }

  // await pause();

  do {
    option = await inquirerMenu();
    switch (option) {
      case '1':
        const description = await readInput('Description: ');
        const res = tasks.createTask(description);
        console.log('Created', res);
        break;
      case '2':
        console.log(tasks._list);
        break;
      case '3':
        tasks.listCompletedTasks();
        break;
      case '4':
        tasks.listPendingTask();
        break;
      case '5':
        const ids = await showChecklistTasks(tasks.listToArr);
        tasks.toggleCompletedTasks(ids);

        break;
      case '6':
        if (tasks.listToArr.length === 0) {
          console.log('No tasks to delete'.blue);
          break;
        }

        const id = await listDeletedTasks(tasks.listToArr);
        if (id !== '0') {
          const ok = await confirmAction();
          if (ok) {
            tasks.deleteTask(id);
            console.log('Task deleted succesfully');
          }
        }

        break;
    }

    saveDB(tasks.listToArr);
    await pause();
  } while (option !== '0');
};

main();

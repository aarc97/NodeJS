import inquirer from 'inquirer';

import 'colors';

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What do you like to do?',
    choices: [
      { value: '1', name: `${'1.'.green} Create task` },
      { value: '2', name: `${'2.'.green} List tasks` },
      { value: '3', name: `${'3.'.green} List completed tasks ` },
      { value: '4', name: `${'4.'.green} List pending tasks` },
      { value: '5', name: `${'5.'.green} Complete task(s)` },
      { value: '6', name: `${'6.'.green} Delete task` },
      { value: '0', name: `${'0.'.green} Exit` },
    ],
  },
];

export const inquirerMenu = async () => {
  // console.clear();
  console.log('======================='.green);
  console.log('   Select an option'.white);
  console.log('=======================\n'.green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

export const pause = async () => {
  const questions = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];
  const { option } = await inquirer.prompt(questions);

  console.log(`\n`);
  return option;
};

export const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please, type a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

export const listDeletedTasks = async (tasks = []) => {
  const choices = formatChoices({ tasks });
  const questions = [{ type: 'list', name: 'id', message: 'Delete', choices }];
  const { id } = await inquirer.prompt(questions);
  return id;
};

export const showChecklistTasks = async (tasks = []) => {
  const choices = formatChoices({ tasks, cancelable: false, checked: true });

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select preferred tasks',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

export const confirmAction = async (
  message = 'Are you sure to delete this task?'
) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const formatChoices = ({ tasks, cancelable = true, checked, ...params }) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      ...(checked && { checked: !!task.completedAt }),
      ...params,
    };
  });

  if (cancelable) {
    choices.unshift({
      value: '0',
      name: '0.'.green + ' Cancel',
    });
  }

  return choices;
};

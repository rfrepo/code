const { fork } = require('node:child_process');

let taskQueue;

let numOftTasks = 0;

const childResults = [];

const handleChildResponse = (result) => {
  childResults.push(result);

  if (childResults.length === numOftTasks) process.send(childResults);
  else loadFont(taskQueue.shift());
};

const loadFont = (path) => {
  const childProcess = fork('src/main/support/child-processes/load-font-process.ts');

  childProcess.on('message', handleChildResponse);

  childProcess.send({ path });
};

const retrieveFontMetaData = ({ systemFontPaths }) => {
  taskQueue = systemFontPaths;

  numOftTasks = taskQueue.length;

  Array.from({ length: 10 }).forEach(() => loadFont(taskQueue.shift()));
};

process.on('message', retrieveFontMetaData);

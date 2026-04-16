function createTask(id, delay) {
  return () => {
    return new Promise((resolve) => {
      console.log(`Task ${id} started`);

      setTimeout(() => {
        console.log(`Task ${id} done — ${delay}ms`);
        resolve(delay);
      }, delay);
    });
  };
}

async function limitConcurrency(tasks, limit) {
  let index = 0;
  let running = 0;

  return new Promise((resolve) => {
    function runNext() {
      if (index === tasks.length && running === 0) {
        resolve();
        return;
      }

      while (running < limit && index < tasks.length) {
        const task = tasks[index];
        index++;
        running++;

        task().then(() => {
          running--;
          runNext();
        });
      }
    }

    runNext();
  });
}

async function runSequential(tasks) {
  for (let task of tasks) {
    await task();
  }
}

const tasks = [
  createTask(1, 600),
  createTask(2, 1200),
  createTask(3, 800),
  createTask(4, 1500),
  createTask(5, 700),
  createTask(6, 1300),
  createTask(7, 900),
  createTask(8, 1600),
  createTask(9, 1100),
  createTask(10, 1700)
];

async function main() {
  console.time("All done — concurrent");
  await limitConcurrency(tasks, 3);
  console.timeEnd("All done — concurrent");

  console.log("--------------------");

  console.time("All done — sequential");
  await runSequential(tasks);
  console.timeEnd("All done — sequential");
}

main();
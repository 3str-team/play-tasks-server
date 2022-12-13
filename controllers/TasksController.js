const tasks = require("../data/tasks.json");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

class TaskController {
  getAll(req, res) {
    res.json(tasks);
  }

  getByTaskId(req, res) {
    res.json(tasks.filter((task) => task.taskId == req.params.taskId)[0]);
  }

  add(req, res) {
    if (req.body.password !== process.env.POST_PASSWORD) {
      res.json("Неверный пароль");
      return;
    }
    delete req.body.password;
    const task = { id: v4(), taskId: tasks.at(-1).taskId + 1, ...req.body };
    console.log(task);
    tasks.push(task);
    fs.writeFile(
      path.resolve("data", "tasks.json"),
      JSON.stringify(tasks),
      () => {
        res.json("Задача добавлена");
      }
    );
  }
}

module.exports = new TaskController();

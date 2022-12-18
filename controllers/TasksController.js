let tasks = require("../data/tasks.json");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

class TaskController {
  constructor() {}

  checkPassword(req, res, next) {
    if (req.body.password !== process.env.POST_PASSWORD) {
      res.status(400).json("Неверный пароль");
      return;
    }
    next();
  }

  static updateDataFile(data, cb) {
    fs.writeFile(path.resolve("data", "tasks.json"), JSON.stringify(data), cb);
  }

  getAll(req, res) {
    res.json(tasks);
  }

  getByTaskId(req, res) {
    res.json(tasks.filter((task) => task.taskId == req.params.taskId)[0]);
  }

  add(req, res) {
    const currentTaskId =
      tasks.length > 0 ? tasks[tasks.length - 1].taskId + 1 : 1;
    const task = {
      id: v4(),
      taskId: currentTaskId,
      ...req.body.data,
    };
    tasks.push(task);
    TaskController.updateDataFile(tasks, () => {
      res.status(202).json({ message: "Задача добавлена" });
    });
  }

  delete(req, res) {
    const taskId = req.body.data.taskId;
    tasks = tasks.filter((task) => task.taskId !== taskId);
    TaskController.updateDataFile(tasks, () => {
      res.status(200).json(tasks);
    });
  }
}

module.exports = new TaskController();

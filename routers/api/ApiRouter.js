const router = require("express").Router();
const TasksController = require("../../controllers/TasksController");

router.get("/tasks/getAll", TasksController.getAll);

router.get("/tasks/get/:taskId", TasksController.getByTaskId);

router.post("/tasks/add", TasksController.add);

module.exports = router;

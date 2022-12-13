const router = require("express").Router();
const TasksController = require("../../controllers/TasksController");
const cors = require("cors");

router.get("/tasks/getAll", cors({ origin: "*" }), TasksController.getAll);

router.get(
  "/tasks/get/:taskId",
  cors({ origin: "*" }),
  TasksController.getByTaskId
);

router.post("/tasks/add", cors({ origin: "*" }), TasksController.add);

module.exports = router;

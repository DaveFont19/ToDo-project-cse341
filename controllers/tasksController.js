const { ObjectId } = require("mongodb");
const mongodb = require("../config/database");

const collectionName = "tasks";

const getAllTasks = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const tasks = await mongodb.getDatabase().collection(collectionName).find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

const getSingleTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = await mongodb.getDatabase().collection(collectionName).findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      categoryId: req.body.categoryId,
      projectId: req.body.projectId,
      userId: req.body.userId,
      createdAt: new Date(),
    };

    const response = await mongodb.getDatabase().collection(collectionName).insertOne(task);
    res.status(201).json({ message: "Task created successfully", id: response.insertedId });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      categoryId: req.body.categoryId,
      projectId: req.body.projectId,
      userId: req.body.userId,
      updatedAt: new Date(),
    };

    const response = await mongodb.getDatabase().collection(collectionName).replaceOne(
      { _id: new ObjectId(req.params.id) },
      task
    );

    if (response.matchedCount === 0) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  // #swagger.tags = ['Tasks']
  try {
    const response = await mongodb.getDatabase().collection(collectionName).deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (response.deletedCount === 0) return res.status(404).json({ message: "Task not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
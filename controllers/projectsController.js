const { ObjectId } = require("mongodb");
const mongodb = require("../config/database");

const collectionName = "projects";

const getAllProjects = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const projects = await mongodb.getDatabase().collection(collectionName).find().toArray();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

const getSingleProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const project = await mongodb.getDatabase().collection(collectionName).findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

const createProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.body.userId,
      createdAt: new Date(),
    };

    const response = await mongodb.getDatabase().collection(collectionName).insertOne(project);
    res.status(201).json({ message: "Project created successfully", id: response.insertedId });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const project = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.body.userId,
      updatedAt: new Date(),
    };

    const response = await mongodb.getDatabase().collection(collectionName).replaceOne(
      { _id: new ObjectId(req.params.id) },
      project
    );

    if (response.matchedCount === 0) return res.status(404).json({ message: "Project not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  // #swagger.tags = ['Projects']
  try {
    const response = await mongodb.getDatabase().collection(collectionName).deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (response.deletedCount === 0) return res.status(404).json({ message: "Project not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
};
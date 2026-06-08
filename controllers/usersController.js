const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");

const collectionName = "users";

const getAllUsers = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const users = await mongodb
      .getDatabase()
      .collection(collectionName)
      .find()
      .toArray();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const user = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({
        _id: new ObjectId(req.params.id),
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      city: req.body.city,
      googleId: req.body.googleId,
      createdAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .insertOne(user);

    res.status(201).json({
      message: "User created successfully",
      id: response.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      phone: req.body.phone,
      city: req.body.city,
      googleId: req.body.googleId,
      updatedAt: new Date(),
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        user
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  try {
    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
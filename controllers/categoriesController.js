const {ObjectId} = require('mongodb');
const mongodb = require('../config/database');
const collectionName = 'categories';

const getAllCategories = async (req,res,next) =>{
  // #swagger.tags = ['Categories']
    try{
        const categories = await mongodb.getDatabase().collection(collectionName).find().toArray();
        res.status(200).json(categories);
    }catch(error){
        next(error);
    }
};
const getSingleCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = await mongodb
      .getDatabase()
      .collection(collectionName)
      .findOne({ _id: new ObjectId(categoryId) });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  try {
    const category = {
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      userId: req.body.userId,
      createdAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .insertOne(category);

    res.status(201).json({
      message: 'Category created successfully',
      id: response.insertedId
    });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const category = {
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      userId: req.body.userId,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .replaceOne({ _id: new ObjectId(categoryId) }, category);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  // #swagger.tags = ['Categories']
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const response = await mongodb
      .getDatabase()
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(categoryId) });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
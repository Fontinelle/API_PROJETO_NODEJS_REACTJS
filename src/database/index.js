const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Category = require('../models/Category');

module.exports = () => {
  const models = [User, Category];

  const connection = new Sequelize(dbConfig);

  models.forEach((model) => model.init(connection));

  return { models };
};

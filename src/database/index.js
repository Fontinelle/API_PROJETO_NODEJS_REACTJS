const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');

module.exports = () => {
  const models = [User];

  const connection = new Sequelize(dbConfig);

  models.forEach((model) => model.init(connection));

  return { models };
};

const Category = require('../models/Category');
const Article = require('../models/Article');
const User = require('../models/User');

module.exports = () => {
  const get = async (req, res) => {
    const categories = await Category.findAll();
    const articles = await Article.findAll();
    const users = await User.findAll();

    const categoriesCount = parseInt(categories.length);
    const articlesCount = parseInt(articles.length);
    const usersCount = parseInt(users.length);

    const defaultValue = {
      categories: categoriesCount || 0,
      articles: articlesCount || 0,
      users: usersCount || 0,
    };
    res.json(defaultValue);
  };

  return { get };
};

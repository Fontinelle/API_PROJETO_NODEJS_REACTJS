const Article = require('../models/Article');

module.exports = () => {
  const save = async (req, res) => {
    try {
      const article = await Article.create(req.body);

      return res.json(article);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const limit = 60 || parseInt(process.env.LIMIT);

  const get = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const result = await Article.findAll();
      const count = parseInt(result.length);

      const article = await Article.findAll({
        attributes: ['id', 'name', 'description', 'user_id'],
        order: [['id', 'DESC']],
        limit: limit,
        offset: page * limit - limit,
      });

      return res.json({ data: article, count, limit });
    } catch (e) {
      return res.json(null);
    }
  };

  const getById = async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(400).json({ errors: ['Artigo não existe.'] });
      }

      const { id, name, description, image_url, user_id, category_id } =
        article;

      return res.json({
        id,
        name,
        description,
        image_url,
        user_id,
        category_id,
      });
    } catch (e) {
      return res.json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const update = async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(400).json({ errors: ['Artigo não existe.'] });
      }

      const { id, name, description, image_url, user_id, category_id } =
        await article.update(req.body);

      return res.json({
        id,
        name,
        description,
        image_url,
        user_id,
        category_id,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const remove = async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(400).json({ errors: ['Artigo não existe.'] });
      }

      await article.destroy();
      const { id, name } = article;
      return res.json({ id, name });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  return { save, get, getById, update, remove };
};

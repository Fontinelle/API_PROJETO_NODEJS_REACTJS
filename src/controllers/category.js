const Category = require('../models/Category');
const Article = require('../models/Article');

module.exports = () => {
  const save = async (req, res) => {
    try {
      const category = await Category.create(req.body);

      return res.json(category);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const withPath = (categories) => {
    const categoriesWithPath = categories.map((category) => {
      let path = category.name;
      const name = category.name;
      const id = category.id;
      const parent_id = category.parent_id;

      const getParent = (categories, parentId) => {
        const parent = categories.filter((parent) => parent.id === parentId);
        return parent.length ? parent[0] : null;
      };
      let parent = getParent(categories, parent_id);

      while (parent) {
        path = `${parent.name} > ${path}`;
        parent = getParent(categories, parent.parent_id);
      }

      return { id, name, parent_id, path };
    });
    categoriesWithPath.sort((a, b) => {
      if (a.path < b.path) return -1;
      if (a.path > b.path) return 1;
      return 0;
    });

    return categoriesWithPath;
  };

  const get = async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.json(withPath(categories));
    } catch (e) {
      return res.json(null);
    }
  };

  const toTree = (categories, tree) => {
    if (!tree) tree = categories.filter((c) => !c.parent_id);
    tree = tree.map((parentNode) => {
      const isChild = (node) => node.parent_id == parentNode.id;
      parentNode.children = toTree(categories, categories.filter(isChild));
      return parentNode;
    });
    return tree;
  };

  const getTree = async (req, res) => {
    try {
      const categories = await Category.findAll();

      return res.json(toTree(withPath(categories)));
    } catch (e) {
      return res.json(null);
    }
  };

  const getById = async (req, res) => {
    try {
      const { id, name, parent_id } = await Category.findByPk(req.params.id);

      return res.json({ id, name, parent_id });
    } catch (e) {
      return res.json(null);
    }
  };

  const update = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(400).json({ errors: ['Categoria não existe.'] });
      }

      const { id, name, parent_id } = await category.update(req.body);

      return res.json({ id, name, parent_id });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const remove = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(400).json({ errors: ['Categoria não existe.'] });
      }
      const { parent_id } = category;

      if (parent_id) {
        return res
          .status(400)
          .json({ errors: ['Categoria não pode ser excluída.'] });
      }
      await category.destroy();
      const { id, name } = category;
      return res.json({ id, name });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const getByCategory = async (req, res) => {
    try {
      const id = parseInt(req.params.id);

      const article = await Article.findAll({
        attributes: ['id', 'name', 'description'],
        where: { category_id: id },
      });

      return res.json(article);
    } catch (e) {
      return res.json(null);
    }
  };

  return {
    save,
    get,
    getTree,
    getById,
    update,
    remove,
    getByCategory,
  };
};

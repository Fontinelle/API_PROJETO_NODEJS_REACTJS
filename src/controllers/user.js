const User = require('../models/User');

module.exports = () => {
  const save = async (req, res) => {
    try {
      const user = { ...req.body };

      if (!req.originalUrl.startsWith('/users')) user.admin = false;
      if (!req.user || !req.user.admin) user.admin = false;

      const { id, name, email, admin } = await User.create(user);

      return res.json({ id, name, email, admin });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const get = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'admin'],
        where: { deleted: false },
      });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  };

  const getById = async (req, res) => {
    try {
      const { id, name, email, admin, deleted } = await User.findByPk(
        req.params.id
      );

      return res.json({ id, name, email, admin, deleted });
    } catch (e) {
      return res.json(null);
    }
  };

  const update = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }

      const { id, name, email, admin } = await user.update(req.body);

      return res.json({ id, name, email, admin });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  };

  const remove = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }
      const { id, name, email, admin } = await user.update({ deleted: true });
      return res.json({ id, name, email, admin });
    } catch (e) {
      return res.status(400).json(null);
    }
  };

  return { save, get, getById, update, remove };
};

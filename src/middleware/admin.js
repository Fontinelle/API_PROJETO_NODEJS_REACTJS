module.exports = () => {
  const admin = async (req, res, next) => {
    if (req.admin) {
      return next();
    } else {
      res.status(401).json({ errors: ['Usuário não é administrador'] });
    }
  };
  return { admin };
};

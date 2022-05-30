module.exports = (app) => {
  app.route('/stats').get(app.controllers.stat.get);
};

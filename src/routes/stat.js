module.exports = (app) => {
  app
    .route('/stats')
    .all(app.middleware.loginRequired.authenticate)
    .get(app.controllers.stat.get);
};

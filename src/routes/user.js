module.exports = (app) => {
  app
    .route('/users')
    .all(app.middleware.loginRequired.authenticate)
    .all(app.middleware.admin.admin)
    .post(app.controllers.user.save)
    .get(app.controllers.user.get);
  app
    .route('/users/:id')
    .all(app.middleware.loginRequired.authenticate)
    .all(app.middleware.admin.admin)
    .put(app.controllers.user.update)
    .delete(app.controllers.user.remove)
    .get(app.controllers.user.getById);
};

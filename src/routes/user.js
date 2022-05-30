module.exports = (app) => {
  app
    .route('/users')
    .post(app.controllers.user.save)
    .get(app.controllers.user.get);
  app
    .route('/users/:id')
    .put(app.controllers.user.update)
    .delete(app.controllers.user.remove)
    .get(app.controllers.user.getById);
};

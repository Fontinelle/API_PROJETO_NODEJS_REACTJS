module.exports = (app) => {
  app
    .route('/articles')
    .get(app.controllers.article.get)
    .post(app.controllers.article.save);
  app
    .route('/articles/:id')
    .all(app.middleware.loginRequired.authenticate)
    .get(app.controllers.article.getById)
    .all(app.middleware.admin.admin)
    .put(app.controllers.article.update)
    .delete(app.controllers.article.remove);
};

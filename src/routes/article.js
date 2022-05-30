module.exports = (app) => {
  app
    .route('/articles')
    .get(app.controllers.article.get)
    .post(app.controllers.article.save);
  app
    .route('/articles/:id')
    .get(app.controllers.article.getById)
    .put(app.controllers.article.update)
    .delete(app.controllers.article.remove);
};

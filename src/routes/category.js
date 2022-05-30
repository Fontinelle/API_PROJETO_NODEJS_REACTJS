module.exports = (app) => {
  app
    .route('/category')
    .get(app.controllers.category.get)
    .post(app.controllers.category.save);
  app.route('/category/tree').get(app.controllers.category.getTree);
  app
    .route('/category/:id')
    .get(app.controllers.category.getById)
    .put(app.controllers.category.update)
    .delete(app.controllers.category.remove);
};

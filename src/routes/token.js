module.exports = (app) => {
  app.route('/signin').post(app.controllers.token.signIn);
  app.route('/signup').post(app.controllers.user.save);
};

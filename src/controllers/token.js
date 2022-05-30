const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = () => {
  const signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ['Informe usuário e senha'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ errors: ['Usuário não encontrado'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ['Senha inválida'] });
    }
    const now = Math.floor(Date.now() / 1000);
    const { id, name, admin } = user;
    console.log(process.env.TOKEN_EXPIRATION);
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.send({
      token,
      user: { id, name, email, admin },
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    });
  };

  return { signIn };
};

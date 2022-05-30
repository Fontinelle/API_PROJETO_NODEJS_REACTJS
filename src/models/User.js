const bcryptjs = require('bcryptjs');
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: ' ',
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: ' ',
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: ' ',
        },
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        deleted: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: ' ',
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha deve ter entre 8 e 50 caracteres',
            },
          },
        },
        confirmPassword: {
          type: Sequelize.VIRTUAL,
          defaultValue: ' ',
          validate: {
            userValidation() {
              if (this.confirmPassword !== this.password) {
                throw new Error('Confirmação de Senha inválida');
              }
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

module.exports = User;

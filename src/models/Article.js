const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Article extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          unique: {
            msg: 'Artigo já existe',
          },
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 1000],
              msg: 'A descrição deve ter entre 3 e 1000 caracteres',
            },
          },
        },
        image_url: {
          type: Sequelize.STRING,
          validate: {
            isUrl: {
              msg: 'Digite uma URL valida',
            },
          },
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O conteúdo deve ter entre 3 e 1000 caracteres',
            },
          },
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
            foreignKey: 'users',
          },
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O autor não informado',
            },
          },
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
            foreignKey: 'categories',
          },
          allowNull: false,
          validate: {
            notNull: {
              msg: 'O categoria não informada',
            },
          },
        },
      },
      {
        sequelize,
      }
    );
  }
}
module.exports = Article;

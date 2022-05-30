const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: ' ',
          unique: {
            msg: 'Categoria já existe',
          },
          validate: {
            len: {
              args: [3, 255],
              msg: 'O nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        parent_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
            foreignKey: 'categories',
          },
        },
      },
      {
        sequelize,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.categories, { foreignKey: 'parent_id' });
  }
}
module.exports = Category;

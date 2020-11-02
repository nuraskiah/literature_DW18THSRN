'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Library.belongsTo(models.Literature, {
        foreignKey: {
          name: 'LiteratureId',
        },
        as: 'literature',
      });
      Library.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
        },
        as: 'user',
      });
    }
  }
  Library.init(
    {
      LiteratureId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Library',
    }
  );
  return Library;
};

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
          name: 'literatureId',
        },
        as: 'literature',
      });
      Library.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
        as: 'user',
      });
    }
  }
  Library.init(
    {
      literatureId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Library',
    }
  );
  return Library;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Literature.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
        },
        as: 'user',
      });
      Literature.hasMany(models.Library, {
        foreignKey: 'literatureId',
        as: 'library',
      });
    }
  }
  Literature.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      publicationDate: DataTypes.DATE,
      pages: DataTypes.NUMBER,
      ISBN: DataTypes.NUMBER,
      author: DataTypes.STRING,
      status: DataTypes.STRING,
      file: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Literature',
    }
  );
  return Literature;
};

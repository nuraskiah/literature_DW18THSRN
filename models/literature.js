"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Literature extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Literature.belongsTo(models.User, {
                as: "user_id",
                foreignKey: {
                    name: "userId"
                }
            });
            Literature.hasMany(models.Library, {
                as: "library"
            });
        }
    }
    Literature.init({
        title: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        publication_date: DataTypes.DATE,
        pages: DataTypes.NUMBER,
        ISBN: DataTypes.NUMBER,
        author: DataTypes.STRING,
        status: DataTypes.STRING,
        file: DataTypes.STRING,
        thumbnail: DataTypes.STRING
    }, {
        sequelize,
        modelName: "Literature"
    });
    return Literature;
};
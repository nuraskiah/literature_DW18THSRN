"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Literature, {
                as: "literature"
            });
            User.hasMany(models.Library, {
                as: "library"
            });
        }
    }
    User.init({
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        gender: DataTypes.STRING,
        phone: DataTypes.NUMBER,
        address: DataTypes.STRING,
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: "User"
    });
    return User;
};
"use strict";
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("Libraries", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            literatureId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Literature",
                    as: "id"
                },
                onUpdate: "NO ACTION",
                onDelete: "NO ACTION"
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    as: "id"
                },
                onUpdate: "NO ACTION",
                onDelete: "NO ACTION"
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("Libraries");
    }
};
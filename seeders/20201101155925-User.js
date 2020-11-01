'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          fullName: 'User',
          email: 'user@gmail.com',
          password: '123123123',
          gender: 'Male',
          phone: '081232123123',
          address: 'Indonesia',
          avatar: 'new.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

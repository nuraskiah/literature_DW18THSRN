'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Literature',
      [
        {
          title: 'Test',
          UserId: 1,
          publication_date: new Date(),
          pages: 123,
          ISBN: 9879382732123,
          author: 'User',
          status: 'Approved',
          file: 'filename.pdf',
          thumbnail: 'thumb.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Literature', null, {});
  },
};

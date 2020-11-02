'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Literature',
      [
        {
          title: 'Test',
          userId: 1,
          publicationDate: new Date(),
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

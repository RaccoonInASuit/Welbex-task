'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'file', Sequelize.STRING, {
      after: "description"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("posts", "file");
  }
};

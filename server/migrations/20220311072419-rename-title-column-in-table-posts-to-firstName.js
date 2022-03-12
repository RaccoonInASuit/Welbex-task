'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn("posts", "title", "firstName")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn("posts", "firstName", "title")
  }
};

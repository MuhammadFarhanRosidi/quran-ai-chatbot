"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Verses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nomor: {
        type: Sequelize.INTEGER,
      },
      ar: {
        type: Sequelize.TEXT("long"),
      },
      tr: {
        type: Sequelize.TEXT("long"),
      },
      idn: {
        type: Sequelize.TEXT("long"),
      },
      chapterId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Chapters",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Verses");
  },
};

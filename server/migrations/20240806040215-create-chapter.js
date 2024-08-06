"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Chapters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama: {
        type: Sequelize.STRING,
      },
      namaLatin: {
        type: Sequelize.STRING,
      },
      jumlahAyat: {
        type: Sequelize.INTEGER,
      },
      tempatTurun: {
        type: Sequelize.STRING,
      },
      arti: {
        type: Sequelize.TEXT("long"),
      },
      deskripsi: {
        type: Sequelize.TEXT("long"),
      },
      audioUrl: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Chapters");
  },
};

const app = require("../app");
const request = require("supertest");

const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token;

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("Users", [
      {
        username: "farhan",
        email: "farhan@mail.com",
        password: hashPassword("12345678"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    token = signToken({ id: 1 });
    console.log(token, "TOKENNN");
    await queryInterface.bulkInsert("Chapters", [
      {
        nama: "Al-Fil",
        namaLatin: "al_fil",
        jumlahAyat: 5,
        tempatTurun: "Makkiyah",
        arti: "Gajah",
        deskripsi: "Lorem ipsum",
        audioUrl: "http://audio.mp3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("Courses", [
      {
        title: "Al-Fil",
        description:
          "Surat ini terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Kaafirun.",
        price: null,
        chapterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  } catch (error) {
    console.log(error, "<<< BEFORE");
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      "Courses",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
    await queryInterface.bulkDelete(
      "Chapters",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
    await queryInterface.bulkDelete(
      "Users",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

describe("DELETE /deleteMyCourse/:id", () => {
  test("Success 200", async () => {
    const response = await request(app)
      .delete("/deleteMyCourse/1")
      .set("Authorization", "Bearer " + token);
    console.log(token, "<<<< test");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Course successfully deleted"
    );
  });
  test("Failed 404", async () => {
    const response = await request(app)
      .delete("/deleteMyCourse/4")
      .set("Authorization", "Bearer " + token);
    console.log(response, "FAILED 404");
    console.log(token, "TOKEN 404");
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Course not found");
  });
});

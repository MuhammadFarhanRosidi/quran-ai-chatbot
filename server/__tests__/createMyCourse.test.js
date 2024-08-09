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
    console.log(error);
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

describe("POST /joinCourse/:courseId", () => {
  test("Success 200", async () => {
    const response = await request(app)
      .post("/joinCourse/1")
      .send({
        title: "Al-Fil",
        description:
          "Surat ini terdiri atas 5 ayat, termasuk golongan surat-surat Makkiyyah, diturunkan sesudah surat Al Kaafirun.",
        price: null,
        chapterId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .set("Authorization", "Bearer " + token);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Course successfully added to user"
    );
  });
});

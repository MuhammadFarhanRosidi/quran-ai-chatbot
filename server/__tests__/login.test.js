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
        username: "farhanrosidi",
        email: "farhan@mail.com",
        password: hashPassword("12345678"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "huseinhq",
        email: "huseinhq@mail.com",
        password: hashPassword("12345678"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    token = signToken({ id: 1 });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
});

describe("POST /login", () => {
  test("Success 200", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "farhan@mail.com", password: "12345678" });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("Failed 400 - Empty Password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "farhan@mail.com", password: "" });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password is required"
    );
  });

  test("Failed 400 - Empty Email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "", password: "12345678" });
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password is required"
    );
  });

  test("Failed 401 - Invalid Email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "hellowolrd@mail.com", password: "12345678" });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password is invalid"
    );
  });

  test("Failed 401 - Invalid Password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "farhan@mail.com", password: "wrongpassword" });
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Email and Password is invalid"
    );
  });
});

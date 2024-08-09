const app = require("../app");
const request = require("supertest");

const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
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

describe("POST /register", () => {
  test("Success 201 - Create new user", async () => {
    const response = await request(app).post("/register").send({
      username: "farhanrosidi",
      email: "farhan@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", "farhan@mail.com");
  });

  test("Failed 400 - Missing email", async () => {
    const response = await request(app).post("/register").send({
      username: "farhanrosidi",
      email: "",
      password: "12345678",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Please enter your email",
      "Format must be an email",
    ]);
  });

  test("Failed 400 - Missing password", async () => {
    const response = await request(app).post("/register").send({
      username: "farhanrosidi",
      email: "farhan@mail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Please enter your password",
    ]);
  });

  test("Failed 400 - Invalid email format", async () => {
    const response = await request(app).post("/register").send({
      username: "farhanrosidi",
      email: "farhan",
      password: "12345678",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", [
      "Format must be an email",
    ]);
  });

  test("Failed 400 - Duplicate email", async () => {
    await User.create({
      username: "farhanrosidi",
      email: "farhan@mail.com",
      password: "12345678",
    });

    const response = await request(app).post("/register").send({
      username: "huseinhq",
      email: "farhan@mail.com",
      password: "12345678",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email must be unique");
  });
});

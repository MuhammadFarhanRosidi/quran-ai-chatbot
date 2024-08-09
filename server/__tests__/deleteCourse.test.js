const app = require("../app");
const request = require("supertest");

const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let token;
let tokenStaff;

beforeAll(async () => {
  try {
    await queryInterface.bulkInsert("Courses", [
      {
        username: "farhanrosidi",
        email: "farhan@mail.com",
        password: hashPassword("admin12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "huseinhq",
        email: "huseinhq@mail.com",
        password: hashPassword("staff12345"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Chapters", [
      {
        name: "burger",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "drink",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    token = signToken({ id: 1 });
    tokenStaff = signToken({ id: 2 });

    await queryInterface.bulkInsert("Cuisines", [
      {
        name: "Beef Burger",
        description: "A double-layered burger with lettuce, cheese.",
        price: 6000,
        imgUrl: "https://example.com/images/bigmac.jpg",
        categoryId: 1,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ice Tea",
        description: "A single-layered burger with lettuce, cheese.",
        price: 6000,
        imgUrl: "https://example.com/images/bigmac.jpg",
        categoryId: 2,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ice Tea",
        description: "A single-layered burger with lettuce, cheese.",
        price: 6000,
        imgUrl: "https://example.com/images/bigmac.jpg",
        categoryId: 1,
        authorId: 1,
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
      "Cuisines",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );

    await queryInterface.bulkDelete(
      "Categories",
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

describe("DELETE /cuisines/:id", () => {
  describe("Success", () => {
    test("Success 200", async () => {
      const response = await request(app)
        .delete("/cuisines/1")
        .set("Authorization", "Bearer " + token);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("Failed", () => {
    test("Failed 401 User doesn't login", async () => {
      const response = await request(app).delete("/cuisines/1");
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    test("Failed 401 Invalid token", async () => {
      const response = await request(app)
        .delete("/cuisines/1")
        .set("Authorization", token);
      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    test("Failed 404 Data Not Found", async () => {
      const response = await request(app)
        .delete("/cuisines/100")
        .set("Authorization", `Bearer ` + token);
      expect(response.status).toBe(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    test("Failed 403 Staff Doesn't delete another her cuisine", async () => {
      const response = await request(app)
        .delete("/cuisines/3")
        .set("Authorization", `Bearer ` + tokenStaff);
      expect(response.status).toBe(403);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});

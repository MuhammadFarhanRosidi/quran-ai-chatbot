const request = require("supertest");
const app = require("../app");

describe("Controller Tests", () => {
  let token;

  beforeAll(async () => {
    await request(app).post("/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" });

    token = response.body.access_token;
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/register").send({
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.username).toBe("newuser");
      expect(response.body.email).toBe("new@example.com");
    });
  });

  describe("POST /login", () => {
    it("should login an existing user", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
    });

    it("should return 400 if credentials are missing", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "CredentialsRequired");
    });
  });

  describe("POST /googleLogin", () => {
    it("should login with Google token", async () => {
      const response = await request(app)
        .post("/googleLogin")
        .send({ googleToken: "mocked_google_token" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token");
    });

    it("should return 400 if Google token is missing", async () => {
      const response = await request(app).post("/googleLogin").send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "MissingGoogleToken");
    });
  });

  describe("GET /showCourses", () => {
    it("should return a list of courses", async () => {
      const response = await request(app)
        .get("/showCourses")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("chapters");
    });
  });

  describe("GET /showMyCourses", () => {
    it("should return the user's courses", async () => {
      const response = await request(app)
        .get("/showMyCourses")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("Courses");
    });
  });

  describe("GET /showDetailCourse/:id", () => {
    it("should return details of a course", async () => {
      const response = await request(app)
        .get("/showDetailCourse/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("POST /handleJoinCourse/:courseId", () => {
    it("should add a course to the user's list", async () => {
      const response = await request(app)
        .post("/handleJoinCourse/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "message",
        "Course successfully added to user"
      );
    });
  });

  describe("GET /showEditCourse/:id", () => {
    it("should return a specific course to edit", async () => {
      const response = await request(app)
        .get("/showEditCourse/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
    });
  });

  describe("PUT /handleEditCourse/:id", () => {
    it("should update a specific course", async () => {
      const response = await request(app)
        .put("/handleEditCourse/1")
        .set("Authorization", `Bearer ${token}`)
        .send({ description: "Updated description" });

      expect(response.status).toBe(200);
      expect(response.body.message).toHaveProperty(
        "description",
        "Updated description"
      );
    });
  });

  describe("DELETE /handleDeleteCourse/:id", () => {
    it("should delete a specific course", async () => {
      const response = await request(app)
        .delete("/handleDeleteCourse/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Course successfully deleted"
      );
    });
  });
});

import request from "supertest";
import app from "../src/app";
import { User } from "@prisma/client";

describe("Users Endpoints", () => {
  describe("GET /users", () => {
    it("gets a list of all users", async () => {
      const res = await request(app).get("/users");

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

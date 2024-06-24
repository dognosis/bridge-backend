import request from "supertest";
import app from "../src/app";

describe("Dogs Endpoints", () => {
  describe("GET /dogs", () => {
    it("gets a list of all dogs", async () => {
      const res = await request(app).get("/dogs");

      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  });
});

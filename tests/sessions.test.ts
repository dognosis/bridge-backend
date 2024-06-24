import request from "supertest";
import app from "../src/app";
import { Dog, Session, User } from "@prisma/client";
import prisma from "../src/database";

describe("Sessions Endpoints", () => {
  let user: User;
  let dog: Dog;

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@dognosis.tech",
      },
    });

    dog = await prisma.dog.create({
      data: {
        name: "Test Dog",
        breed: "Beagle",
        sex: "F",
        training_start: new Date(2024, 3).toISOString(),
        birthday: new Date(2021, 6),
        last_heat: new Date(2023, 11),
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.dog.delete({ where: { id: dog.id } });
  });

  describe("POST /sessions", () => {
    let session: Session;

    it("creates a new session", async () => {
      const data = {
        dog_id: dog.id,
        last_meal: 300,
        start_time: new Date().toISOString(),
      };

      const res = await request(app)
        .post("/sessions")
        .auth(user.id, { type: "bearer" })
        .send(data);

      session = res.body;

      expect(res.statusCode).toBe(201);

      expect(session.id).toBeDefined();
      expect(session.trainer_id).toEqual(user.id);
      expect(session.dog_id).toEqual(data.dog_id);
      expect(session.last_meal).toEqual(data.last_meal);
      expect(session.start_time).toEqual(data.start_time);

      expect(session.eeg_file_path).toBeNull();
      expect(session.video_file_path).toBeNull();
      expect(session.notes).toBeNull();
      expect(session.end_time).toBeNull();

      return;
    });

    afterEach(async () => {
      if (session.id) {
        await prisma.session.delete({ where: { id: session.id } });
      }
    });
  });

  describe("PATCH /sessions/:sessionId/end", () => {
    let session: Session;

    beforeAll(async () => {
      const data = {
        trainer_id: user.id,
        dog_id: dog.id,
        last_meal: 300,
        start_time: new Date().toISOString(),
      };

      session = await prisma.session.create({ data: data });
    });

    afterAll(async () => {
      await prisma.session.delete({ where: { id: session.id } });
    });

    it("ends a existing session", async () => {
      const data = {
        end_time: new Date().toISOString(),
      };

      const res = await request(app)
        .patch(`/sessions/${session.id}/end`)
        .auth(user.id, { type: "bearer" })
        .send(data);

      expect(res.statusCode).toBe(200);

      return;
    });
  });
});

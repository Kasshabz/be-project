const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data/");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const endPoints = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("should return with a 200 status code", () => {
    return request(app).get("/api/topics").expect(200);
  });

  test("should return with a property of slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topic = body.topic;
        console.log(body.topic);
        topic.find(({ description, slug }) => {
          expect(typeof description).toBe("string");
          expect(typeof slug).toBe("string");
          expect(topic).toHaveLength(3);
        });
      });
  });
});
describe("Get /api", () => {
  test("should return An object describing all the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((body) => {
        console.log(body.text, "body");
        expect(JSON.parse(body.text)).toEqual(endPoints);
      });
  });
});

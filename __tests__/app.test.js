const request = require("supertest");
const app = require("../app");
const testData = require("../db/data/test-data/");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api/topics", () => {
  test("should return with a 200 status code", () => {
    return request(app).get("/api/topics").expect(200)
  });

  test("should return with a property of slug and description", () => {
    return request(app).get("/api/topics").expect(200).then(({body})=>{body.forEach(({
        description,
        slug
    })=>{
        expect(typeof description).toBe("string")
        expect(typeof slug).toBe("string")
    }

    )

    })
  });
});

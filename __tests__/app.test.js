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

        topic.find(({ description, slug }) => {
          expect(typeof description).toBe("string");
          expect(typeof slug).toBe("string");
          expect(topic).toHaveLength(3);
        });
      });
  });
});
describe("Get /api", () => {
  test.only("should return An object describing all the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        console.log(response.body.endPoints,"body");
        const endApi = response.body.endPoints
        
        expect(endApi).toMatchObject(endPoints);
      });
  });
});
describe("GET api/articles/:article_id", () => {
  test("should return article by it's id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const output = {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: 1594329060000,
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(body).toEqual(output);
      });
  });
});

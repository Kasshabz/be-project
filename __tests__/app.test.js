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
  test("should return An object describing all the available endpoints on your API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
       
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
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(body.article).toEqual(output);
      });
  });
  test("should return 404 if id is valid but does not exist",()=>{
    return request(app).get("/api/articles/1000").expect(404).then(({text})=>{
     
    
      
      expect(text).toEqual("Article not found")

    })
  })
  test("should return 400 if id is not valid" ,()=>{
    return request(app).get("/api/articles/bananas").expect(400).then(({text})=>{
    
    
      
      expect(text).toEqual("Article not valid")

    })
  })
});

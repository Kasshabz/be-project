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
        topic.forEach(({ description, slug }) => {
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
        const endApi = response.body.endPoints;
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
  test("should return 404 if id is valid but does not exist", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then(({ text }) => {
        expect(text).toEqual("Not found");
      });
  });
  test("should return 400 if id is not valid", () => {
    return request(app)
      .get("/api/articles/bananas")
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
});
describe("Get /api/articles", () => {
  test("should return all articles with their properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        article.forEach(
          ({
            author,
            title,
            article_id,
            topic,
            created_at,
            votes,
            article_img_url,
            comment_count,
          }) => {
            expect(typeof author).toBe("string");
            expect(typeof title).toBe("string");
            expect(typeof article_id).toBe("number");
            expect(typeof topic).toBe("string");
            expect(typeof created_at).toBe("string");
            expect(typeof votes).toBe("number");
            expect(typeof article_img_url).toBe("string");
            expect(typeof comment_count).toBe("string");
            expect(article).toHaveLength(13);
          }
        );
      });
  });
  test("the articles should be sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        expect(body.article).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("Get /api/articles/1/comments", () => {
  test("should return all commets with their properties", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const comment = body.comments;
        expect(comment).toHaveLength(11);
        comment.forEach(
          ({ comment_id, votes, created_at, author, body, article_id }) => {
            expect(comment).toBeSortedBy("created_at", { descending: true });
            expect(article_id).toBe(1);
            expect(typeof comment_id).toBe("number");
            expect(typeof author).toBe("string");
            expect(typeof created_at).toBe("string");
            expect(typeof votes).toBe("number");
            expect(typeof body).toBe("string");
          }
        );
      });
  });
  test("should return 404 if id is valid but does not exist", () => {
    return request(app)
      .get("/api/articles/1000/comments")
      .expect(404)
      .then(({ text }) => {
        expect(text).toEqual("Not found");
      });
  });
  test("should return 400 if id is not valid", () => {
    return request(app)
      .get("/api/articles/bananas/comments")
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
});
describe("Post /api/articles/1/comments", () => {
  test("Should return with the newly added comments", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        userName: "rogersop",
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
      })
      .expect(201)
      .then((response) => {
        const outPut = {
          comment_id: 19,
          body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
          article_id: 1,
          author: "rogersop",
          votes: 0,
          created_at: response.body.comment.created_at,
        };
        expect(response.body.comment).toEqual(outPut);
      });
  });
  test("Should return with the a bad request if username missing", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
      })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("null value");
      });
  });
  test("Should return with the a 404 if id non existent", () => {
    return request(app)
      .post("/api/articles/100/comments")
      .send({
        userName: "rogersop",
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
      })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Null value");
      });
  });
  test("Should return with the a 400 if id is not valid", () => {
    return request(app)
      .post("/api/articles/hi/comments")
      .send({
        userName: "rogersop",
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
      })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
  test("Should return with 201 if extra properties exist", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        userName: "rogersop",
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
        votes: 10,
      })
      .expect(201)
      .then((response) => {
        const outPut = {
          comment_id: 19,
          body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
          article_id: 1,
          author: "rogersop",
          votes: 0,
          created_at: response.body.comment.created_at,
        };

        expect(response.body.comment).toEqual(outPut);
      });
  });
  test("Should return with the a bad request if body missing", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ userName: "rogersop" })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("null value");
      });
  });
  test("Should return with the a 400 if username is not valid", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        userName: "kas",
        body: "Gives a good insight in living under the pressure to achieve the same as a prodecessor or to be better",
      })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Null value");
      });
  });
});
describe("Patch /api/articles/1", () => {
  test("Should return with an updated article", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then((response) => {
        const output = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 110,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(response.body.upArticle).toEqual(output);
      });
  });
  test("Should return with 400 null value if the object is passed a string as value", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "hi" })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
  test("Should return with 404 not found if the endpoint is a path that does not exist", () => {
    return request(app)
      .patch("/api/articles/1000")
      .send({ inc_votes: 10 })
      .expect(404)
      .then(({ text }) => {
        expect(text).toEqual("Not found");
      });
  });
  test("Should return with 400 not found if the endpoint path is not valid", () => {
    return request(app)
      .patch("/api/articles/bananas")
      .send({ inc_votes: 10 })
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
});
describe("Delete comments", () => {
  test("Delete a certain comment by it's id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("should return 400 if comment id is not valid", () => {
    return request(app)
      .delete("/api/comments/hey")
      .expect(400)
      .then(({ text }) => {
        expect(text).toEqual("Not valid");
      });
  });
  test("should return 404 if comment_id is valid but does not exist", () => {
    return request(app)
      .delete("/api/comments/1000")
      .expect(404)
      .then(({ text }) => {
        expect(text).toEqual("Not found");
      });
  });
});

describe.only("Get /api/users", () => {
  test("should return all articles with their properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users).toHaveLength(4);
        users.forEach(({ username, name, avatar_url }) => {
          expect(typeof username).toBe("string");
          expect(typeof name).toBe("string");
          expect(typeof avatar_url).toBe("string");
        });
      });
  });
});

const express = require("express");
const {
  getArticleId,
  getArticles,
  getArticleIdComs,
  postComment,
  patchArticleId,
  getQueryT
} = require("./controllers/articles-controller");
const getApi = require("./controllers/api-controllers");
const { getTopics } = require("./controllers/topics-controller");
const deleteComment = require("./controllers/comments-controller");
const getUsers = require("./controllers/users-controller");
const {
  psqlErrorHandler,
  customErrorHandler,
  postError,
  serverError,
  missingUserErr,
} = require("./error.handlers");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.get("/api/topics", getTopics);
app.get("/api", getApi);
app.get("/api/articles/:article_id", getArticleId);
app.get("/api/articles", getArticles);
app.get("/api/articles?topic", getQueryT);
app.get("/api/articles/:article_id/comments", getArticleIdComs);
app.get("/api/users", getUsers);
app.post("/api/articles/:article_id/comments", postComment);
app.patch("/api/articles/:article_id", patchArticleId);
app.delete("/api/comments/:comment_id", deleteComment);

app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(postError);
app.use(missingUserErr);
app.use(serverError);

app.all("/*", (req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;

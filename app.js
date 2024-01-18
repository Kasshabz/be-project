const express = require("express");
const {getArticleId,getArticles} = require("./controllers/articles-controller")
const getApi = require("./controllers/api-controllers")
const {getTopics} = require("./controllers/topics-controller")
const { psqlErrorHandler, customErrorHandler } = require("./error.handlers")

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getApi);
app.get("/api/articles/:article_id", getArticleId);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments.",)
app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

module.exports = app;

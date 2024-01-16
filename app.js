const express = require("express");
const { getApi, getTopics,getArticleId } = require("./controllers/controller");


const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
 app.get("/api", getApi);
 app.get("/api/articles/:article_id",getArticleId);

module.exports = app;

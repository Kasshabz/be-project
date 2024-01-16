const express = require("express");
const { getApi, getTopics,getArticleId,getArticles } = require("./controllers/controller");
const {psqlErrorHandler,customErrorHandler} = require("./error.handlers")


const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
 app.get("/api", getApi);
 app.get("/api/articles/:article_id",getArticleId);
 app.get("/api/articles",getArticles)
 app.use(psqlErrorHandler )
 app.use(customErrorHandler)

module.exports = app;

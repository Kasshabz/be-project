const express = require("express");
const { getApi, getTopics } = require("./controllers/controller");


const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
 app.get("/api", getApi);

module.exports = app;

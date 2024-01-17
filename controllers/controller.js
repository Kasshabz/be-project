const { fetchTopcis, fetchID,fetchArticles } = require("../models/model");
const endPoints = require("../endpoints.json");
const getTopics = (req, res, next) => {
  fetchTopcis()
    .then((topic) => {
      res.status(200).send({ topic: topic });
    })
    .catch((err) => {
      next(err);
    });
};

const getApi = (req, res) => {
  res.status(200).send({ endPoints });
};
const getArticleId = (req, res, next) => {
  const { article_id } = req.params;

  fetchID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err)
    
      
    });
};
const getArticles = (req, res, next) => {
  console.log("controller");
  fetchArticles()
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = { getTopics, getApi, getArticleId, getArticles };

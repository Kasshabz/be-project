const { fetchTopcis, fetchID } = require("../models/model");
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
      console.log(err,"error here");
if(err.status && err.msg){
  res.status(err.status).send(err.msg)
}
if(err.code ==='22P02'){
  res.status(400).send("Article not valid")
}
      next(err);
    });
};
module.exports = { getTopics, getApi, getArticleId };

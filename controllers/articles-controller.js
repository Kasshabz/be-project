const { fetchArticlesID, fetchArticles,fetchArticlesQ} = require("../models/articles-models");
const getArticleId = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesID(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
const getArticles = (req, res, next) => {
  
  fetchArticles()
    .then((article) => {
      
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};





module.exports = { getArticleId, getArticles };

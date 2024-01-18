const {
  fetchArticlesID,
  fetchArticles,
  fetchArticlesIDcoms,
  insertComment,
} = require("../models/articles-models");
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
const getArticleIdComs = (req, res, next) => {
  const { article_id } = req.params;

  fetchArticlesIDcoms(article_id)
    .then((comment) => {
      res.status(200).send({ comments: comment });
    })
    .catch((err) => {
      next(err);
    });
};
const postComment = (req, res, next) => {
  const newComment = req.body;
  insertComment(newComment)
    .then((comment) => {
      res.status(201).send({ comment: comment.body });
    })
    .catch((err) => {
     
      next(err)
    });
};

module.exports = { getArticleId, getArticles, getArticleIdComs, postComment };

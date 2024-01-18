const { fetchTopcis } = require("../models/topics-model");

const getTopics = (req, res, next) => {
  fetchTopcis()
    .then((topic) => {
      res.status(200).send({ topic: topic });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getTopics };

const fetchTopcis = require("../models/model");
const getTopics = (req, res, next) => {
  fetchTopcis()
    .then((topic) => {
      res.status(200).send(topic);
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getTopics;

const fetchTopcis = require("../models/model");
const endPoints = require("../endpoints.json");
const getTopics = (req, res, next) => {
  fetchTopcis()
    .then((topic) => {
      res.status(200).send({topic});
   
    })
    .catch((err) => {
      next(err);
    });
};

const getApi = (req, res) => {

  res.status(200).send(endPoints);
};

module.exports = { getTopics, getApi };

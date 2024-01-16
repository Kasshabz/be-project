const {fetchTopcis,fetchID} = require("../models/model");
const endPoints = require("../endpoints.json");
const getTopics = (req, res, next) => {
  fetchTopcis()
    .then((topic) => {
      res.status(200).send({topic:topic});
   
    })
    .catch((err) => {
      next(err);
    });
};

const getApi = (req, res) => {

  res.status(200).send({endPoints});
};
const getArticleId = (req,res,next)=>{
  const articleID = req.params
  fetchID(articleID).then((article)=>{

  })
  
}
module.exports = { getTopics, getApi,getArticleId };

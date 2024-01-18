const endPoints = require("../endpoints.json");
const getApi = (req, res) => {
    res.status(200).send({ endPoints });
  };

  module.exports = getApi
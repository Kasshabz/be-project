const fetchUsers = require("../models/users-models")
const getUsers = (req, res, next) => {
  fetchUsers()
    .then((user) => {
      res.status(200).send({ users: user });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getUsers;

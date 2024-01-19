const fetchComment = require("../models/comments-models");
const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  fetchComment(comment_id)
    .then(() => {
      res.status(204).send({});
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = deleteComment;

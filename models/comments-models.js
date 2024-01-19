const db = require("../db/connection");
const fetchComment = (id) => {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1", [id])
    .then(({ rows }) => {
      return rows;
    });
};
module.exports = fetchComment;

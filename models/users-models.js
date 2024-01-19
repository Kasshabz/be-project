const db = require("../db/connection");
const fetchUsers = () => {
  let queryStr = "SELECT * FROM users";
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
module.exports = fetchUsers;

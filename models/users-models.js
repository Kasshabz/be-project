const db = require("../db/connection");
const fetchUsers = () => {
  let queryStr = "SELECT * FROM users";
  return db.query(queryStr).then(({ rows }) => {
    console.log(rows);
    return rows;
  });
};
module.exports = fetchUsers;

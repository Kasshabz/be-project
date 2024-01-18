const db = require("../db/connection");
const fetchTopcis = () => {
  let queryStr = "SELECT * FROM topics";
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};


module.exports = { fetchTopcis };

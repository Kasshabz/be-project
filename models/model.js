const db = require("../db/connection");
const fetchTopcis = () => {
  let queryStr = "SELECT * FROM topics";
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
const fetchID = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id =$1", [id])
    .then(({ rows }) => {
      
      if(rows.length === 0){
        return Promise.reject({status:404,msg:"Article not found"})
      }
      return rows[0];
    });
};
module.exports = { fetchTopcis, fetchID };

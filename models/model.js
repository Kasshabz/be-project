const db = require("../db/connection");
const fetchTopcis = () => {
  
  let queryStr = "SELECT * FROM topics";
  return db.query(queryStr).then((result) => {
   
    return result.rows;
  });
};
const fetchID = ()=>{
  
}
module.exports = {fetchTopcis,fetchID}

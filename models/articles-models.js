const db = require("../db/connection");
const fetchArticlesID = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id =$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return rows[0];
    });
};
const fetchArticles = () => {
  let queryStr =
    "SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id GROUP BY articles.article_id  ORDER BY created_at desc";

  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};
const fetchArticlesIDcoms = (id) =>{
  console.log("hello");
  let queryStr = "SELECT * FROM comments  JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = $1  ORDER BY comments.created_at DESC"
  
  return db.query(queryStr,[id]).then(({rows})=>{
return rows
  })
}

module.exports = { fetchArticlesID, fetchArticles,fetchArticlesIDcoms };

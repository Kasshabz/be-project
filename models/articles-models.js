const db = require("../db/connection");
const fetchArticlesID = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id =$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
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
const fetchArticlesIDcoms = (id) => {
  let queryStr =
    "SELECT * FROM comments WHERE article_id = $1  ORDER BY created_at DESC";

  return db.query(queryStr, [id]).then(({ rows }) => {
    console.log(rows);
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    }
    return rows;
  });
};
const insertComment = (newComment, id) => {
  let postQuery = `INSERT INTO comments (body,author,article_id) VALUES ($1,$2,$3)  RETURNING *`;

  return db
    .query(postQuery, [newComment.body, newComment.userName, id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
};
const updateArticle = (updatedArticle, id) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
      [updatedArticle.inc_votes, id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      return rows[0];
    });
};
const fetchQueryT = (query) => {
  if (query) {
    return db
      .query(`SELECT * FROM articles WHERE topic = $1`, [query])
      .then(({ rows }) => {
        return rows;
      })
      .catch((error) => {
        console.error("Error in fetchQueryT:", error);
        next(error);
      });
  } else {
    // If no topic is provided, fetch all articles
    return db
      .query(`SELECT * FROM articles`)
      .then(({ rows }) => {
        console.log(rows, "model");
        return rows;
      })
      .catch((error) => {
        console.error("Error in fetchQueryT:", error);
        throw error;
      });
  }
};

module.exports = {
  fetchArticlesID,
  fetchArticles,
  fetchArticlesIDcoms,
  insertComment,
  updateArticle,
  fetchQueryT,
};

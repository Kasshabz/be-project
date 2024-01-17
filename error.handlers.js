psqlErrorHandler = (err,req,res,next) =>{
    if (err.code === "22P02") {
        res.status(400).send("Article not valid");
    }else{
        next(err)
    }
}

customErrorHandler = (err,req,res,next)=>{
    if (err.status && err.msg) {
        res.status(err.status).send(err.msg);
      }else{
        next(err)
      }
}
module.exports = {psqlErrorHandler,customErrorHandler}
const psqlErrorHandler = (err,req,res,next) =>{
    if (err.code === "22P02") {
        res.status(400).send("Article not valid");
    }else{
        next(err)
    }
}

const customErrorHandler = (err,req,res,next)=>{
    if (err.status && err.msg) {
        res.status(err.status).send(err.msg);
      }else{
        next(err)
      }
}
const serverError = (err,req,res,next)=>{
    console.log(err);
    res.status(500).send({msg:"Internal Server error"})
    }
module.exports = {psqlErrorHandler,customErrorHandler,serverError}
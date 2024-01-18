const psqlErrorHandler = (err,req,res,next) =>{
    if (err.code === "22P02") {
        res.status(400).send("Not valid");
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
const postError = (err,req,res,next)=>{
    if(err.code==='23502'){
        res.status(400).send('null value in column "author"')
    }else{
        next(err)
    }
}
const serverError = (err,req,res,next)=>{
    console.log(err);
    res.status(500).send({msg:"Internal Server error"})
    }
   
module.exports = {psqlErrorHandler,customErrorHandler,serverError,postError}
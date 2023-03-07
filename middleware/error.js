const ErrorHandler = require('../utils/errorhandler')
 

module.exports =  (err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    //Caste error occur due to any monogoDB error like on id
    if(err === "CasteError"){
        const message = `Resource not found ${err.path}`;
        err = new ErrorHandler(message, 400 )
    }

    //Error for duplicate email error 
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message , 400)
    }

    //Wrong JWT error 
    if(err.code === "JsonWebTokenError") {
        const message = `Json web token error occured , try again.`
        err = new ErrorHandler(message , 400)
    }

    //JWT Expire error 
    if(err.code === "TokenExpiredError") {
        const message = `Json web token expired , try again.`
        err = new ErrorHandler(message , 400)
    }

    res.status(err.statusCode).json({ success : false, message : err.message})//err.stack will be used for full location
}
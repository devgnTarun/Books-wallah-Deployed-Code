//Creating token and saving in cookie


const sendToken = (user , statusCode , res) => {
    const token = user.getJWTToken();
 
    //Option for cookie
    const option = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60* 60* 1000),//process.env.COOKIE_EXPIRE * 24 * 60* 60* 1000
        httpOnly : true,
    }

    res.cookie('token' , token , option);
    
    res.status(statusCode).json({
        success : true,
        token, 
        user
    })
}

module.exports = sendToken;
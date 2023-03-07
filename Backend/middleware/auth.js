const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("./captureAsync");

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const {token} = req.cookies;
  // const {token} = localStorage.getItem("token");



  if (!token) {
    return next(new ErrorHandler("Please login to access the source", 401));
  }

  const decodedData =  jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decodedData.id);

  next();
});

// Admin not working 
exports.authorizedRoles =  (...roles) =>{
    return  (req, res, next) => {
      
    if(!roles.includes(req.user.role)) {
      
      return next(
      new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource.` , 403) )
    };
    next();
  }
}

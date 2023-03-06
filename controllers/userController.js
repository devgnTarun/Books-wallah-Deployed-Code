const ErrorHandler = require("../utils/errorhandler");
const catchAsync = require("../middleware/captureAsync");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require('cloudinary')

exports.registerUser = catchAsync(async (req, res, next) => {
  
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
    folder : 'homie_shop',
    width : 150,
    crop : 'scale', 
    
  })

  const { name, email, password  } = req.body;

  if(!name || !email || !password  ) {
    return next(new ErrorHandler('Please Enter all the credentials' , 400))
  };

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

 

  sendToken(user, 200, res);
});

//Login user function

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //Validating that email and password is saved in server or not

  if (!email || !password ) {
    return next(new ErrorHandler("Enter your Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password"); // Select is used beacuse hamne userModelschema vich password : (select : false ) kita hoya hai

  if (!user) {
    return next(new ErrorHandler("Enter a valid email and password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Enter a valid email and password", 401));
  }

  sendToken(user, 200, res); 
});

//Logout user

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });

  res.status(200).json({ success: true, message: "Logout successully" });
});

//Forgot password

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({email : req.body.email});

  if (!user) {
    return next(new ErrorHandler("User not Found ", 404));
  }

  //Get Reset passwod token
  const resetToken =  user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //URL FOR FORGOT PASSWORD

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;  //${req.protocol}://${req.get("host")} /api/v1

  const message = `Your password reset token isbhai :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Homiee Shop Password reset`,
      message,
    }); 

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPasswordToken = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return new ErrorHandler(
      "Reset password is no valid or has been expired",
      400
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return new ErrorHandler("Password can't be same as last", 400);
  }

  (user.password = req.body.password),
    (user.resetPasswordToken = undefined),
    (user.resetPasswordExpire = undefined),
    await user.save();


  sendToken(user, 200, res);
});

//Get user details

exports.getUserDetail = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if(!user) {
    new ErrorHandler('Please Login ' ,400 ) 
  }
  res.status(200).json({ success: true, user });
});

//Update user Password

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password does not match", 400))
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next( new ErrorHandler("Confirm Password does not match", 400))
  }
  if (req.body.oldPassword === req.body.newPassword) {
    return next( new ErrorHandler("New Password must be different from old", 400))
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

//Upadate user details ----- Profile

exports.updateProfile = catchAsync(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  if(req.body.avatar !== ""){
    const user = await User.findById(req.user.id)
    const imageId = user.avatar.public_id

    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar , {
      folder : 'homie_shop',
      width : 150,
      crop : 'scale',
      
    })

    newUser.avatar = {
      public_id : myCloud.public_id,
      url : myCloud.secure_url
    }
  }

  const user = await User.findByIdAndUpdate(req.user, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//Get all user logged ---- Admin
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user logged detail ---- Admin
exports.getSingleUsers = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(
        `User Does not exists with this id : ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//Update user role ----- Admin

exports.updateRole = catchAsync(async (req, res, next) => {
  const newUser = {
    name: req.body.name,
    role  : req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true });
});

//Delete user detail ----- Admin

exports.deleteUser = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user) {
    return next (new ErrorHandler(`User does not exist with this Id : ${req.params.id}` , 404))
  };

  const imageId = user.avatar.public_id

  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove()

  res.status(200).json({ success: true });
});
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto')


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your name"],
    minLength: [4, "Name Should be Atleast 4 Characters"],
    maxLength: [30, "Name does not cross 30 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minLength: [8, "Minimum lenght of password should be 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      required: true,
      type: String,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//pre save function create krna jisnal ! Password te hash lgg jayegi, and (if) is used agr password modiefied nhi hai then hash lgani....
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT_TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare password

userSchema.methods.comparePassword = async function (enteredPassword) {

        return await bcrypt.compare(enteredPassword , this.password)

}

// Generating password token  

userSchema.methods.getResetPasswordToken = function () {

  //Geenrating token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hashing and adding reset to useschema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken

}

module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { join } = require('path')
const fs = require('fs')
const { isValidUrl } = require('../utils/utils')

const userSchema = new mongoose.Schema({
   provider: String,
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   profileImageUrl: {
      type: String
   },
   password: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 60
   },
   followings: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }
   ],
   followers: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      }
   ]
}, { timestamps: true });

userSchema.methods.registerAsync = async newUser => {
   return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
               console.log(err);
               reject(err);
            }
            // set password to hash
            newUser.password = hash;
            newUser.save().then(user => {
               console.log("Registered a user", user);
               resolve(user);
            });
         });
      });
   })
};

userSchema.methods.toJSON = function () {
   const absAvaFilePath = `${join(__dirname, '../..', process.env.IMAGES_FOLDER_PATH)}${this.profileImageUrl}`;

   const profileImage = isValidUrl(this.profileImageUrl) ?
      this.profileImageUrl :
      fs.existsSync(absAvaFilePath) ?
         `${process.env.IMAGES_FOLDER_PATH}${this.profileImageUrl}` :
         `${process.env.IMAGES_FOLDER_PATH}avatar2.jpg`;

   return {
      id: this._id,
      provider: this.provider,
      email: this.email,
      name: this.name,
      profileImageUrl: profileImage,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
   }
}

const isProduction = process.env.NODE_ENV === 'production';
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

userSchema.methods.generateJWT = function () {
   const token = jwt.sign({
      expiresIn: '12h',
      id: this._id,
      provider: this.provider,
      email: this.email
   }, secretOrKey);
   return token;
}

userSchema.methods.comparePassword = function (candidatePassword, callback) {
   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return callback(err);
      return callback(null, isMatch);
   })
}

module.exports = mongoose.model("User", userSchema);

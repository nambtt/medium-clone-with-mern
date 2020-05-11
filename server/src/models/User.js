const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
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
});

userSchema.methods.registerAsync = async newUser => {
   return new Promise((resolve) => {
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
               console.log(err);
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

module.exports = mongoose.model("User", userSchema);

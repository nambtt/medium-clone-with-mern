const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: String,
   featureImage: String,
   content: {
      type: String,
      required: true
   },
   clap: {
      type: Number,
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   comments: [{
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
      },
      content: String
   }]
})

module.exports = mongoose.model('Article', articleSchema);
const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true } };
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
   }],
   createdDate: Date
}, opts)

articleSchema.virtual('displayedDate').get(function () {
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];

   const year = this.createdDate.getYear();
   const month = monthNames[this.createdDate.getMonth()].substr(0, 3);
   const date = this.createdDate.getDate();
   let result = `${month} ${date}`;
   if (year !== new Date().getYear()) {
      result += `, ${year}`;
   }
   return result;
})

module.exports = mongoose.model('Article', articleSchema);
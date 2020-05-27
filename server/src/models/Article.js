const mongoose = require('mongoose')
const opts = { toJSON: { virtuals: true }, timestamps: true };
const articleSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   description: String,
   featureImage: String,
   content: String,
   clap: {
      type: Number,
      default: 0
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
      content: String,
      createdAt: Date
   }],
   createdDate: Date
}, opts)

articleSchema.virtual('displayedDate').get(function () {
   const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
   ];

   const createdDate = this.createdDate || this.createdAt;
   if (!createdDate) return "";

   const year = createdDate.getYear();
   const month = monthNames[createdDate.getMonth()].substr(0, 3);
   const date = createdDate.getDate();
   let result = `${month} ${date}`;
   if (year !== new Date().getYear()) {
      result += `, ${year}`;
   }
   return result;
})

articleSchema.virtual('noOfComments').get(function () {
   return this.comments ? this.comments.length : 0;
})

articleSchema.methods.addComment = async function (comment) {
   comment.createdAt = new Date();
   const newComment = this.comments.create(comment);
   this.comments.push(newComment);
   await this.save();
}

articleSchema.methods.claps = async function () {
   this.clap = (this.clap || 0) + 1;
   await this.save();
}

articleSchema.statics.toRestResult = function (data, path) {
   if (!data)
      throw new Error("data must be object or array of article");
   try {
      if (!data.length) {
         const result = data.toJSON();
         result.request = {
            type: "GET",
            url: `${path}/${data._id}`
         }
         return result;
      } else {
         const result = data.map(article => {
            return {
               ...article.toJSON(),
               request: {
                  method: "GET",
                  url: `${path}/${article._id}`
               }
            }
         })
         return { articles: result, count: result.length };
      }
   } catch (error) {
      throw new Error("data is not valid");
   }

}

module.exports = mongoose.model('Article', articleSchema);
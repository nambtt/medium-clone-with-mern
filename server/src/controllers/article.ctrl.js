const Article = require('../models/Article')

module.exports = {

   getAll: (req, res, next) => {
      Article.find({})
         .populate('author')
         .populate('comments.author').exec(function (err, articles) {
            if (err)
               res.send(err);
            else if (!articles)
               res.send(400);
            else
               res.send(articles);

            next();
         })
   },

   feed: (req, res, next) => {
      Article.find({}).sort({ createdDate: -1 }).limit(10)
         .populate('author')
         .populate('comments.author').exec(function (err, articles) {
            if (err)
               res.send(err);
            else if (!articles)
               res.send(400);
            else
               res.send(articles);

            next();
         })
   },
   popular: (req, res, next) => {
      Article.find({}).sort({ clap: -1 }).limit(4)
         .populate('author')
         .populate('comments.author').exec(function (err, articles) {
            if (err)
               res.send(err);
            else if (!articles)
               res.send(400);
            else
               res.send(articles);

            next();
         })
   }
}
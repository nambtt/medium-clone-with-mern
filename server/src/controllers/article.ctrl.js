const Article = require('../models/Article')

module.exports = {

   getAll: (req, res, next) => {
      Article.find(req.params.id)
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
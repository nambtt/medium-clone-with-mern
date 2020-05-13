const Article = require('../../models/Article')
const { Router } = require('express')

const router = Router();

router.route('/')
   .get((req, res, next) => {
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
   })

router.route('/feed')
   .get((req, res, next) => {
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
   })

router.route('/popular')
   .get((req, res, next) => {
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
   })

module.exports = router;
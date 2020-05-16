
const Joi = require('joi')
const { Router } = require('express')
const Article = require('../../models/Article')
const requireJwtAuth = require('../../middlewares/requireJwtAuth')
const { newArticleSchema } = require('../../services/validators')

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
   .post(requireJwtAuth, async (req, res, next) => {
      // const { error } = Joi.validate(req.body, newArticleSchema);
      // if (error) {
      //    return res.status(422).send({ message: error.details[0].message });
      // }

      const article = new Article({
         title: req.body.title,
         content: req.body.content,
         author: req.body.authorId,
         featureImage: req.body.featureImage
      });

      const newArticle = await article.save();
      res.send(newArticle);
   })
   .put(requireJwtAuth, async (req, res, next) => {
      if (req.user.id !== req.body.authorId) {
         return res.status(422).send({ message: "Invalid credential to update this article." });
      }
      var dbArticle = await Article.findById(req.body._id);
      if (!dbArticle) {
         return res.status(422).send({ message: "This article is not found" });
      }
      const { _id, ...updatedFields } = req.body;
      await Article.updateOne({ _id: req.body._id }, { $set: { ...updatedFields } });
      res.send({ _id: req.body._id });
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
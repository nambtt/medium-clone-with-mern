
const { Router } = require('express')
const Article = require('../../models/Article')
const requireJwtAuth = require('../../middlewares/requireJwtAuth')
const { newArticleSchema } = require('../../services/validators')

const { articleNotFound } = require('../../utils/apiResult')
const { sortDescByCreatedAt, getWords } = require('../../utils/utils')

const router = Router();

const PAGE_SIZE = 10;

router.route('/feed')
   .get((req, res, next) => {
      Article.find({})
         .sort({ createdAt: -1 })
         .skip(PAGE_SIZE * ((req.query.page || 1) - 1))
         .limit(PAGE_SIZE)
         .populate('author')
         .populate('comments.author').exec(function (err, articles) {
            if (err)
               res.send(err);
            else if (!articles)
               res.send(400);
            else
               res.send(articles);
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
         })
   })

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
      const { error } = newArticleSchema.validate(req.body);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      const html = require('cheerio').load(req.body.content);
      let desc = getWords(html.text());

      const article = new Article({
         title: req.body.title,
         content: req.body.content,
         description: desc,
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
         return res.status(404).send(articleNotFound(req.body._id));
      }
      const { _id, ...updatedFields } = req.body;
      await Article.updateOne({ _id: req.body._id }, { $set: { ...updatedFields } });
      res.send({ _id: req.body._id });
   })

router.route('/:_id')
   .get(async (req, res, next) => {
      const article = await Article.findById(req.params._id)
         .populate('author');
      if (!article) {
         return res.status(404).send(articleNotFound(req.params._id));
      }

      return res.send(article);
   })

router.route('/:_id/comments')
   .get(async (req, res) => {
      const article = await Article.findById(req.params._id)
         .select(["_id", "comments", "author", "title", "clap"])
         .populate('author', ["id", "name", "clap"])
         .populate("comments.author", ["_id", "name", "profileImageUrl"]);

      article.comments = article.comments.sort(sortDescByCreatedAt);

      if (!article) {
         return res.status(404).json(articleNotFound(req.params._id));
      }
      res.json({ article });
   })
   .post(requireJwtAuth, async (req, res) => {
      let article = await Article.findById(req.params._id)
         .populate("comments.author");
      if (!article) {
         return res.status(404).json(articleNotFound(req.params._id));
      }

      if (!req.body.author || !req.body.content) {
         return res.status(400).json({ message: "Invalid comment" });
      }

      const comment = { author: req.body.author, content: req.body.content };

      await article.addComment(comment);
      article = await Article.findById(req.params._id)
         .populate("comments.author", ["_id", "name", "profileImageUrl"]);
      res.json(article.comments[article.comments.length - 1]);
   })

module.exports = router;
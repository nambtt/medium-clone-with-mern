const articleController = require('../controllers/article.ctrl')

module.exports = router => {

   router.route('/articles')
      .get(articleController.getAll)

   router.route('/feed')
      .get(articleController.feed)

   router.route('/popular')
      .get(articleController.popular)

}
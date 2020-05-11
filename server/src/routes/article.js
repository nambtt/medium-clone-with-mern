const articleController = require('../controllers/article.ctrl')

module.exports = router => {

   router.route('/articles')
      .get(articleController.getAll)

}
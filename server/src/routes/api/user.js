const User = require('../../models/User')
const { Router } = require('express')

const requireJwtAuth = require('../../middlewares/requireJwtAuth')

const router = Router();

router.route('/me')
   .get(requireJwtAuth, (req, res, next) => {
      const me = req.user.toJSON();
      res.json({ me });
   })

module.exports = router;
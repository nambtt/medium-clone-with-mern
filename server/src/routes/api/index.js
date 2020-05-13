const { Router } = require('express');
const articleRoutes = require('./article');
const userRoutes = require('./user');
const router = Router();

router.use('/articles', articleRoutes);
router.use('/users', userRoutes);

module.exports = router;

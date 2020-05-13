const { Router } = require('express')
const Joi = require('joi')
const faker = require('faker')

const User = require('../models/User')
const { registerSchema } = require('../services/validators');
const requireLocalAuth = require('../middlewares/requireLocalAuth')

const router = Router();

router.route('/register')
   .post(async (req, res, next) => {
      const { error } = Joi.validate(req.body, registerSchema);
      if (error) {
         return res.status(422).send({ message: error.details[0].message });
      }

      const { email, password, name } = req.body;

      const existingUser = User.findOne({ email });
      if (existingUser) {
         return res.status(422).send({ message: "Email is in use" });
      }

      const newUser = new User({
         provider: 'email',
         email,
         password,
         name,
         profileImageUrl: faker.image.avatar()
      });

      await newUser.registerAsync(newUser);
      res.json({ success: true, message: "Register success." });

      next();
   })

router.route('/login')
   .post(requireLocalAuth, (err, req, res, next) => {
      const token = req.user.generateJWT();
      const me = req.user.toJSON();
      res.json({ token, me });
      next();
   })
router.route('/logout')
   .get((req, res) => {
      req.logout();
      res.send(false);
   })
module.exports = router;
const Joi = require('joi')

module.exports = {
   registerSchema: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(20).required(),
   }),
   loginSchema: Joi.object().keys({
      firstName: Joi.string(), // bypass validation when auto sign in after register
      lastName: Joi.string(), // bypass validation when auto sign in after register
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(20).required(),
   }),
   newArticleSchema: Joi.object().keys({
      title: Joi.string(),
      content: Joi.string(),
      authorId: Joi.string(),
      featureImage: Joi.string()
   }),
}
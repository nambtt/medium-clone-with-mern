const Joi = require('@hapi/joi')

module.exports = {
   registerSchema: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(20).required(),
   }),
   loginSchema: Joi.object({
      firstName: Joi.string(), // bypass validation when auto sign in after register
      lastName: Joi.string(), // bypass validation when auto sign in after register
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().min(6).max(20).required(),
   }),
   newArticleSchema: Joi.object({
      _id: Joi.string().allow(''),
      title: Joi.string().required(),
      content: Joi.string().allow(''),
      authorId: Joi.string().required(),
      featureImage: Joi.string().allow(''),
   }),
}
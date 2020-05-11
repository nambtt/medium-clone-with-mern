const faker = require('faker')
const { join } = require('path')

const User = require('../models/User')
const Article = require('../models/Article')

const utils = require('../utils/utils')

module.exports.seedDb = async () => {
   console.log('Seeding database...');

   await Article.deleteMany({});
   await User.deleteMany({});
   await utils.deleteAllAvatars(join(__dirname, '../..', process.env.IMAGES_FOLDER_PATH));

   // seed 2 new User, a writer and an audience without own article yet
   var registerUsersPromises = [...Array(2).keys()].map((index, i) => {
      const user = new User({
         name: faker.name.findName(),
         email: `email${index}@email.com`,
         password: '123456',
      })

      return user.registerAsync(user);
   })

   var users = await Promise.allSettled(registerUsersPromises);


   // seed articles
   var articlePromises = [...Array(3).keys()].map(index => {
      const article = new Article({
         title: "nodejs tutorial - part 1",
         description: faker.lorem.sentences(2),
         featureImage: faker.image.imageUrl(),
         content: faker.lorem.paragraphs(),
         clap: utils.randomNumber(200),
         author: users[0].value.id,
         comments: [
            {
               author: users[1].value.id,
               content: faker.lorem.sentences(utils.randomNumber(3))
            }
         ]
      })

      return article.save();
   })

   await Promise.allSettled(articlePromises);

   console.log("Complete seeding database");

}

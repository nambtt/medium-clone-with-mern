require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes')

const app = express();
const router = express.Router();

const { seedDb } = require('../src/utils/seed');
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/medium-clone-with-mern"

mongoose.connect(url, {
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => {
      console.log('Connected to mongodb');
      seedDb();
   })
   .catch(console.log);

const whitelist = process.env.CORS_WHITE_LIST.split(',');
const corsOptions = {
   origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
         callback(null, true)
      } else {
         callback(new Error('Not allowed by CORS'))
      }
   }
}

app.use(cors(corsOptions));
routes(router);
app.use(bodyParser.json());

app.use('/api', router);

let port = process.env.PORT || 5000;
app.listen(port, () => {
   console.log(`Server started at port: ${port}`);
})


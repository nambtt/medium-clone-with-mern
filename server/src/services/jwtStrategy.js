const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

const secretOrKey = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'server_secret';

// JWT strategy
const jwtLogin = new JwtStrategy(
   {
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
      secretOrKey,
   },
   async (payload, done) => {
      try {
         const user = await User.findById(payload.id);

         if (user) {
            done(null, user);
         } else {
            done(null, false);
         }
      } catch (err) {
         done(err, false);
      }
   },
);

passport.use(jwtLogin);

const passport = require('passport');
const { Strategy: PassportLocalStrategy } = require('passport-local');
const Joi = require('@hapi/joi');

const User = require('../models/User');
const { loginSchema } = require('./validators');

const passportLogin = new PassportLocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		session: false,
		passReqToCallback: true,
	},
	async (req, email, password, done) => {
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return done(null, false, { message: error.details[0].message });
		}

		try {
			const user = await User.findOne({ email: email.trim() });
			const error = { message: 'Email or password is not correct.' };
			if (!user) {
				return done(null, false, error);
			}

			user.comparePassword(password, function (err, isMatch) {
				if (err) {
					return done(err);
				}
				if (!isMatch) {
					return done(null, false, error);
				}

				return done(null, user);
			});
		} catch (err) {
			return done(err);
		}
	},
);

passport.use(passportLogin);

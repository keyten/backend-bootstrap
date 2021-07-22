import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';
import config from '../lib/config';
import {User} from '../models/';
import { AUTH_PROVIDER } from './providers';

interface GoogleProfile {
	id: string;
	displayName: string;
	name: {
		familyName: string;
		givenName: string;
	};
	emails: {}[];
	photos: {}[];
}

type ProcessedUser = {
	provider: AUTH_PROVIDER.LOCAL;
	profile: any;
} | {
	provider: AUTH_PROVIDER.GOOGLE;
	profile: GoogleProfile;
}

// common things
passport.deserializeUser(function(id: ProcessedUser, done){
	/* User.findById(id).then(data => {
		if (data) {
			const user = data.toJSON() as any;
			delete user.password;
			done(null, user);
		} else {
			done(null);
		}
	}, err => {
		done(err);
	}); */
	console.log(id);
	done(null, {});
});

passport.serializeUser(function(user: any, done){
	console.log(user);
	done(null, {
		provider: user.provider,
		id: user.profile.id
	});
});

// strategies
passport.use(new LocalStrategy((username, password, done) => {
	User.checkLogin(username, password).then(data => {
		if (data) {
			done(null, {
				provider: AUTH_PROVIDER.LOCAL,
				profile: data
			});
		} else {
			done(null, false);
		}
	}, done);
}));

passport.use(new GoogleStrategy({
    ...config.socialLogin.google
}, (accessToken, refreshToken, profile, done) => {
	done(null, {
		provider: AUTH_PROVIDER.GOOGLE,
		profile
	});
/*
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
*/
}));

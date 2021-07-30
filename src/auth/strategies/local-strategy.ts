import {Strategy as LocalStrategy, VerifyFunction} from 'passport-local';
import {User} from '../../models/';

const onUserLogin: VerifyFunction = (username, password, done) => {
	User.getUserByLoginAndPassword(username, password).then(user => {
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	}, done);
}

export default new LocalStrategy(onUserLogin);

import passport from 'passport';
import '../auth/configure';

export default [
	passport.initialize(),
	passport.session()
];

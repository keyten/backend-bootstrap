import {
	OAuth2Strategy as GoogleStrategy,
	Profile,
	VerifyFunction
} from 'passport-google-oauth';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { googleCredentials } from '../../lib/secret-config';
import { User } from '../../models/';
import { AUTH_PROVIDER } from '../providers';

const onUserGoogleLogin = async (
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: VerifyFunction
) => {
	// пользователь переходит на /auth/google/callback
	// (определено в routes/auth), где его ожидает гугл,
	// гугл редиректит на адрес, где его ожидает passport middleware,
	// который вызывает эту функцию (и вероятно, чекает токен)
	const email = profile.emails![0].value;

	// первым делом нужно узнать, зарегистрирован ли он уже
	try {
		let user = await User.findByGoogleData(email, profile.id);

		// если нет, то регистрируем
		if (!user) {
			const avatar = profile.photos && profile.photos[0]?.value;
			try {
				user = await User.create({
					username: await makeUpUsername(email, profile.displayName),
					avatar,
					email,
					provider: AUTH_PROVIDER.GOOGLE,
					providerId: profile.id
				});
			} catch (e) {
				done(e);
				return;
			}
		}

		done(null, user);
	} catch (e) {
		done(e);
		return;
	}
}

const makeUpUsername = async (email: string, displayName: string) => {
	// сначала пробуем отрезать кусок почты
	// учитываем, что бывают корпоративные аккаунты
	const nickname = email.split('@')[1] === 'gmail.com'
		? email.split('@')[0]
		: email.split(/[@\.]/).join('-');
	if (!(await User.isExistByUsername(nickname))) {
		return nickname;
	}

	// затем транслитерировать имя
	const nickname2 = new CyrillicToTranslit().transform(displayName, '_');
	if (!(await User.isExistByUsername(nickname2))) {
		return nickname2;
	}

	// если совсем никак, то начинаем подбирать
	for(var i = 0; i < 10; i++) {
		const option = nickname + Math.floor(Math.random() * 100);
		if (!(await User.isExistByUsername(option))) {
			return option;
		}
	}

	throw new Error(`The user that is trying to register is very unlucky.`);
}

// todo: возможно, тут ещё стоит делать проверку токена через 
// https://developers.google.com/identity/sign-in/web/backend-auth
// но кажется, passport-google-oauth должен делать её сам

export default new GoogleStrategy(googleCredentials, onUserGoogleLogin);

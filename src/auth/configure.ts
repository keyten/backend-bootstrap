import passport from 'passport';
import { User } from '../models/';

import LocalStrategy from './strategies/local-strategy';
import GoogleStrategy from './strategies/google-strategy';

function serializeUser(user: any, done: Function){
	// вызывается при авторизации
	// получаем id юзера, этот id будет храниться в сессии
	// когда запрос приходит в passport middleware, он будет
	// запускать deserializeUser, чтобы по этому id получить данные юзера
	// в user лежит то, что вызвала стратегия в done (у нас тут это всегда User)
	done(null, user.id);
}

async function deserializeUser(id: number, done: Function){
	// при каждом запросе в middleware вызывается
	// и по сохраненному в сессии id возвращает данные юзера
	const user = await User.findById(id);
	done(null, {
		id: user?.id,
		username: user?.username,
		avatar: user?.avatar,
		email: user?.email
	})
}

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Local это обычные пользователи сайта
passport.use(LocalStrategy);
passport.use(GoogleStrategy);

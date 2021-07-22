import session from 'express-session';
import createPgStore from 'connect-pg-simple';
import { pool } from '../lib/db';
import config from '../lib/config';

const pgStore = createPgStore(session);

export default session({
	store: new pgStore({
		pool: pool
	}),
	secret: config.sessionSecret,
	resave: true,
	rolling: true,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
	}
});
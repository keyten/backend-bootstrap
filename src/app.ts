import express from 'express';
import {
	helmet,
	logRequest,
	session,
	config,
	dev,
	passport,

	error404,
	error500
} from './middlewares';
import routes from './routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(dev);
app.options('*', dev);
app.use(helmet);
app.use(logRequest);
app.use(session);

app.use(passport);
app.use(config);

app.use(routes);
app.get('/', (req, res) => {
	res.send('abc');
});

app.use(error404);
app.use(error500);
app.listen(port, () => {
	console.log(`Process ${process.pid}, port ${port}`);
});

// auth:
// https://github.com/mjhea0/passport-social-auth/blob/master/server/app.js
// https://mherman.org/blog/social-authentication-in-node-dot-js-with-passport/
// https://github.com/jaredhanson/passport
// http://www.passportjs.org/docs/downloads/html/

// bast practice security: https://expressjs.com/ru/advanced/best-practice-security.html
// todo: use csurf

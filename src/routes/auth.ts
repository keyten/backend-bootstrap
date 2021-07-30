import {Router, Request, Response} from 'express';
import passport from 'passport';
import md5 from 'md5';
import {bodyParserJson} from '../middlewares/';
import { User } from '../models';

export default Router()
	.post('/register', [
		bodyParserJson,
		async (req: Request, res: Response) => {
			if (req.isAuthenticated()) {
				res.statusCode = 418;
				res.end();
				return;
			}

			const body = req.body as {
				username?: string;
				password?: string;
			} | undefined;
			if (!body || !body.username || !body.password) {
				res.statusCode = 400;
				res.end();
				return;
			}

			try {
				const user = await User.create({
					username: body.username,
					password: md5(body.password),
					provider: 0
				});
				const {password: removedPass, ...userData} = user.toJSON() as any;
				res.json(userData);
			} catch (e) {
				console.log(e.errors.map((err: any) => err.message));
				res.statusCode = 400;
				res.end();
			}
		}
	])

	.post('/login', [
		bodyParserJson,
		passport.authenticate('local'),
		(req: Request, res: Response) => {
			res.json(true);
		}
	])

	.post('/logout', (req: Request, res: Response) => {
		req.logout();
		res.json(true);
	})

	.get('/user-exist/', async (req, res) => {
		const query = req.query as {
			login?: string;
		};

		if (!query.login) {
			res.statusCode = 400;
			res.end();
			return;
		}

		res.json(
			await User.isExistByUsernameOrEmail(query.login)
		);
	})

	.get('/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	)

	.get('/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/google/error'
		}),
		(req, res) => {
			res.redirect('/');
		}
	);

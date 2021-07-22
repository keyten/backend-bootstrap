import {Request, Response, NextFunction} from 'express';
import config from '../lib/config';

export default (req: Request, res: Response, next: NextFunction) => {
	req.config = config;

	req.clientConfig = {
		userLoggedIn: req.isAuthenticated(),
		user: req.user
	};

	next();
}

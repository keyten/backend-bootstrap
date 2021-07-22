import {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import env from '../lib/env';

export default env === 'development' ? cors({
	origin: 'http://localhost:8080',
	credentials: true
}) : (req: Request, res: Response, next: NextFunction) => {
	next();
};

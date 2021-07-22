import {Request, Response, NextFunction} from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err.toString() + '\n' + err.stack);
	res.statusCode = 500;
	res.end();
}

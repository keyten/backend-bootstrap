import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
	res.statusCode = 404;
	res.end();
};

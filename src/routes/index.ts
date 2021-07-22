import {Router} from 'express';
import authRouter from './auth';
import appRouter from './app';

export default Router()
	.use('/api/auth', authRouter)
	.use(appRouter);

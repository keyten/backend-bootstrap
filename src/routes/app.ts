import fs from 'fs';
import path from 'path';
import express, {Router} from 'express';
import env from '../lib/env';
import '../auth/configure';

function getIndexPage(): string {
	return fs.readFileSync(path.join(__dirname, '../../public/index.html'), {
		encoding: 'utf-8'
	});
}

let indexPage = getIndexPage();

export default Router()
	.get([
		'/'
	], (req, res) => {
		if (env === 'development') {
			indexPage = getIndexPage();
		}

		const configData = JSON.stringify(req.clientConfig);
		const sourceCode = indexPage.split("{{config}}").join(configData);
		res.send(sourceCode);
	})
	.use(express.static('public'))

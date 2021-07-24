import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const configPath = path.join(__dirname, `../../config/production.yml`);
const configText = fs.readFileSync(configPath, {encoding: 'utf-8'});
const configValue = yaml.parse(configText);
Object.assign(configValue, {
	db: {
		url: process.env.DATABASE_URL
	},

	sessionSecret: process.env.SESSION_SECRET,

	socialLogin: {
		google: {
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL
		}
	}
});

fs.writeFileSync(configPath, yaml.stringify(configValue));
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const configPath = path.join(__dirname, `../../config/production.yml`);

fs.writeFileSync(configPath, yaml.stringify({
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
}));